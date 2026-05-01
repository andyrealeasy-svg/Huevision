import { Play, Pause, SkipBack, SkipForward, Repeat, Volume2, VolumeX, ListMusic } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { cn } from '../lib/utils';

interface Track {
  id: string;
  artist: string;
  title: string;
  year: string;
  audioSrc: string;
  coverSrc: string;
}

const TRACKS: Track[] = [
  {
    id: 'track-1',
    artist: 'SiCka',
    title: 'Let Me',
    year: '2025',
    audioSrc: 'https://qnozyhiylwmhcmkrvsul.supabase.co/storage/v1/object/sign/Huevision%20mp3/huevision2025.mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NTJjZjAzNy1jZjIzLTRlNDctYTdkYy04MWVhM2EwZWRhZWEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJIdWV2aXNpb24gbXAzL2h1ZXZpc2lvbjIwMjUubXAzIiwiaWF0IjoxNzc3MzcwNjU4LCJleHAiOjIwOTI3MzA2NTh9.e9chH9CoDB4LZgkWnAH_ssm88hBeCXxItvBkEifvE2U',
    coverSrc: 'https://i.postimg.cc/brkbcBDW/IMG-20260428-110522-876.jpg'
  },
  {
    id: 'track-2',
    artist: 'NIK$A',
    title: 'Business',
    year: '2025',
    audioSrc: 'https://qnozyhiylwmhcmkrvsul.supabase.co/storage/v1/object/sign/Huevision%20mp3/huevision2025%20(1).mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NTJjZjAzNy1jZjIzLTRlNDctYTdkYy04MWVhM2EwZWRhZWEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJIdWV2aXNpb24gbXAzL2h1ZXZpc2lvbjIwMjUgKDEpLm1wMyIsImlhdCI6MTc3NzYzMjE1NSwiZXhwIjoyMDkyOTkyMTU1fQ.FPlhF3rQp6qL8wlCgQdZzcwLgVMv4J82qpQi8SW8EEo',
    coverSrc: 'https://i.postimg.cc/brkbcBDW/IMG-20260428-110522-876.jpg'
  },
  {
    id: 'track-3',
    artist: 'Ksivat',
    title: '5 Minutes',
    year: '2025',
    audioSrc: 'https://qnozyhiylwmhcmkrvsul.supabase.co/storage/v1/object/sign/Huevision%20mp3/huevision2025%20(2).mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NTJjZjAzNy1jZjIzLTRlNDctYTdkYy04MWVhM2EwZWRhZWEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJIdWV2aXNpb24gbXAzL2h1ZXZpc2lvbjIwMjUgKDIpLm1wMyIsImlhdCI6MTc3NzYzMjQ1MywiZXhwIjoyMDkyOTkyNDUzfQ.LX7_32wEa3wQQbTsGjCxkRuuoiie7x7bbcjXIZn-Vr0',
    coverSrc: 'https://i.postimg.cc/brkbcBDW/IMG-20260428-110522-876.jpg'
  },
  {
    id: 'track-4',
    artist: 'Dollova',
    title: 'Tore You Too',
    year: '2025',
    audioSrc: 'https://qnozyhiylwmhcmkrvsul.supabase.co/storage/v1/object/sign/Huevision%20mp3/huevision2025%20(3).mp3?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV84NTJjZjAzNy1jZjIzLTRlNDctYTdkYy04MWVhM2EwZWRhZWEiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJIdWV2aXNpb24gbXAzL2h1ZXZpc2lvbjIwMjUgKDMpLm1wMyIsImlhdCI6MTc3NzYzMjY0NiwiZXhwIjoyMDkyOTkyNjQ2fQ.MxR7i_75vLbv5B1FcJvqJrJdNOOwJ01eTGD34zTVw60',
    coverSrc: 'https://i.postimg.cc/brkbcBDW/IMG-20260428-110522-876.jpg'
  }
];

