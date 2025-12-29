
import React, { useState, useEffect } from 'react';
import { TARGET_DATE } from '../constants';
import { TimeLeft } from '../types';

const Countdown: React.FC = () => {
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +new Date(TARGET_DATE) - +new Date();
    let timeLeft: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number; label: string }) => (
    <div className="flex flex-col items-center mx-3 md:mx-6 group">
      <span className="text-4xl md:text-7xl font-serif font-light tracking-tighter text-white group-hover:text-stone-300 transition-colors duration-700">
        {value < 10 ? `0${value}` : value}
      </span>
      <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-zinc-500 mt-2">
        {label}
      </span>
    </div>
  );

  return (
    <div className="flex flex-wrap justify-center items-center py-12 px-4 select-none">
      <TimeUnit value={timeLeft.days} label="dias" />
      <div className="text-zinc-800 text-3xl mb-6 hidden md:block">/</div>
      <TimeUnit value={timeLeft.hours} label="horas" />
      <div className="text-zinc-800 text-3xl mb-6 hidden md:block">/</div>
      <TimeUnit value={timeLeft.minutes} label="minutos" />
      <div className="text-zinc-800 text-3xl mb-6 hidden md:block">/</div>
      <TimeUnit value={timeLeft.seconds} label="segundos" />
    </div>
  );
};

export default Countdown;
