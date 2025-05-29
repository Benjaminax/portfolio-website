import React, { useEffect, useState, useRef } from 'react';

const Contact = () => {
  const [showToast, setShowToast] = useState(false);
  const [typed, setTyped] = useState('');
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
          i++;
          if (i === text.length) {
            typing = false;
            setTimeout(() => {
              typing = true;
              i = 0;
            }, 1200); // Pause before restarting
            clearInterval(interval);
            setTimeout(startTyping, 1200);
          }
        }
      }, 80);
    }

    startTyping();
    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    window.open('mailto:kojoben29@gmail.com');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  // 3D hover handlers
  const handleMouseMove = (e) => {
    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 10;
    const rotateY = ((x - centerX) / centerX) * -10;
    setCardStyle({
      background: 'linear-gradient(135deg, #ffffff 60%, #e6ffe6 100%)',
      transform: `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.06)`,
      boxShadow: '0 24px 48px 0 rgba(158,241,112,0.18), 0 2px 8px rgba(0,0,0,0.10)',
      border: '2.5px solid #9EF170',
      transition: 'transform 0.18s cubic-bezier(.03,.98,.52,.99), box-shadow 0.18s, border 0.18s'
    });
  };

  const handleMouseLeave = () => {
    setCardStyle({
      background: 'linear-gradient(135deg, #ffffff 60%, #e6ffe6 100%)',
      transform: 'perspective(600px) rotateX(0deg) rotateY(0deg) scale(1)',
      boxShadow: '0px 8px 24px rgba(0,0,0,0.18)',
      border: '2px solid rgba(158,241,112,0.18)',
      transition: 'transform 0.35s cubic-bezier(.03,.98,.52,.99), box-shadow 0.35s, border 0.35s'
    });
  };

  return (
    <section
      className="w-full max-w-[1800px] h-auto md:h-[600px] mx-auto relative rounded-t-[25px] mt-[350px] md:mt-0 scroll-mt-400"
      id="contact"
    >
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-8 right-4 md:right-8 z-50 bg-[#9EF170] text-black px-4 md:px-6 py-2 md:py-3 rounded-lg shadow-lg font-montserrat text-base md:text-lg animate-fade-in">
          Email client opened!
        </div>
      )}
      <div className="w-full h-auto md:h-full rounded-t-[25px] bg-[#CFC9BB] relative px-4 md:px-[145px] py-8 md:py-[49px] mt-10 md:mt-[250px] flex flex-col md:flex-row items-start">
        {/* Left: Title and description */}
        <div className="flex-1 flex flex-col justify-start">
          {/* Title */}
          <div>
            <h2 className="font-montserrat text-[48px] md:text-[96px] lg:text-[128px] font-bold text-black mb-0 text-left leading-none">
              Contact
            </h2>
            <div className="w-full h-[4px] md:h-[7px] bg-black mt-2 mb-6 md:mb-10 rounded" />
          </div>
          {/* Description */}
          <div className="w-full max-w-full md:max-w-[600px] font-montserrat text-[15px] md:text-[17px] font-normal text-black leading-relaxed mb-4 md:mb-6 text-left">
            <p>
              Whether you're looking to collaborate on a project, have a question about my work, or just want to say hello — I'd love to hear from you. I'm open to freelance opportunities, internships, and creative tech projects that challenge me to grow.
            </p>
            <div className="my-2 md:my-4" />
            <p>
              Feel free to reach out via email or connect with me on LinkedIn or GitHub. I'll do my best to respond promptly.
            </p>
          </div>
          <div className="w-[120px] md:w-[200px] h-[3px] md:h-[5px] bg-black mb-6 md:mb-10 rounded" />
          {/* Footer */}
        </div>

        {/* Contact form and info */}
        <div
          ref={cardRef}
          style={cardStyle}
          className="w-full md:w-[340px] h-[420px] md:h-[400px] rounded-[28px] md:rounded-[40px] ml-0 md:ml-[40px] mt-8 md:mt-[40px] relative flex-shrink-0 will-change-transform overflow-visible"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          {/* Header */}
          <div className="w-[95%] md:w-[310px] h-[70px] md:h-[80px] rounded-[20px] md:rounded-[28px] bg-[#11190C] relative left-1/2 -translate-x-1/2 md:left-[15px] md:translate-x-0 top-[10px] md:top-[12px] flex items-center justify-center">
            {/* Decorative dots */}
            {/* Left Top */}
            <svg className="absolute left-3 top-2 md:left-[12px] md:top-[10px]" width="10" height="9" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="6" cy="5.5" rx="6" ry="5.5" fill="#9EF170"/>
            </svg>
            {/* Left Bottom */}
            <svg className="absolute left-3 bottom-2 md:left-[12px] md:bottom-2" width="10" height="9" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5.5C12 8.53757 9.31371 11 6 11C2.68629 11 0 8.53757 0 5.5C0 2.46243 2.68629 0 6 0C9.31371 0 12 2.46243 12 5.5Z" fill="#9EF170"/>
            </svg>
            {/* Right Top */}
            <svg className="absolute right-3 top-2 md:right-[12px] md:top-[10px]" width="10" height="9" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5.5C12 8.53757 9.31371 11 6 11C2.68629 11 0 8.53757 0 5.5C0 2.46243 2.68629 0 6 0C9.31371 0 12 2.46243 12 5.5Z" fill="#9EF170"/>
            </svg>
            {/* Right Bottom */}
            <svg className="absolute right-3 bottom-2 md:right-[12px] md:bottom-2" width="10" height="9" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5.5C12 8.53757 9.31371 11 6 11C2.68629 11 0 8.53757 0 5.5C0 2.46243 2.68629 0 6 0C9.31371 0 12 2.46243 12 5.5Z" fill="#9EF170"/>
            </svg>
            
            <div className="font-montserrat text-[16px] md:text-[18px] font-normal text-white text-center leading-[1.2]">
              <span>Get in touch with me!</span><br/>
              <span>{typed}<span className="animate-pulse">|</span></span>
            </div>
          </div>
          
          {/* Contact info */}
          <div className="absolute top-[90px] md:top-[110px] left-0 right-0 w-full flex flex-col items-center justify-center gap-10 md:gap-8 pr-0">
            {/* Email */}
            <a
              href="mailto:kojoben29@gmail.com"
              className="flex items-center gap-4 w-[250px] h-[36px] rounded-[10px] transition-all duration-200 group
                hover:bg-[#e6ffe6] active:bg-[#c6f7c6] shadow-sm hover:shadow-lg active:scale-95"
              title="Send Email"
            >
              <div className="w-8 h-8 rounded-full bg-[#0E1408] flex items-center justify-center flex-shrink-0
                group-hover:bg-[#9EF170] group-active:bg-[#7ed957] transition-colors duration-200">
                {/* Email Icon */}
                <svg className="w-5 h-5 transition-colors duration-200" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="6" fill="none"/>
                  <path d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v9A2.5 2.5 0 0 1 17.5 19h-11A2.5 2.5 0 0 1 4 16.5v-9Z" stroke="#9EF170" strokeWidth="2" className="group-hover:stroke-[#11190C] group-active:stroke-[#0E1408]"/>
                  <path d="M4.5 8l7.5 5 7.5-5" stroke="#9EF170" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:stroke-[#11190C] group-active:stroke-[#0E1408]"/>
                </svg>
              </div>
              <span className="font-montserrat text-base font-normal text-black group-hover:text-[#11190C] group-active:text-[#0E1408] transition-colors duration-200 truncate">
                kojoben29@gmail.com
              </span>
            </a>

            {/* Phone */}
            <div
              className="flex items-center gap-4 w-[250px] h-[36px] rounded-[10px] transition-all duration-200 group
                hover:bg-[#e6ffe6] active:bg-[#c6f7c6] shadow-sm hover:shadow-lg active:scale-95 cursor-pointer"
              tabIndex={0}
              role="button"
              title="Call"
              onClick={() => window.open('tel:0208758007')}
              onKeyPress={e => { if (e.key === 'Enter') window.open('tel:0208758007'); }}
            >
              <div className="w-8 h-8 rounded-full bg-[#0E1408] flex items-center justify-center flex-shrink-0
                group-hover:bg-[#9EF170] group-active:bg-[#7ed957] transition-colors duration-200">
                {/* Phone Icon */}
                <svg className="w-5 h-5 transition-colors duration-200" viewBox="0 0 24 24" fill="none">
                  <rect width="24" height="24" rx="6" fill="none"/>
                  <path d="M6.5 5.5A2 2 0 0 1 8.5 3.5h7a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-7a2 2 0 0 1-2-2v-13Z" stroke="#9EF170" strokeWidth="2" className="group-hover:stroke-[#11190C] group-active:stroke-[#0E1408]"/>
                  <path d="M8 7h8M8 11h8M8 15h5" stroke="#9EF170" strokeWidth="2" strokeLinecap="round" className="group-hover:stroke-[#11190C] group-active:stroke-[#0E1408]"/>
                </svg>
              </div>
              <span className="font-montserrat text-base font-normal text-black group-hover:text-[#11190C] group-active:text-[#0E1408] transition-colors duration-200 truncate">
                0208758007
              </span>
            </div>
            
            {/* GitHub */}
            <a
              href="https://github.com/Benjaminax"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 w-[250px] h-[36px] rounded-[10px] transition-all duration-200 group
                hover:bg-[#e6ffe6] active:bg-[#c6f7c6] shadow-sm hover:shadow-lg active:scale-95"
              title="GitHub"
            >
              <div className="w-8 h-8 rounded-full bg-[#0E1408] flex items-center justify-center flex-shrink-0
                group-hover:bg-[#9EF170] group-active:bg-[#7ed957] transition-colors duration-200">
                {/* GitHub Icon */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.463-1.11-1.463-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.203 2.397.1 2.65.64.7 1.028 1.595 1.028 2.688 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.744 0 .268.18.58.688.482C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2Z"
                    className="transition-colors duration-200 fill-[#9EF170] group-hover:fill-[#11190C] group-active:fill-[#0E1408]"
                  />
                </svg>
              </div>
              <span className="font-montserrat text-base font-normal text-black group-hover:text-[#11190C] group-active:text-[#0E1408] transition-colors duration-200 truncate">
                Benjaminax
              </span>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/your-linkedin-username"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 w-[250px] h-[36px] rounded-[10px] transition-all duration-200 group
                hover:bg-[#e6ffe6] active:bg-[#c6f7c6] shadow-sm hover:shadow-lg active:scale-95"
              title="LinkedIn"
            >
              <div className="w-8 h-8 rounded-full bg-[#0E1408] flex items-center justify-center flex-shrink-0
                group-hover:bg-[#9EF170] group-active:bg-[#7ed957] transition-colors duration-200">
                {/* LinkedIn Icon */}
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    d="M19 0h-14c-2.76 0-5 2.24-5 5v14c0 2.76 2.24 5 5 5h14c2.76 0 5-2.24 5-5v-14c0-2.76-2.24-5-5-5zm-11 19h-3v-9h3v9zm-1.5-10.28c-.966 0-1.75-.79-1.75-1.76 0-.97.784-1.76 1.75-1.76s1.75.79 1.75 1.76c0 .97-.784 1.76-1.75 1.76zm13.5 10.28h-3v-4.5c0-1.08-.02-2.47-1.5-2.47-1.5 0-1.73 1.17-1.73 2.39v4.58h-3v-9h2.89v1.23h.04c.4-.76 1.38-1.56 2.84-1.56 3.04 0 3.6 2 3.6 4.59v5.74z"
                    className="transition-colors duration-200 fill-[#9EF170] group-hover:fill-[#11190C] group-active:fill-[#0E1408]"
                  />
                </svg>
              </div>
              <span className="font-montserrat text-base font-normal text-black group-hover:text-[#11190C] group-active:text-[#0E1408] transition-colors duration-200 truncate">
                LinkedIn
              </span>
            </a>
          </div>

          {/* Reflection */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 -bottom-6 md:-bottom-10 h-10 md:h-16 rounded-b-[20px] md:rounded-b-[40px] opacity-40"
            style={{
              background: 'linear-gradient(to bottom, rgba(158,241,112,0.15) 0%, rgba(255,255,255,0.01) 100%)',
              filter: 'blur(6px)'
            }}
          />
        </div>
      </div>
      {/* Decorative bottom wave */}
      <div className="absolute left-0 right-0 bottom-0 w-full overflow-hidden pointer-events-none" style={{height: 50, zIndex: 2}}>
        <svg
          viewBox="0 0 1800 80"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
          preserveAspectRatio="none"
        >
          <path
            d="M0 40 Q450 80 900 40 T1800 40 V80 H0 Z"
            fill="#CFC9BB"
            opacity="0.95"
          />
          <path
            d="M0 60 Q450 100 900 60 T1800 60 V80 H0 Z"
            fill="#9EF170"
            opacity="0.18"
          />
        </svg>
      </div>
    </section>
  );
};

export default Contact;