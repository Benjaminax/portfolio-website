import React, { useEffect, useState } from 'react';
import { Typewriter } from 'react-simple-typewriter';
import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
      duration: 0.7,
      ease: 'easeOut'
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
};

const codeVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 40 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.9, ease: 'easeOut', delay: 0.5 } }
};

const Hero = () => {
  const [showScroll, setShowScroll] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowScroll(window.scrollY < 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="w-full max-w-[1800px] mx-auto min-h-[700px] flex flex-col md:flex-row justify-between items-start px-4 md:px-[20px] pt-[60px] md:pt-[220px] relative">
      {/* Left content */}
      <motion.div
        className="flex flex-col justify-start w-full md:w-[700px] mt-6 md:mt-10 items-start"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Name and title */}
        <motion.div className="flex flex-col items-start" variants={itemVariants}>
          {/* Available for work badge */}
          <motion.div
            className="w-fit px-2 h-[22px] rounded-[14px] border border-black opacity-[0.59] bg-[#9EF170] shadow-[2px_2px_0px_#000] flex items-center mb-2"
            variants={itemVariants}
          >
            <svg className="mr-1" width="8" height="8" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <ellipse cx="6.5" cy="6" rx="6.5" ry="6" fill="#1E4B05"/>
            </svg>
            <span className="font-montserrat text-[12px] font-normal text-[#1E4B05]">Available for Work</span>
          </motion.div>
          <motion.span
            className="font-montserrat text-[32px] md:text-[48px] font-normal text-white block text-left leading-[1.1]"
            variants={itemVariants}
          >
            Hello, I’m
          </motion.span>
          <motion.span
            className="font-montserrat text-[36px] md:text-[51px] font-normal bg-gradient-to-r from-[#9EF170] to-[#0E2600] bg-clip-text text-transparent block mb-[8px] md:mb-[12px] text-left whitespace-nowrap leading-[1.1]"
            variants={itemVariants}
          >
            Benjamin <span className="block md:inline">Acheampong</span>
          </motion.span>
          {/* Typing effect */}
          <motion.span
            className="font-montserrat font-thin text-[22px] md:text-[28px] text-[#ffffff] block mb-[24px] md:mb-[32px] text-left min-h-[32px]"
            variants={itemVariants}
          >
            <Typewriter
              words={[
                'Innovator',
                'Game Developer',
                'Full Stack Developer', 'Problem Solver', 'UI/UX Designer', 'Graphic Designer']}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={80}
              deleteSpeed={60}
              delaySpeed={1200}
            />
          </motion.span>
        </motion.div>

        {/* Description with vertical bar */}
        <motion.div
          className="flex items-stretch mb-[24px] md:mb-[32px] w-full max-w-[600px]"
          variants={itemVariants}
        >
          <div className="w-[4px] bg-white mr-4" style={{ height: 'auto' }}></div>
          <p className="w-full font-montserrat text-base font-normal text-[#AEAEAE] leading-[1.4] text-left">
            I craft modern web experiences with clean code and pixel-perfect designs. Specializing in React, Node.js, and modern frameworks to build responsive applications.
          </p>
        </motion.div>

        {/* Social links and experience */}
        <motion.div
          className="flex flex-wrap justify-center md:justify-start items-center gap-4 mb-[16px] md:mb-[20px]"
          variants={itemVariants}
        >
          {/* GitHub icon */}
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="cursor-pointer">
              <g clipPath="url(#clip0_5_411)">
                <path fillRule="evenodd" clipRule="evenodd" d="M12.0099 0C5.36875 0 0 5.40833 0 12.0992C0 17.4475 3.43994 21.9748 8.21205 23.5771C8.80869 23.6976 9.02724 23.3168 9.02724 22.9965C9.02724 22.716 9.00757 21.7545 9.00757 20.7527C5.6667 21.474 4.97099 19.3104 4.97099 19.3104C4.43409 17.9082 3.63858 17.5478 3.63858 17.5478C2.54511 16.8066 3.71823 16.8066 3.71823 16.8066C4.93117 16.8868 5.56763 18.0486 5.56763 18.0486C6.64118 19.8913 8.37111 19.3707 9.06706 19.0501C9.16638 18.2688 9.48473 17.728 9.82275 17.4276C7.15817 17.1471 4.35469 16.1055 4.35469 11.458C4.35469 10.1359 4.8316 9.05428 5.58729 8.21304C5.46807 7.91263 5.0504 6.67043 5.70677 5.00787C5.70677 5.00787 6.72083 4.6873 9.00732 6.24981C9.98625 5.98497 10.9958 5.85024 12.0099 5.84911C13.024 5.84911 14.0577 5.98948 15.0123 6.24981C17.299 4.6873 18.3131 5.00787 18.3131 5.00787C18.9695 6.67043 18.5515 7.91263 18.4323 8.21304C19.2079 9.05428 19.6652 10.1359 19.6652 11.458C19.6652 16.1055 16.8617 17.1269 14.1772 17.4276C14.6148 17.8081 14.9924 18.5292 14.9924 19.6711C14.9924 21.2936 14.9727 22.5957 14.9727 22.9962C14.9727 23.3168 15.1915 23.6976 15.7879 23.5774C20.56 21.9745 23.9999 17.4475 23.9999 12.0992C24.0196 5.40833 18.6312 0 12.0099 0Z" fill="#9EF170"/>
              </g>
            </svg>
          </a>
          {/* LinkedIn icon */}
          <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="cursor-pointer">
              <g clipPath="url(#clip0_5_414)">
                <path d="M22.2234 0H1.77187C0.792187 0 0 0.773438 0 1.72969V22.2656C0 23.2219 0.792187 24 1.77187 24H22.2234C23.2031 24 24 23.2219 24 22.2703V1.72969C24 0.773438 23.2031 0 22.2234 0ZM7.12031 20.4516H3.55781V8.99531H7.12031V20.4516ZM5.33906 7.43438C4.19531 7.43438 3.27188 6.51094 3.27188 5.37187C3.27188 4.23281 4.19531 3.30937 5.33906 3.30937C6.47813 3.30937 7.40156 4.23281 7.40156 5.37187C7.40156 6.50625 6.47813 7.43438 5.33906 7.43438ZM20.4516 20.4516H16.8937V14.8828C16.8937 13.5562 16.8703 11.8453 15.0422 11.8453C13.1906 11.8453 12.9094 13.2937 12.9094 14.7891V20.4516H9.35625V8.99531H12.7687V10.5609H12.8156C13.2891 9.66094 14.4516 8.70938 16.1813 8.70938C19.7859 8.70938 20.4516 11.0813 20.4516 14.1656V20.4516Z" fill="#9EF170"/>
              </g>
            </svg>
          </a>
          {/* Experience */}
          <span className="font-montserrat text-[18px] md:text-[20px] font-normal text-[#98E76C] ml-2 md:ml-4">2+</span>
          <span className="font-montserrat text-[13px] md:text-[20px] font-normal text-white">years experience</span>
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="flex flex-col md:flex-row gap-3 md:gap-4 items-center w-full md:w-auto"
          variants={itemVariants}
        >
          <button
            onClick={() => {
              document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 h-[42px] rounded-[25px] relative flex justify-center items-center cursor-pointer font-montserrat text-base font-normal text-[#0E0E0E] shadow transition-transform duration-150 ease-in-out overflow-hidden hover:scale-105 active:scale-95 w-full md:w-auto"
            style={{
              background: 'linear-gradient(to right, #9EF170, #2E312D)',
            }}
          >
            <span className="relative z-10">View My Work</span>
            <span
              className="absolute inset-0 rounded-[25px] p-[2px] z-0 pointer-events-none"
              style={{
                background: 'linear-gradient(to right, #9EF170, #2E312D)',
                WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'xor',
                maskComposite: 'exclude',
              }}
            />
          </button>
          <button
            onClick={() => {
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 h-[42px] rounded-[25px] relative flex justify-center items-center cursor-pointer font-montserrat text-base font-normal text-white bg-transparent transition-transform duration-150 ease-in-out overflow-hidden hover:scale-105 active:scale-95 w-full md:w-auto"
            style={{
              border: '2px solid transparent',
              background:
                'linear-gradient(#121212, #121212) padding-box, linear-gradient(to right, #9EF170, #2E312D) border-box',
            }}
          >
            Let&apos;s Connect
          </button>
        </motion.div>
      </motion.div>

      {/* Code window */}
      <motion.div
        className="relative w-full md:w-[440px] h-[320px] md:h-[402px] flex items-center mt-8 md:mt-0 ml-0 mr-0"
        variants={codeVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Window controls */}
        <div className="absolute left-0 top-[16px] z-[3] w-full md:w-[440px]">
          <div className="w-full h-[32px] flex items-center rounded-t-[23px] bg-[#2F2E2E] px-6">
            <svg width="60" height="14" viewBox="0 0 60 14" fill="none" className="mr-3 -mt-1">
              <circle cx="7" cy="7" r="7" fill="#F87171"/>
              <circle cx="30" cy="7" r="7" fill="#FACC15"/>
              <circle cx="53" cy="7" r="7" fill="#4ADE80"/>
            </svg>
            <span
              className="font-fira-code text-[12px] font-medium text-white tracking-wider -mt-1"
              style={{ whiteSpace: 'pre' }}
            >
              benjamin-acheampong.js
            </span>
          </div>
        </div>
        {/* Code content with syntax highlighting */}
        <div className="absolute left-0 top-[44px] w-full md:w-[440px] h-[258px] md:h-[358px] rounded-b-[23px] bg-[#121212] shadow-[0px_12px_10.2px_rgba(0,0,0,0.25)] z-[3] px-0 py-0 flex items-start border-b-4 border-[#9EF170]">
          <pre className="font-fira-code text-[10px] md:text-[13px] leading-[1.5] text-left text-white w-full h-full px-4 md:px-7 py-3 m-0 whitespace-pre-wrap overflow-hidden">
            <span className="text-[#4E84C6]">class</span> <span className="text-[#4ADE80]">Developer</span> {'{'}<br />
    {'  '}
            <span className="text-[#C084FC]">constructor</span>() {'{'}
    <br />    <span className="text-[#5EA0F3]">this</span>.name = <span className="text-[#FACC15]">"Benjamin Ofosu Acheampong"</span>;
    <br />    <span className="text-[#5EA0F3]">this</span>.skills = [<span className="text-[#FACC15]">"React"</span>, <span className="text-[#FACC15]">"Node.js"</span>, <span className="text-[#FACC15]">"JavaScript"</span>];
    <br />  {'}'}
    <br /><br />  <span className="text-[#C084FC]">createValue</span>() {'{'}
    <br />    <span className="text-[#5EA0F3]">return</span> <span className="text-[#FACC15]">"Clean code, elegant solutions"</span>;
    <br />  {'}'}
    <br /><br />  <span className="text-[#C084FC]">solveProblems</span>(<span className="text-[#D9823C]">complexity</span>) {'{'}
    <br />    <span className="text-[#5EA0F3]">if</span> (complexity === <span className="text-[#FACC15]">"high"</span>) {'{'}
    <br />      <span className="text-[#5EA0F3]">return this</span>.<span className="text-[#C084FC]">thinkCreatively</span>();
    <br />    {'}'}
    <br />    <span className="text-[#5EA0F3]">return this</span>.<span className="text-[#C084FC]">applyBestPractices</span>();
    <br />  {'}'}
    <br />{'}'}
    <br /><br /><span className="text-[#5EA0F3]">const</span> <span className="text-[#FB923C]">me</span> = <span className="text-[#5EA0F3]">new</span> <span className="text-[#4ADE80]">Developer</span>();
    <br /><span className="text-[#FB923C]">me</span>.<span className="text-[#C084FC]">createValue</span>();
          </pre>
        </div>
        <div
          style={{
            position: 'absolute',
            left: 0,
            bottom: '-8px',
            width: '100%',
            height: '16px',
            borderRadius: '0 0 23px 23px',
            background: 'rgba(158, 241, 112, 0.6)',
            filter: 'blur(80px)',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />
      </motion.div>
      {/* Hopping scroll indicator */}
      <motion.div
        initial={{ y: 0 }}
        animate={{ y: [0, -18, 0] }}
        transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
        style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: ' -100px', // moved further down
          zIndex: 10,
          pointerEvents: 'none',
          opacity: showScroll ? 1 : 0,
          transition: 'opacity 0.4s',
        }}
      >
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <circle cx="18" cy="18" r="18" fill="rgba(158,241,112,0.15)" />
          <path d="M18 12V24" stroke="#9EF170" strokeWidth="2.5" strokeLinecap="round"/>
          <path d="M13 19L18 24L23 19" stroke="#9EF170" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </motion.div>
    </section>
  );
};

export default Hero;