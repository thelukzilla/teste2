
import React from 'react';
import { PHRASES } from '../constants';

const DailyPhrase: React.FC = () => {
  // Rotate based on day of year
  const getDailyPhrase = () => {
    const now = new Date();
    const start = new Date(now.getFullYear(), 0, 0);
    const diff = now.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);
    
    return PHRASES[dayOfYear % PHRASES.length];
  };

  const phrase = getDailyPhrase();

  return (
    <div className="max-w-2xl mx-auto px-8 text-center py-20 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="w-12 h-[1px] bg-zinc-800 mx-auto mb-10"></div>
      <p className="text-xl md:text-2xl font-serif italic text-zinc-300 leading-relaxed tracking-wide opacity-90">
        &ldquo;{phrase}&rdquo;
      </p>
      <div className="w-12 h-[1px] bg-zinc-800 mx-auto mt-10"></div>
    </div>
  );
};

export default DailyPhrase;
