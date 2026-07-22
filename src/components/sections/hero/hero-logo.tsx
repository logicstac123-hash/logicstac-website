import React from 'react';

const HeroLogo: React.FC = () => {
  return (
    <div className="fixed top-[1.2rem] left-1/2 -translate-x-1/2 z-40 flex flex-col items-center gap-1 hero-center-icon">
      <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
        <span className="text-ln-yellow font-black text-xs">LS</span>
      </div>
    </div>
  );
};

export default HeroLogo;

