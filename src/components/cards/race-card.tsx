import React from 'react';

const RaceCard: React.FC = () => {
  return (
    <div className="fixed top-1/2 -translate-y-1/2 left-6 z-40 hidden lg:block">
      <div className="flex flex-col gap-4">
        {/* Main Card */}
        <div className="w-24 h-40 border border-black/80 rounded-lg p-2 flex flex-col items-center justify-between bg-white/50 backdrop-blur-sm relative">
            <span className="text-[8px] font-sans font-bold uppercase tracking-wider text-gray-500 w-full text-left">Next Launch</span>
            
            {/* LogicStac Emblem */}
            <div className="w-full flex-1 flex items-center justify-center py-2">
                <svg viewBox="0 0 100 100" fill="none" stroke="black" strokeWidth="2" className="w-10 h-10">
                   <path d="M20 20 H80 V80 H20 Z M35 35 H65 V65 H35 Z" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>

            <div className="w-full border-t border-black/20 pt-1">
                <span className="text-[8px] font-bold font-display uppercase block text-center">Studio v2.5</span>
            </div>
        </div>

        {/* Studio Badge */}
        <div className="w-24 flex flex-col items-center text-center opacity-70">
            <div className="w-12 h-12 flex items-center justify-center border border-black/20 rounded-full mb-1">
                 <span className="font-serif font-bold text-xs text-black">LS</span>
            </div>
            <p className="text-[8px] font-sans font-bold uppercase leading-tight">LogicStac<br/>London & WW</p>
        </div>
      </div>
    </div>
  );
};

export default RaceCard;