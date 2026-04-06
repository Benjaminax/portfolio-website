import React, { useEffect, useRef, useState } from 'react';

const initialForm = {
  name: '',
  email: '',
  message: '',
};

const initialQuickForm = {
  name: '',
  email: '',
  reason: 'Project inquiry',
};

const Contact = () => {
  const [typed, setTyped] = useState('');
  const [activeForm, setActiveForm] = useState('quick');
  const [formData, setFormData] = useState(initialForm);
  const [quickFormData, setQuickFormData] = useState(initialQuickForm);
  const [status, setStatus] = useState({ type: '', text: '' });
  const [submitting, setSubmitting] = useState(false);
  const [cardStyle, setCardStyle] = useState({
    background: 'linear-gradient(135deg, #ffffff 60%, #e6ffe6 100%)',
    boxShadow: '0px 8px 24px rgba(0,0,0,0.18)',
    border: '2px solid rgba(158,241,112,0.18)',
    transition: 'transform 0.35s cubic-bezier(.03,.98,.52,.99), box-shadow 0.35s, border 0.35s',
  });
  const cardRef = useRef(null);

  useEffect(() => {
    const text = "Let's talk!";
    let i = 0;
    let typing = true;
    let interval;

    function startTyping() {
      interval = setInterval(() => {
        if (typing) {
          setTyped(text.slice(0, i + 1));
          i += 1;
          if (i === text.length) {
            typing = false;
            setTimeout(() => {
              typing = true;
              i = 0;
            }, 1200);
            clearInterval(interval);
            setTimeout(startTyping, 1200);
          }
        }
      }, 80);
    }

    startTyping();
    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (event) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * -10;

    setCardStyle({
      background: 'linear-gradient(135deg, #ffffff 60%, #e6ffe6 100%)',
      transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`,
      boxShadow: '0 24px 48px 0 rgba(158,241,112,0.18), 0 2px 8px rgba(0,0,0,0.10)',
      border: '2.5px solid #9EF170',
      transition: 'transform 0.18s cubic-bezier(.03,.98,.52,.99), box-shadow 0.18s, border 0.18s',
    });
  };

  const handleMouseLeave = () => {
    setCardStyle({
      background: 'linear-gradient(135deg, #ffffff 60%, #e6ffe6 100%)',
      transform: 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)',
      boxShadow: '0px 8px 24px rgba(0,0,0,0.18)',
      border: '2px solid rgba(158,241,112,0.18)',
      transition: 'transform 0.35s cubic-bezier(.03,.98,.52,.99), box-shadow 0.35s, border 0.35s',
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleQuickChange = (event) => {
    const { name, value } = event.target;
    setQuickFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const submitContact = async (payload) => {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const contentType = response.headers.get('content-type') || '';
    let data = null;

    if (contentType.includes('application/json')) {
      data = await response.json();
    } else {
      const text = await response.text();
      data = { error: text || `Request failed with status ${response.status}` };
    }

    if (!response.ok) {
      const message = data?.error || `Request failed with status ${response.status}`;
      throw new Error(message);
    }
  };

  const handleDetailedSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: '', text: '' });
    setSubmitting(true);

    try {
      await submitContact(formData);

      setFormData(initialForm);
      setStatus({ type: 'success', text: 'Message sent. I will get your email and reply soon.' });
    } catch (error) {
      setStatus({ type: 'error', text: error.message || 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickSubmit = async (event) => {
    event.preventDefault();
    setStatus({ type: '', text: '' });
    setSubmitting(true);

    try {
      const payload = {
        name: quickFormData.name,
        email: quickFormData.email,
        message: `Quick contact request: ${quickFormData.reason}`,
      };

      await submitContact(payload);
      setQuickFormData(initialQuickForm);
      setStatus({ type: 'success', text: 'Quick request sent successfully.' });
    } catch (error) {
      setStatus({ type: 'error', text: error.message || 'Something went wrong. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      className="w-full max-w-[1800px] h-auto md:h-[600px] mx-auto relative rounded-t-[25px] mt-[350px] md:mt-0 z-[80]"
      id="contact"
    >
      <div className="w-full h-auto md:h-full rounded-t-[25px] bg-[#CFC9BB] relative z-[80] px-4 md:px-[145px] py-8 md:py-[49px] mt-10 md:mt-[250px] flex flex-col md:flex-row items-start gap-8 overflow-visible">
        <div className="flex-1 flex flex-col justify-start">
          <h2 className="font-montserrat text-[48px] md:text-[96px] lg:text-[128px] font-bold text-black mb-0 text-left leading-none">
            Contact
          </h2>
          <div className="w-full h-[4px] md:h-[7px] bg-black mt-2 mb-6 md:mb-10 rounded" />
          <div className="w-full max-w-full md:max-w-[620px] font-montserrat text-[15px] md:text-[17px] font-normal text-black leading-relaxed mb-4 md:mb-6 text-left">
            <p>
              Send me a message directly from this form. I will receive it by email and keep a record in MongoDB.
            </p>
            <div className="my-2 md:my-4" />
            <p>
              You can still reach me at kojoben29@gmail.com if you prefer to email manually.
            </p>
          </div>
          <div className="w-[120px] md:w-[200px] h-[3px] md:h-[5px] bg-black mb-6 md:mb-10 rounded" />
        </div>

        <div
          ref={cardRef}
          style={cardStyle}
          className="w-full md:w-[420px] min-h-[460px] rounded-[28px] md:rounded-[40px] relative z-[90] flex-shrink-0 will-change-transform overflow-hidden px-5 md:px-7 py-5 md:py-7"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <div className="w-full h-[74px] rounded-[22px] bg-[#11190C] flex items-center justify-center mb-5">
            <div className="font-montserrat text-[16px] md:text-[18px] font-normal text-white text-center leading-[1.2]">
              <span>Get in touch with me!</span>
              <br />
              <span>
                {typed}
                <span className="animate-pulse">|</span>
              </span>
            </div>
          </div>

          <div className="mb-4 space-y-2">
            <a
              href="mailto:kojoben29@gmail.com"
              className="flex items-center justify-between rounded-xl border border-[#cde9bc] bg-white/70 px-3 py-2 text-sm font-montserrat text-black transition-colors hover:bg-[#eaffdd]"
              title="Send Email"
            >
              <span>Email</span>
              <span className="truncate pl-2">kojoben29@gmail.com</span>
            </a>

            <a
              href="tel:0208758007"
              className="flex items-center justify-between rounded-xl border border-[#cde9bc] bg-white/70 px-3 py-2 text-sm font-montserrat text-black transition-colors hover:bg-[#eaffdd]"
              title="Call"
            >
              <span>Phone</span>
              <span>0208758007</span>
            </a>

            <a
              href="https://github.com/Benjaminax"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border border-[#cde9bc] bg-white/70 px-3 py-2 text-sm font-montserrat text-black transition-colors hover:bg-[#eaffdd]"
              title="GitHub"
            >
              <span>GitHub</span>
              <span>Benjaminax</span>
            </a>

            <a
              href="https://www.linkedin.com/in/your-linkedin-username"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between rounded-xl border border-[#cde9bc] bg-white/70 px-3 py-2 text-sm font-montserrat text-black transition-colors hover:bg-[#eaffdd]"
              title="LinkedIn"
            >
              <span>LinkedIn</span>
              <span>Profile</span>
            </a>
          </div>

          <div className="mb-3 grid grid-cols-2 gap-2 rounded-xl border border-[#cde9bc] bg-white/60 p-1">
            <button
              type="button"
              className={`h-9 rounded-lg text-sm font-montserrat transition-colors ${
                activeForm === 'quick' ? 'bg-[#0E1408] text-[#9EF170]' : 'bg-transparent text-black'
              }`}
              onClick={() => setActiveForm('quick')}
            >
              Quick Form
            </button>
            <button
              type="button"
              className={`h-9 rounded-lg text-sm font-montserrat transition-colors ${
                activeForm === 'detailed' ? 'bg-[#0E1408] text-[#9EF170]' : 'bg-transparent text-black'
              }`}
              onClick={() => setActiveForm('detailed')}
            >
              Detailed Form
            </button>
          </div>

          {activeForm === 'quick' ? (
            <form className="flex flex-col gap-3" onSubmit={handleQuickSubmit}>
              <input
                name="name"
                type="text"
                placeholder="Your name"
                value={quickFormData.name}
                onChange={handleQuickChange}
                className="w-full h-10 rounded-xl border border-[#8bcf65] bg-white px-4 font-montserrat text-sm text-black outline-none focus:ring-2 focus:ring-[#9EF170]"
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Your email"
                value={quickFormData.email}
                onChange={handleQuickChange}
                className="w-full h-10 rounded-xl border border-[#8bcf65] bg-white px-4 font-montserrat text-sm text-black outline-none focus:ring-2 focus:ring-[#9EF170]"
                required
              />
              <select
                name="reason"
                value={quickFormData.reason}
                onChange={handleQuickChange}
                className="w-full h-10 rounded-xl border border-[#8bcf65] bg-white px-3 font-montserrat text-sm text-black outline-none focus:ring-2 focus:ring-[#9EF170]"
                required
              >
                <option>Project inquiry</option>
                <option>Freelance opportunity</option>
                <option>Internship opportunity</option>
                <option>General hello</option>
              </select>
              <button
                type="submit"
                className="w-full h-10 rounded-xl bg-[#0E1408] text-[#9EF170] font-montserrat font-semibold text-sm transition-all hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={submitting}
              >
                {submitting ? 'Sending...' : 'Send Quick Request'}
              </button>
            </form>
          ) : (
            <form className="flex flex-col gap-3" onSubmit={handleDetailedSubmit}>
              <input
                name="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-10 rounded-xl border border-[#8bcf65] bg-white px-4 font-montserrat text-sm text-black outline-none focus:ring-2 focus:ring-[#9EF170]"
                required
              />
              <input
                name="email"
                type="email"
                placeholder="Your email"
                value={formData.email}
                onChange={handleChange}
                className="w-full h-10 rounded-xl border border-[#8bcf65] bg-white px-4 font-montserrat text-sm text-black outline-none focus:ring-2 focus:ring-[#9EF170]"
                required
              />
              <textarea
                name="message"
                placeholder="Your message"
                value={formData.message}
                onChange={handleChange}
                className="w-full min-h-[110px] rounded-xl border border-[#8bcf65] bg-white px-4 py-3 font-montserrat text-sm text-black outline-none focus:ring-2 focus:ring-[#9EF170] resize-y"
                required
              />
              <button
                type="submit"
                className="w-full h-10 rounded-xl bg-[#0E1408] text-[#9EF170] font-montserrat font-semibold text-sm transition-all hover:brightness-110 disabled:opacity-70 disabled:cursor-not-allowed"
                disabled={submitting}
              >
                {submitting ? 'Sending...' : 'Send Detailed Message'}
              </button>
            </form>
          )}

          {status.text && (
            <p
              className={`mt-4 rounded-lg px-3 py-2 font-montserrat text-sm ${
                status.type === 'success'
                  ? 'bg-[#d8f7c6] text-[#0E1408]'
                  : 'bg-[#ffd8d8] text-[#7b1010]'
              }`}
            >
              {status.text}
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;