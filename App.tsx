
import React, { useState } from 'react';
import Atmosphere from './components/Atmosphere';
import Countdown from './components/Countdown';
import MusicPlayer from './components/MusicPlayer';
import DailyPhrase from './components/DailyPhrase';
import { Palette, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [theme, setTheme] = useState<'black' | 'purple'>('black');

  const toggleTheme = () => {
    setTheme(prev => prev === 'black' ? 'purple' : 'black');
  };

  return (
    <div className={`min-h-screen relative flex flex-col selection:bg-purple-900/40 transition-colors duration-1000 ${theme === 'purple' ? 'text-indigo-50' : 'text-zinc-100'}`}>
      <Atmosphere theme={theme} />
      <MusicPlayer />
      
      {/* Theme Toggle Button */}
      <button 
        onClick={toggleTheme}
        className="fixed top-8 right-8 z-50 flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-950/20 backdrop-blur-md border border-white/5 hover:border-white/20 transition-all group overflow-hidden"
      >
        <Palette size={16} className={`transition-colors duration-500 ${theme === 'purple' ? 'text-indigo-400' : 'text-zinc-500'}`} />
        <span className="text-[10px] uppercase tracking-widest text-zinc-400 group-hover:text-white transition-colors">
          {theme === 'black' ? 'Obsidiana' : 'Ametista'}
        </span>
        <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 -z-10"></div>
      </button>
      
      {/* Header section */}
      <header className="pt-24 pb-8 flex flex-col items-center animate-in fade-in slide-in-from-top-4 duration-1000">
        <div className="flex items-center gap-2 mb-3">
          <div className="h-[1px] w-8 bg-zinc-800"></div>
          <h1 className={`text-[10px] uppercase tracking-[0.6em] transition-colors duration-1000 font-medium ${theme === 'purple' ? 'text-indigo-400' : 'text-zinc-600'}`}>
            Destino
          </h1>
          <div className="h-[1px] w-8 bg-zinc-800"></div>
        </div>
        <h2 className="text-5xl md:text-7xl font-serif font-extralight tracking-[0.2em] text-white text-center mb-6 drop-shadow-2xl">
          ANNA BEATRIZ
        </h2>
        <div className={`flex items-center gap-3 transition-opacity duration-1000 ${theme === 'purple' ? 'opacity-40' : 'opacity-20'}`}>
          <Sparkles size={12} className="text-white" />
          <div className={`h-[0.5px] w-32 bg-gradient-to-r from-transparent via-white to-transparent`}></div>
          <Sparkles size={12} className="text-white" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center space-y-4 md:space-y-8">
        <section className="w-full">
          <Countdown />
        </section>

        <section className="w-full">
          <DailyPhrase />
        </section>

        <section className="pb-32 px-8 text-center max-w-xl mx-auto flex flex-col items-center">
          <div className="relative group">
            <p className={`text-xs md:text-sm uppercase tracking-[0.4em] mb-8 italic font-light leading-relaxed transition-colors duration-1000 ${theme === 'purple' ? 'text-indigo-300' : 'text-zinc-400'}`}>
              &ldquo;Algumas pessoas não se esquecem. Se esperam.&rdquo;
            </p>
          </div>
          <p className={`text-[9px] tracking-[0.25em] uppercase transition-colors duration-1000 ${theme === 'purple' ? 'text-indigo-700' : 'text-zinc-800'}`}>
            Desde o primeiro desejo até o reencontro final
          </p>
        </section>
      </main>

      {/* Subtle bottom detail */}
      <footer className="py-10 border-t border-white/5 text-center bg-black/20">
        <div className={`flex flex-col md:flex-row items-center justify-center gap-4 text-[9px] uppercase tracking-[0.2em] transition-colors duration-1000 ${theme === 'purple' ? 'text-indigo-900' : 'text-zinc-700'}`}>
          <span>UTC-3 Brasília Time</span>
          <span className="hidden md:block opacity-30">|</span>
          <span className="font-bold">A contagem termina em 07.01.2026</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
