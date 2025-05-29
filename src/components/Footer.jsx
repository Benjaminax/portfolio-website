import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-[#181A1B] pt-12 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10 pb-8 border-b border-gray-200">
          {/* Logo & Description */}
          <div className="flex-1 mb-6 md:mb-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-[#9EF170] rounded-full w-8 h-8 flex items-center justify-center text-black font-bold text-xl transition-colors duration-200 hover:bg-[#7cd957]">
                B
              </div>
              <span className="font-semibold text-lg text-[#181A1B]">
                Benjamin Acheampong
              </span>
            </div>
            <p className="text-gray-600 max-w-xs">
              Building digital experiences and solutions with passion for code and
              design.
            </p>
            <div className="flex gap-4 mt-4 text-2xl">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors text-[#181A1B] hover:text-black hover:bg-[#9EF170] rounded-full p-1"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors text-[#181A1B] hover:text-black hover:bg-[#9EF170] rounded-full p-1"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
          {/* Navigation Columns */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8">
            <div>
              <h4 className="font-semibold mb-2 text-[#181A1B]">Portfolio</h4>
              <ul className="space-y-1 text-gray-500 text-sm">
                <li>
                  <a
                    href="#projects"
                    className="hover:text-[#9EF170]"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-[#9EF170]"
                  >
                    About Me
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-[#9EF170]"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-[#181A1B]">Links</h4>
              <ul className="space-y-1 text-gray-500 text-sm">
                <li>
                  <a
                    href="https://github.com/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#9EF170]"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#9EF170]"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:your@email.com"
                    className="hover:text-[#9EF170]"
                  >
                    Email
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2 text-[#181A1B]">More</h4>
              <ul className="space-y-1 text-gray-500 text-sm">
                <li>
                  <a
                    href="#about-resume"
                    className="hover:text-[#9EF170]"
                  >
                    Resume
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-[#9EF170]"
                  >
                    Blog
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center py-4 border-t border-gray-200 mt-4 text-gray-500 text-xs">
          <span>
            © {new Date().getFullYear()} Benjamin Acheampong. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;