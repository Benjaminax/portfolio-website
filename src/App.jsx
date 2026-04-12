import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import Projects from './components/Projects';
import Footer from './components/Footer'; // Import Footer
import SplashScreen from './components/SplashScreen'; // Import SplashScreen
import './App.css';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <SplashScreen finishLoading={() => setIsLoading(false)} />}
      <div className="flex flex-col min-h-screen w-full bg-[#0E0E0E] relative">
        <Navbar />
        <div id="hero">
          <Hero />
        </div>
        <div id="about">
          <About />
        </div>
        <div>
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
    </>
  );
}

export default App;