export function AudioCenter() {
  const [filterYear, setFilterYear] = useState<string>('ALL');
  
  const availableYears = Array.from(new Set(TRACKS.map(t => t.year))).sort((a,b) => Number(b) - Number(a));
  const filteredTracks = filterYear === 'ALL' 
    ? TRACKS 
    : TRACKS.filter(t => t.year === filterYear);

  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const currentTrack = filteredTracks[currentTrackIndex] || filteredTracks[0] || TRACKS[0];

  useEffect(() => {
    setCurrentTrackIndex(0);
  }, [filterYear]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isRepeat, setIsRepeat] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showPlaylist, setShowPlaylist] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Play/pause toggle
  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Audio playback error:", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  // Play a specific track
  const playTrack = (index: number) => {
    setCurrentTrackIndex(index);
    setIsPlaying(true);
  };

  // Effect to handle track change
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.load(); // necessary to load the new src
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Audio playback error:", e));
      }
    }
  }, [currentTrack?.id]);

  const handleNextTrack = () => {
    if (currentTrackIndex < filteredTracks.length - 1) {
      setCurrentTrackIndex(prev => prev + 1);
    } else if (isRepeat) {
      setCurrentTrackIndex(0);
    } else {
      setIsPlaying(false);
    }
  };

  const handlePrevTrack = () => {
    if (audioRef.current && audioRef.current.currentTime > 3) {
      // If played more than 3 seconds, just restart the current track
      audioRef.current.currentTime = 0;
    } else if (currentTrackIndex > 0) {
      setCurrentTrackIndex(prev => prev - 1);
    } else {
      audioRef.current!.currentTime = 0;
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100 || 0);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    handleNextTrack();
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (audioRef.current && duration) {
      const rect = e.currentTarget.getBoundingClientRect();
      const pos = (e.clientX - rect.left) / rect.width;
      audioRef.current.currentTime = pos * duration;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '00:00';
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <section className="px-4 max-w-4xl mx-auto w-full pt-12">
      <audio 
        ref={audioRef}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
      >
        <source src={currentTrack.audioSrc} type="audio/mpeg" />
      </audio>
      
      <div className="mb-12">
        <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter uppercase text-white">
          <span className="text-red-500">МЕДИАЦЕНТР</span>
        </h2>
        <p className="text-white/40 font-mono text-sm mt-2">ЗАЩИЩЕННЫЙ МЕДИАКАНАЛ</p>
      </div>

      <div className="glass-panel border-red-500/20 box-glow overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-900 via-red-500 to-red-900"></div>
        
        <div className="p-8 flex flex-col md:flex-row gap-8 items-center">
          {/* Cover */}
          <div className="w-48 h-48 md:w-64 md:h-64 shrink-0 bg-black border border-white/10 relative flex items-center justify-center overflow-hidden group">
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out" 
              style={{ 
                backgroundImage: `url(${currentTrack.coverSrc})`,
                transform: isPlaying ? 'scale(1.05)' : 'scale(1)'
              }}
            />
            <div className="absolute inset-0 bg-black/40 mix-blend-overlay group-hover:bg-black/20 transition-colors"></div>
            
            {!isPlaying && (
              <div className="w-16 h-16 rounded-full border border-red-500/50 flex items-center justify-center bg-black/50 backdrop-blur-sm shadow-[0_0_15px_rgba(255,0,0,0.5)] z-10 opacity-70 group-hover:opacity-100 transition-opacity">
                <Play size={24} className="ml-1 text-red-500" fill="currentColor" />
              </div>
            )}
            
            {isPlaying && (
               <div className="absolute inset-0 flex items-center justify-center gap-1 bg-black/40 xl:bg-black/20 backdrop-blur-sm group-hover:backdrop-blur-none transition-all duration-300">
                  {[...Array(5)].map((_, i) => (
                    <div 
                      key={i} 
                      className="w-1.5 bg-red-500 rounded-full shadow-[0_0_10px_rgba(255,0,0,0.8)]"
                      style={{ 
                        height: '20px',
                        animation: `eq-bounce 0.8s infinite ease-in-out alternate`,
                        animationDelay: `${i * 0.15}s`
                      }}
                    ></div>
                  ))}
                  <style>{`
                    @keyframes eq-bounce {
                      0% { height: 10px; }
                      100% { height: 40px; }
                    }
                  `}</style>
               </div>
            )}
          </div>

          <div className="flex-1 w-full flex flex-col justify-center">
            {/* Track Info */}
            <div className="space-y-2 mb-8">
              <div className="flex items-center justify-between">
                <div className="inline-block px-2 py-1 text-[10px] font-mono tracking-widest text-red-500 border border-red-500/30 bg-red-500/10 mb-2">
                  {currentTrack.year} // ENTRY
                </div>
                <button 
                  onClick={() => setShowPlaylist(!showPlaylist)}
                  className={`text-white/40 hover:text-white transition-colors ${showPlaylist ? 'text-red-500' : ''}`}
                >
                  <ListMusic size={20} />
                </button>
              </div>
              <h3 className="text-3xl md:text-4xl font-display font-bold text-white tracking-tight text-glow">
                {currentTrack.title}
              </h3>
              <p className="text-lg text-white/60 font-mono tracking-widest">
                {currentTrack.artist}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <div 
                className="w-full h-2 bg-white/10 rounded-full overflow-hidden relative cursor-pointer group"
                onClick={handleProgressClick}
              >
                <div 
                  className="absolute top-0 left-0 h-full bg-red-500 transition-all duration-100 ease-linear shadow-[0_0_10px_rgba(255,0,0,0.8)]" 
                  style={{ width: `${progress}%` }}
                ></div>
                <div className="absolute top-0 left-0 w-full h-full bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="flex justify-between text-[10px] text-white/40 font-mono mt-2">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <button 
                  onClick={handlePrevTrack}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <SkipBack size={24} />
                </button>
                <button 
                  onClick={togglePlay}
                  className="w-16 h-16 rounded-full bg-white text-black flex items-center justify-center hover:bg-red-500 hover:text-white hover:shadow-[0_0_20px_rgba(255,0,0,0.6)] transition-all transform hover:scale-105"
                >
                  {isPlaying ? <Pause size={28} fill="currentColor" /> : <Play size={28} fill="currentColor" className="ml-1" />}
                </button>
                <button 
                  onClick={handleNextTrack}
                  className="text-white/40 hover:text-white transition-colors"
                >
                  <SkipForward size={24} />
                </button>
              </div>

              <div className="flex items-center gap-6">
                <button 
                  onClick={() => setIsRepeat(!isRepeat)}
                  className={`transition-colors ${isRepeat ? 'text-red-500 shadow-[0_0_10px_rgba(255,0,0,0.3)]' : 'text-white/40 hover:text-white'}`}
                  title="Повтор"
                >
                  <Repeat size={20} />
                </button>
                <button 
                  onClick={toggleMute}
                  className={`transition-colors hidden sm:block ${isMuted ? 'text-red-500' : 'text-white/40 hover:text-white'}`}
                  title={isMuted ? 'Включить звук' : 'Выключить звук'}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Playlist */}
        <div className={cn(
          "overflow-hidden transition-all duration-300 ease-in-out border-t border-white/5",
          showPlaylist ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        )}>
          <div className="p-4 md:p-8 flex flex-col gap-4 max-h-[500px] overflow-y-auto hide-scrollbar">
            
            {/* Filters */}
            <div className="flex flex-wrap gap-2 pb-2 border-b border-white/10 shrink-0">
              <button
                onClick={() => setFilterYear('ALL')}
                className={cn(
                  "px-4 py-1.5 text-xs font-mono transition-colors",
                  filterYear === 'ALL' 
                    ? "bg-red-500 text-white shadow-[0_0_10px_rgba(255,0,0,0.4)]" 
                    : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/10"
                )}
              >
                ВСЕ
              </button>
              {availableYears.map(year => (
                <button
                  key={year}
                  onClick={() => setFilterYear(year)}
                  className={cn(
                    "px-4 py-1.5 text-xs font-mono transition-colors",
                    filterYear === year 
                      ? "bg-red-500 text-white shadow-[0_0_10px_rgba(255,0,0,0.4)]" 
                      : "bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/10"
                  )}
                >
                  {year}
                </button>
              ))}
            </div>

            <div className="flex flex-col gap-2">
              {filteredTracks.length === 0 && (
                 <div className="text-center text-white/50 py-8 font-mono text-sm">
                   НЕТ ТРЕКОВ ДЛЯ ВЫБРАННОГО ГОДА
                 </div>
              )}
              {filteredTracks.map((track, idx) => (
              <button
                key={track.id}
                onClick={() => playTrack(idx)}
                className={cn(
                  "flex items-center gap-4 w-full p-3 rounded text-left transition-colors",
                  idx === currentTrackIndex 
                    ? "bg-red-500/10 border border-red-500/20 text-white" 
                    : "hover:bg-white/5 text-white/60 hover:text-white"
                )}
              >
                <div className="w-10 h-10 shrink-0 bg-white/5 relative overflow-hidden rounded">
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-70"
                    style={{ backgroundImage: `url(${track.coverSrc})` }}
                  />
                  {idx === currentTrackIndex && isPlaying && (
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                      <Play size={16} className="text-red-500" fill="currentColor" />
                    </div>
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className={cn("font-medium truncate", idx === currentTrackIndex && "text-red-400 font-display")}>
                    {track.title}
                  </div>
                  <div className="text-xs truncate font-mono mt-0.5 opacity-60">
                    {track.artist}
                  </div>
                </div>
              </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
