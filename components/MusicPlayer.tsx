
import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, SkipForward, Music, Search, X, Volume2 } from 'lucide-react';
import { INITIAL_PLAYLIST } from '../constants';

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [activeYoutubeUrl, setActiveYoutubeUrl] = useState('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const currentTrack = INITIAL_PLAYLIST[currentTrackIndex];

  // Update URL when track changes or search is triggered
  useEffect(() => {
    if (isPlaying) {
      let url = '';
      if (searchQuery.trim()) {
        // Use search query - the "listType=search" only works if "list" is provided
        url = `https://www.youtube.com/embed?listType=search&list=${encodeURIComponent(searchQuery)}&autoplay=1&enablejsapi=1&origin=${window.location.origin}`;
      } else {
        // Direct track ID
        url = `https://www.youtube.com/embed/${currentTrack.id}?autoplay=1&enablejsapi=1&origin=${window.location.origin}`;
      }
      setActiveYoutubeUrl(url);
    } else {
      setActiveYoutubeUrl('');
    }
  }, [isPlaying, currentTrackIndex, searchQuery]);

  const togglePlay = () => {
    // If we're starting to play, we need a user interaction
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setSearchQuery(''); 
    setCurrentTrackIndex((prev) => (prev + 1) % INITIAL_PLAYLIST.length);
    setIsPlaying(true);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setIsPlaying(true);
      setIsSearching(false);
    }
  };

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 md:left-8 md:translate-x-0 z-50 flex flex-col gap-3">
      <div className="flex flex-col gap-2 bg-zinc-950/80 backdrop-blur-3xl p-4 rounded-3xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all hover:border-white/20 w-[300px] md:w-[340px]">
        
        {/* Search Bar Toggle */}
        <div className="flex items-center justify-between mb-2">
          {isSearching ? (
            <form onSubmit={handleSearch} className="flex-1 flex items-center gap-2 animate-in fade-in zoom-in-95 duration-300">
              <input 
                autoFocus
                type="text"
                placeholder="Qual música você quer?"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-white/5 border-none text-xs text-white placeholder:text-zinc-500 focus:ring-1 focus:ring-purple-500 rounded-xl px-3 py-2 flex-1 outline-none"
              />
              <button type="submit" className="text-zinc-400 hover:text-white p-1"><Search size={14} /></button>
              <button type="button" onClick={() => setIsSearching(false)} className="text-zinc-400 hover:text-white p-1"><X size={14} /></button>
            </form>
          ) : (
            <div className="flex-1 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 size={12} className="text-zinc-600" />
                <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 font-bold">Player de Saudade</span>
              </div>
              <button onClick={() => setIsSearching(true)} className="text-zinc-500 hover:text-white transition-colors p-1">
                <Search size={14} />
              </button>
            </div>
          )}
        </div>

        {/* Track Info */}
        <div className="flex items-center gap-4">
          <div className="relative group">
            <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br from-zinc-800 to-black flex items-center justify-center border border-white/10 transition-transform duration-500 ${isPlaying ? 'rotate-[360deg]' : ''}`}>
              <Music size={20} className={`text-zinc-300 ${isPlaying ? 'animate-pulse text-purple-400' : ''}`} />
            </div>
            {isPlaying && (
               <div className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full animate-ping"></div>
            )}
          </div>
          
          <div className="flex flex-col flex-1 overflow-hidden">
            <span className="text-xs font-semibold text-zinc-100 truncate tracking-wide">
              {searchQuery ? searchQuery : currentTrack.title}
            </span>
            <span className="text-[10px] text-zinc-500 truncate uppercase tracking-widest mt-0.5">
              {searchQuery ? 'YouTube Search' : currentTrack.artist}
            </span>
          </div>

          <div className="flex items-center gap-2">
             <button 
              onClick={togglePlay}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-black hover:bg-zinc-100 transition-all active:scale-90 shadow-lg"
            >
              {isPlaying ? <Pause size={20} fill="black" /> : <Play size={20} className="ml-0.5" fill="black" />}
            </button>
            <button 
              onClick={nextTrack}
              className="text-zinc-400 hover:text-white transition-colors p-1"
            >
              <SkipForward size={22} />
            </button>
          </div>
        </div>
      </div>
      
      {/* 
        Visible but tiny Iframe to avoid browser restrictions on background/hidden media.
        We place it slightly visible but unobtrusive.
      */}
      {activeYoutubeUrl && (
        <div className="fixed bottom-4 left-4 w-1 h-1 opacity-0.01 pointer-events-none overflow-hidden rounded-full">
          <iframe
            ref={iframeRef}
            width="10"
            height="10"
            src={activeYoutubeUrl}
            title="YouTube player"
            frameBorder="0"
            allow="autoplay; encrypted-media"
          ></iframe>
        </div>
      )}
      
      {!isPlaying && !isSearching && (
        <span className="text-[9px] text-center text-zinc-600 uppercase tracking-[0.2em] animate-pulse">
          Toque para dar play no sentimento
        </span>
      )}
    </div>
  );
};

export default MusicPlayer;
