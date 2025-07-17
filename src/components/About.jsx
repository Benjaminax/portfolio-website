import React, { useRef, useEffect, useState } from 'react';
import { FaGamepad, FaPaintBrush, FaRocket, FaProjectDiagram, FaRegClock, FaCode } from "react-icons/fa";
import resumePDF from '../assets/Benjamin_Acheampong_Resume.pdf';

const CIRCLE_SIZE = 110;
const STROKE_WIDTH = 10;
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

const metrics = [
  {
    key: "projects",
    label: "Projects",
    icon: <FaProjectDiagram size={32} className="text-[#9EF170]" />,
    max: 12,
    color: "#9EF170",
    tooltip: "Total completed projects",
  },
  {
    key: "experience",
    label: "Years Experience",
    icon: <FaRegClock size={32} className="text-[#9EF170]" />,
    max: 4,
    color: "#9EF170",
    tooltip: "Years of professional experience",
  },
  {
    key: "loc",
    label: "Lines of Code",
    icon: <FaCode size={32} className="text-[#9EF170]" />,
    max: 50000,
    color: "#9EF170",
    tooltip: "Lines of code written",
  },
];

const BarChart = () => {
  const [progress, setProgress] = useState({ projects: 0, experience: 0, loc: 0 });
  const desktopRef = useRef(null);
  const mobileRef = useRef(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProgress({ projects: 5, experience: 2, loc: 50000 });
        } else {
          setProgress({ projects: 0, experience: 0, loc: 0 });
        }
      },
      { threshold: 0.3 }
    );
    if (desktopRef.current) observer.observe(desktopRef.current);
    if (mobileRef.current) observer.observe(mobileRef.current);
    return () => observer.disconnect();
  }, []);

  // Desktop View
  const DesktopBarChart = (
    <div
      className="w-full hidden sm:flex flex-row justify-center gap-8 mb-12"
      ref={desktopRef}
    >
      {metrics.map((metric) => {
        const value = progress[metric.key];
        const percent = Math.min(value / metric.max, 1);
        const dashOffset = CIRCUMFERENCE * (1 - percent);

        return (
          <div
            key={metric.key}
            className="flex flex-col items-center bg-[#232323] rounded-2xl shadow-lg px-6 py-6 relative group transition-transform hover:scale-105"
            style={{ minWidth: 160 }}
            title={metric.tooltip}
          >
            <div className="mb-2">{metric.icon}</div>
            <div className="relative flex items-center justify-center mb-2">
              <svg width={CIRCLE_SIZE} height={CIRCLE_SIZE}>
                <circle
                  cx={CIRCLE_SIZE / 2}
                  cy={CIRCLE_SIZE / 2}
                  r={RADIUS}
                  fill="none"
                  stroke="#232323"
                  strokeWidth={STROKE_WIDTH}
                />
                <circle
                  cx={CIRCLE_SIZE / 2}
                  cy={CIRCLE_SIZE / 2}
                  r={RADIUS}
                  fill="none"
                  stroke={metric.color}
                  strokeWidth={STROKE_WIDTH}
                  strokeDasharray={CIRCUMFERENCE}
                  strokeDashoffset={dashOffset}
                  strokeLinecap="round"
                  style={{
                    transition: "stroke-dashoffset 1s cubic-bezier(.4,2,.6,1)",
                  }}
                />
              </svg>
              <span className="absolute text-[#9EF170] font-bold text-xl select-none">
                {metric.key === "loc"
                  ? value.toLocaleString()
                  : value}
              </span>
            </div>
            <div className="text-[#AEAEAE] font-semibold text-base text-center">
              {metric.label}
            </div>
            {/* Tooltip on hover */}
            <div className="absolute bottom-[-38px] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 pointer-events-none transition bg-[#181818] text-[#9EF170] text-xs px-3 py-1 rounded shadow-lg z-20">
              {metric.tooltip}
            </div>
          </div>
        );
      })}
    </div>
  );

  // Mobile View
  const MobileBarChart = (
    <div
      className="w-full flex sm:hidden flex-col items-center gap-4 mb-8"
      ref={mobileRef}
    >
      {metrics.map((metric) => {
        const value = progress[metric.key];
        const percent = Math.min(value / metric.max, 1);
        const dashOffset = CIRCUMFERENCE * (1 - percent);

        return (
          <div
            key={metric.key}
            className="flex flex-row items-center bg-[#232323] rounded-2xl shadow-lg px-4 py-4 w-full max-w-[340px] relative group transition-transform hover:scale-[1.02]"
            title={metric.tooltip}
          >
            <div className="mr-4">{metric.icon}</div>
            <div className="relative flex items-center justify-center mr-4">
              <svg
                width={CIRCLE_SIZE * 0.7}
                height={CIRCLE_SIZE * 0.7}
                viewBox={`0 0 ${CIRCLE_SIZE * 0.7} ${CIRCLE_SIZE * 0.7}`}
              >
                <circle
                  cx={(CIRCLE_SIZE * 0.7) / 2}
                  cy={(CIRCLE_SIZE * 0.7) / 2}
                  r={(RADIUS * 0.7)}
                  fill="none"
                  stroke="#232323"
                  strokeWidth={STROKE_WIDTH * 0.7}
                />
                <circle
                  cx={(CIRCLE_SIZE * 0.7) / 2}
                  cy={(CIRCLE_SIZE * 0.7) / 2}
                  r={(RADIUS * 0.7)}
                  fill="none"
                  stroke={metric.color}
                  strokeWidth={STROKE_WIDTH * 0.7}
                  strokeDasharray={CIRCUMFERENCE * 0.7}
                  strokeDashoffset={dashOffset * 0.7}
                  strokeLinecap="round"
                  style={{
                    transition: "stroke-dashoffset 1s cubic-bezier(.4,2,.6,1)",
                  }}
                />
              </svg>
              <span className="absolute text-[#9EF170] font-bold text-base select-none">
                {metric.key === "loc"
                  ? value.toLocaleString()
                  : value}
              </span>
            </div>
            <div className="flex-1">
              <div className="text-[#AEAEAE] font-semibold text-base">
                {metric.label}
              </div>
              <div className="text-[#9EF170] text-xs mt-1">{metric.tooltip}</div>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <>
      {DesktopBarChart}
      {MobileBarChart}
    </>
  );
};

const funTimeline = [
  {
    icon: <FaGamepad size={32} className="text-[#9EF170] drop-shadow-glow" />,
    title: "Game Dev Visionary",
    fact: "Currently building 'OBE', a unique indie game blending storytelling and mechanics.",
  },
  {
    icon: <FaPaintBrush size={32} className="text-[#9EF170] drop-shadow-glow" />,
    title: "Graphic Designer @ Academic City",
    fact: "Crafting digital art and visuals for campus events and student projects.",
  },
  {
    icon: <FaRocket size={32} className="text-[#9EF170] drop-shadow-glow" />,
    title: "Sci-Fi Innovator",
    fact: "Inspired by sci-fi, I infuse futuristic ideas and innovation into every project.",
  },
];

const FunTimeline = () => {
  const [visible, setVisible] = useState(false);
  const timelineRef = useRef(null);

  useEffect(() => {
    const observer = new window.IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.2 }
    );
    if (timelineRef.current) observer.observe(timelineRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={timelineRef}
      className="flex flex-col items-center mt-16 relative"
      aria-label="Fun Timeline"
    >
      <div className="absolute left-1/2 -translate-x-1/2 h-full w-1 bg-gradient-to-b from-[#9EF170] to-transparent opacity-60 z-0" />
      {funTimeline.map((item, idx) => (
        <div
          key={idx}
          className={`relative z-10 flex flex-col sm:flex-row items-center mb-8 sm:mb-12 transition-all duration-700
            ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}
          `}
          style={{ transitionDelay: `${idx * 200}ms` }}
        >
          <div className="flex flex-col items-center sm:mr-8 mb-4 sm:mb-0">
            <div className="bg-[#232323] rounded-full p-4 shadow-lg border-4 border-[#9EF170] animate-pulse">
              {item.icon}
            </div>
            {idx < funTimeline.length - 1 && (
              <div className="w-1 h-8 sm:h-12 bg-gradient-to-b from-[#9EF170] to-transparent opacity-60" />
            )}
          </div>
          <div className="bg-[#181818] rounded-xl shadow-lg p-4 sm:p-6 w-full max-w-xs sm:w-80">
            <h4 className="text-[#9EF170] font-bold text-base sm:text-lg mb-1 sm:mb-2">{item.title}</h4>
            <p className="text-[#AEAEAE] text-sm sm:text-base">{item.fact}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const About = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const [lineHeight, setLineHeight] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !textRef.current) return;
      const section = sectionRef.current;
      const text = textRef.current;
      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how much of the section is visible
      const totalScroll = rect.height - windowHeight;
      const scrolled = Math.min(Math.max(windowHeight - rect.top, 0), rect.height);
      const progress = totalScroll > 0 ? scrolled / rect.height : 1;

      // Get the text container's height
      const textHeight = text.offsetHeight;

      // Set the line height based on scroll progress
      setLineHeight(progress * textHeight);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="w-full max-w-[1180px] mx-auto min-h-[1024px] relative top-[250px] flex flex-col px-4 sm:px-8"
    >
      {/* Radial Gradient Blur Background - Bottom Right */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none z-0"
        style={{
          width: 400, // smaller on mobile
          height: 400,
          background: 'radial-gradient(circle, #9EF170 0%, #181818 70%, transparent 100%)',
          filter: 'blur(60px)',
          opacity: 0.45,
        }}
      />
      <div className="relative z-10">
        <div className="text-center mb-[32px] sm:mb-[50px]">
          <h2 className="font-montserrat text-[32px] sm:text-[44px] font-bold bg-gradient-to-r from-[#9EF170] to-[#0E0E0E] bg-clip-text text-transparent mb-[5px]">
            About Me
          </h2>
          <div className="w-[80px] sm:w-[121px] h-[7px] sm:h-[9px] rounded-[25px] bg-gradient-to-r from-[#9EF170] to-[#0E0E0E] mx-auto"></div>
        </div>

        <div className="flex flex-col lg:flex-row items-start relative gap-8">
          {/* Vertical Line & Text */}
          <div className="flex flex-col lg:flex-row w-full lg:w-1/2">
            {/* Vertical Line */}
            <div
              className="hidden lg:flex relative mb-4 lg:mb-0 lg:mr-8 flex-col items-center"
              style={{ minWidth: 6 }}
            >
              <div
                className="bg-gradient-to-b from-[#9EF170] to-[#0E0E0E] rounded-full transition-all duration-300"
                style={{
                  width: '4px',
                  height: `${lineHeight}px`,
                  minHeight: 0,
                  maxHeight: textRef.current ? textRef.current.offsetHeight : 'none',
                }}
              />
            </div>
            {/* Text */}
            <div
              ref={textRef}
              className="font-montserrat text-[15px] sm:text-[17px] font-normal text-[#AEAEAE] leading-[1.7] text-left"
            >
              <p>
                I'm Benjamin Ofosu Acheampong a passionate software and game developer, driven by curiosity and creativity. My journey into technology started with a simple desire: to build things that matter. Over the years, that spark has grown into a full-blown pursuit of excellence in web development, game design, and impactful tech solutions.
              </p>
              <br />
              <p>
                I'm currently pursuing a BSc in Computer Science at Academic City University College, where I'm not just growing as a developer, but as a leader. I serve as the President of both the Writers' Society and the Debate Section, which has sharpened my ability to communicate, lead, and think critically — skills I bring into every project I work on.
              </p>
              <br />
              <p>
                Whether I'm developing games in Unreal Engine, building sleek, responsive websites with React, or experimenting with Python and AI, I strive to create experiences that are both functional and meaningful. I've also contributed to community and campus initiatives, from producing radio shows to helping student entrepreneurs scale their ideas.
              </p>
              <br />
              <p>
                Technology is my tool. Impact is my goal. And this portfolio is a glimpse into the path I'm building one project, one idea, one challenge at a time.
              </p>
              {/* Resume Download Button with id moved down */}
              <a
                id="about-resume"
                href={resumePDF}
                download="Benjamin_Acheampong_Resume.pdf"
                className="inline-block mt-7 px-6 py-2 rounded-lg bg-[#9EF170] text-[#181818] font-semibold shadow-md hover:bg-[#7ed957] transition-colors"
              >
                Download Resume
              </a>
            </div>
          </div>

          {/* BarChart and FunTimeline stacked vertically */}
          <div className="w-full lg:w-1/2 flex flex-col mt-8 lg:mt-0">
            <BarChart />
            <FunTimeline />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;