
import React from 'react';

interface AtmosphereProps {
  theme: 'black' | 'purple';
}

const Atmosphere: React.FC<AtmosphereProps> = ({ theme }) => {
  const isPurple = theme === 'purple';

  return (
    <div className={`fixed inset-0 -z-10 transition-colors duration-1000 overflow-hidden ${isPurple ? 'bg-[#0f051a]' : 'bg-black'}`}>
      {/* Dynamic sensual gradient */}
      <div className={`absolute inset-0 transition-opacity duration-1000 ${
        isPurple 
        ? 'bg-gradient-to-b from-[#1a0a2e] via-[#0f051a] to-[#05000a]' 
        : 'bg-gradient-to-b from-black via-zinc-950 to-stone-950'
      }`}></div>
      
      {/* Floating subtle blur circles */}
      <div className={`absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full blur-[120px] animate-pulse transition-colors duration-1000 ${
        isPurple ? 'bg-indigo-900/20' : 'bg-purple-900/10'
      }`}></div>
      <div className={`absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full blur-[150px] animate-pulse transition-colors duration-1000 ${
        isPurple ? 'bg-fuchsia-950/10' : 'bg-red-950/5'
      }`} style={{ animationDelay: '2s' }}></div>
      
      {/* Noise texture overlay */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay"
           style={{ backgroundImage: `url('https://grainy-gradients.vercel.app/noise.svg')` }}></div>
    </div>
  );
};

export default Atmosphere;
