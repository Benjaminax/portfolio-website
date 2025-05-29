import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import Projects from './components/Projects';
import Footer from './components/Footer'; // Import Footer
import './App.css';

function App() {
  return (
    <div className="flex flex-col min-h-screen w-full bg-[#0E0E0E] relative">
      <Navbar />
      <div id="hero">
        <Hero />
      </div>
      <div id="about">
        <About />
      </div>
      <div id="contact">
        <Contact />
      </div>
      <div id="projects">
        <Projects />
      </div>
      {/* Footer section */}
      <div id="footer">
        <Footer />
      </div>
    </div>
  );
}

export default App;