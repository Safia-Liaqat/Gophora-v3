import React, { useEffect, useRef, useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

const audioScripts = {
  1: { src: "/audios/chapter1.mp3", text: "Hello, explorer. Your purpose is waiting." },
  2: { src: "/audios/chapter2.mp3", text: "Time is your greatest ally. Ignite your spark." },
  // ... other chapters
};

export default function ChapterAudio({ chapterId }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const isDarkMode = document.documentElement.classList.contains('dark');

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  }, [chapterId]);

  const togglePlay = () => {
    if (!audioRef.current) return;
    isPlaying ? audioRef.current.pause() : audioRef.current.play();
    setIsPlaying(!isPlaying);
  };

  const script = audioScripts[chapterId];
  if (!script) return null;

  return (
    <div className={`p-5 rounded-[2rem] border transition-all duration-500 flex flex-col md:flex-row md:items-center gap-5 ${
      isDarkMode ? "bg-white/5 border-white/10 shadow-2xl" : "bg-white border-fuchsia-100 shadow-xl"
    }`}>
      <audio ref={audioRef} src={script.src} onEnded={() => setIsPlaying(false)} />
      
      <button
        onClick={togglePlay}
        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all active:scale-90 shadow-lg ${
          isDarkMode ? "bg-fuchsia-600 text-white" : "bg-[#2d124d] text-white"
        }`}
      >
        {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} fill="currentColor" className="ml-1" />}
      </button>

      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1 opacity-50 uppercase tracking-[0.2em] text-[9px] font-bold">
          <Volume2 size={12} /> Chapter Transmission
        </div>
        <p className={`italic font-serif text-sm ${isDarkMode ? "text-gray-300" : "text-[#2d124d]"}`}>
          "{script.text}"
        </p>
      </div>
    </div>
  );
}