import { FaGithub, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white text-[#181A1B] pt-12 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-10 pb-8 border-b border-gray-200">
          {/* Logo & Description */}
          <div className="flex-1 mb-6 md:mb-0">
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-cyan-400 rounded-full w-8 h-8 flex items-center justify-center text-black font-bold text-xl">
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
                className="hover:text-cyan-500 transition-colors text-[#181A1B]"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-500 transition-colors text-[#181A1B]"
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
                    className="hover:text-cyan-500"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    className="hover:text-cyan-500"
                  >
                    About Me
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    className="hover:text-cyan-500"
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
                    className="hover:text-cyan-500"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/yourusername"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-cyan-500"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:your@email.com"
                    className="hover:text-cyan-500"
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
                    href="#"
                    className="hover:text-cyan-500"
                  >
                    Resume
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-cyan-500"
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
          <div className="flex gap-4 mt-2 md:mt-0">
            <a
              href="#"
              className="hover:text-cyan-500"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="hover:text-cyan-500"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;