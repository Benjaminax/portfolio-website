import React, { useEffect, useState, useRef } from 'react';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [heroWidth, setHeroWidth] = useState('100%');
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const hideTimeout = useRef(null);
  const navbarRef = useRef(null);

  // --- Detect clicks outside navbar/menu ---
  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (event) => {
      if (
        navbarRef.current &&
        !navbarRef.current.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [menuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const atTop = window.scrollY === 0;
      setScrolled(!atTop);

      // --- Prevent navbar from hiding when menu is open ---
      if (menuOpen) {
        setVisible(true);
        if (hideTimeout.current) clearTimeout(hideTimeout.current);
        return;
      }

      // Always show navbar at the very top
      if (atTop) {
        setVisible(true);
        if (hideTimeout.current) clearTimeout(hideTimeout.current);
        return;
      }

      // Show navbar on scroll
      setVisible(true);

      // Clear previous timeout
      if (hideTimeout.current) clearTimeout(hideTimeout.current);

      // Hide navbar after 20s of inactivity (not at top)
      hideTimeout.current = setTimeout(() => {
        setVisible(false);
      }, 15000);
    };

    window.addEventListener('scroll', handleScroll);

    // Set navbar width to match hero section
    const setWidth = () => {
      const hero = document.getElementById('hero');
      if (hero) {
        setHeroWidth(`${hero.offsetWidth}px`);
      }
    };
    setWidth();
    window.addEventListener('resize', setWidth);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', setWidth);
      if (hideTimeout.current) clearTimeout(hideTimeout.current);
    };
  }, [menuOpen]); // <-- add menuOpen as dependency

  // Dynamic classes
  const navBg = scrolled ? 'bg-[#232323] shadow-md' : 'bg-transparent';
  const textMain = 'text-white'; // Always white
  const textAccent = 'text-[#9EF170]'; // Always accent
  const textNav = scrolled ? 'text-white' : 'text-[#AEAEAE]';

  return (
    <div
      ref={navbarRef}
      className={`fixed top-0 left-0 w-full z-50 transition-transform duration-500 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      {/* Full-width dark gray strip when scrolled */}
      {scrolled && (
        <div className="absolute top-0 left-0 w-full h-[79px] bg-[#232323] shadow-md transition-colors duration-300 -z-10"></div>
      )}
      <nav
        className="relative left-1/2 transform -translate-x-1/2 w-full max-w-[1800px] h-[79px] flex items-center justify-between px-4 md:px-[20px] pt-0"
        style={{ width: heroWidth, transition: 'color 0.3s' }}
      >
        <div
          className="flex font-montserrat font-bold flex-col items-start cursor-pointer"
          onClick={() => window.location.href = '/'}
        >
          <div>
            <span className={`text-[24px] ${textAccent}`}>PROFILE</span>
            <span className={`text-[24px] ${textMain}`}>.</span>
          </div>
          <span className={`text-[16px] ${textMain} ml-[2px] -mt-2`}>BOARD</span>
        </div>
        
        {/* Desktop Nav */}
        <div className="hidden md:flex gap-[19px] items-center ml-[650px]">
          <span
            className={`font-montserrat text-[14px] font-bold cursor-pointer ${textNav}`}
            onClick={() => {
              const hero = document.getElementById('hero');
              if (hero) {
                hero.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            HOME
          </span>
          <span
            className={`font-montserrat text-[14px] font-bold cursor-pointer ${textNav}`}
            onClick={() => {
              const about = document.getElementById('about');
              if (about) {
                about.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            ABOUT
          </span>
          <span
            className={`font-montserrat text-[14px] font-bold cursor-pointer ${textNav}`}
            onClick={() => {
              const contact = document.getElementById('contact');
              if (contact) {
                contact.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            CONTACT
          </span>
          <span
            className={`font-montserrat text-[14px] font-bold cursor-pointer ${textNav}`}
            onClick={() => {
              const projects = document.getElementById('projects');
              if (projects) {
                projects.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            PROJECTS
          </span>
        </div>

        

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden flex items-center ml-auto pr-0 mr-2">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="focus:outline-none group"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <span
                className={`block absolute h-[3px] w-6 bg-[#9EF170] rounded transition-all duration-300 ease-in-out
                  ${menuOpen ? 'rotate-45 top-3' : 'top-1'}`}
              ></span>
              <span
                className={`block absolute h-[3px] w-6 bg-[#9EF170] rounded transition-all duration-300 ease-in-out
                  ${menuOpen ? 'opacity-0 left-3' : 'top-3'}`}
              ></span>
              <span
                className={`block absolute h-[3px] w-6 bg-[#9EF170] rounded transition-all duration-300 ease-in-out
                  ${menuOpen ? '-rotate-45 top-3' : 'top-5'}`}
              ></span>
            </div>
          </button>
        </div>
        
        <div className="relative flex items-center">
          <svg
            width="60"
            height="60"
            viewBox="0 0 60 60"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse cx="30" cy="30" rx="30" ry="30" fill="#9EF170" />
          </svg>
          <span className="absolute left-[53%] top-1/2 transform -translate-x-1/2 -translate-y-1/2 font-montserrat text-[9px] font-bold text-black tracking-[3.63px]">
            VISION
          </span>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-[79px] left-0 w-full bg-[#232323] z-40 flex flex-col items-end pr-6 py-6 gap-6 shadow-lg transition-transform duration-500 ${
          menuOpen
            ? 'translate-y-0 opacity-100 pointer-events-auto'
            : '-translate-y-8 opacity-0 pointer-events-none'
        }`}
        style={{ willChange: 'transform, opacity' }}
      >
        <span
          className="font-montserrat text-[18px] font-normal cursor-pointer text-white"
          onClick={() => {
            setMenuOpen(false);
            const hero = document.getElementById('hero');
            if (hero) {
              hero.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          HOME
        </span>
        <span
          className="font-montserrat text-[18px] font-normal cursor-pointer text-white"
          onClick={() => {
            setMenuOpen(false);
            const about = document.getElementById('about');
            if (about) {
              about.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          ABOUT
        </span>
        <span
          className="font-montserrat text-[18px] font-normal cursor-pointer text-white"
          onClick={() => {
            setMenuOpen(false);
            const contact = document.getElementById('contact');
            if (contact) {
              contact.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          CONTACT
        </span>
        <span
          className="font-montserrat text-[18px] font-normal cursor-pointer text-white"
          onClick={() => {
            setMenuOpen(false);
            const projects = document.getElementById('projects');
            if (projects) {
              projects.scrollIntoView({ behavior: 'smooth' });
            }
          }}
        >
          PROJECTS
        </span>
      </div>
    </div>
  );
};

export default Navbar;