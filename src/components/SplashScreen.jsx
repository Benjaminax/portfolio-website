import React, { useEffect, useState } from 'react';

const SplashScreen = ({ finishLoading }) => {
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    // Keep splash screen for a short duration, then fade out
    const timer = setTimeout(() => {
      setIsFadingOut(true);
      setTimeout(() => {
        finishLoading();
      }, 500); // 500ms fade out transition
    }, 2000); // Wait 2 seconds before fading out

    return () => clearTimeout(timer);
  }, [finishLoading]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0E0E0E] transition-opacity duration-500 ease-in-out ${
        isFadingOut ? 'opacity-0' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col items-center">
        <div className="flex font-montserrat font-bold flex-col items-start tracking-wider">
          <div>
            <span className="text-[48px] md:text-[64px] text-[#9EF170]">PROFILE</span>
            <span className="text-[48px] md:text-[64px] text-white">.</span>
          </div>
          <span className="text-[32px] md:text-[42px] text-white ml-[4px] -mt-4 md:-mt-6">BOARD</span>
        </div>
        <div className="flex items-center gap-2 mt-8">
          <div className="w-2.5 h-2.5 rounded-full bg-[#9EF170] animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#9EF170] animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          <div className="w-2.5 h-2.5 rounded-full bg-[#9EF170] animate-bounce" style={{ animationDelay: '0.4s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
