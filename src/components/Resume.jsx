import { motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';

const Resume = ({ darkMode }) => {
  const experiences = [
    {
      position: "Senior Frontend Developer",
      company: "Tech Solutions Inc.",
      period: "2020 - Present",
      responsibilities: [
        "Led a team of 5 developers to build enterprise applications",
        "Improved application performance by 40%",
        "Implemented CI/CD pipelines"
      ]
    },
    {
      position: "UI Developer",
      company: "Creative Agency",
      period: "2018 - 2020",
      responsibilities: [
        "Designed and implemented responsive UIs",
        "Collaborated with UX designers",
        "Created design systems"
      ]
    }
  ];

  const educations = [
    {
      degree: "MSc Computer Science",
      institution: "University of Technology",
      period: "2016 - 2018"
    },
    {
      degree: "BSc Software Engineering",
      institution: "Tech University",
      period: "2012 - 2016"
    }
  ];

  return (
    <section id="resume" className="py-20">
      <div className="container mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-12 text-center"
        >
          My Resume
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={`max-w-4xl mx-auto p-8 rounded-xl ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-lg`}
        >
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Contact</h3>
                <ul className="space-y-2">
                  <li>benjamin@example.com</li>
                  <li>(123) 456-7890</li>
                  <li>Accra, Ghana</li>
                </ul>
              </div>
              
              <div className="mb-8">
                <h3 className="text-xl font-bold mb-4">Skills</h3>
                <ul className="space-y-2">
                  <li>React & React Native</li>
                  <li>Node.js & Express</li>
                  <li>TypeScript</li>
                  <li>UI/UX Design</li>
                  <li>Game Development</li>
                </ul>
              </div>

              <div>
                <h3 className="text-xl font-bold mb-4">Education</h3>
                <ul className="space-y-4">
                  {educations.map((edu, index) => (
                    <li key={index}>
                      <h4 className="font-semibold">{edu.degree}</h4>
                      <p className="text-sm opacity-75">{edu.institution}</p>
                      <p className="text-sm opacity-75">{edu.period}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="md:w-2/3">
              <h3 className="text-xl font-bold mb-6">Experience</h3>
              <div className="space-y-8">
                {experiences.map((exp, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h4 className="text-lg font-bold">{exp.position}</h4>
                    <p className="text-sm opacity-75 mb-2">{exp.company} • {exp.period}</p>
                    <ul className="list-disc pl-5 space-y-1">
                      {exp.responsibilities.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-6 py-3 rounded-lg flex items-center gap-2 mx-auto ${
                darkMode ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-800'
              }`}
            >
              <FiDownload />
              Download Full Resume
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Resume;