import React from "react";
import { CheckCircle2 } from "lucide-react";

export default function QuestionCard({ question, options, selectedOption, onSelectOption }) {
  const isDarkMode = document.documentElement.classList.contains('dark');

  return (
    <div className="space-y-6">
      <h3 className={`text-xl font-bold tracking-tight ${isDarkMode ? "text-white" : "text-[#2d124d]"}`}>
        {question}
      </h3>
      
      <div className="grid grid-cols-1 gap-3">
        {options.map((opt) => {
          const isSelected = selectedOption === opt;
          return (
            <button
              key={opt}
              onClick={() => onSelectOption(opt)}
              className={`group relative py-4 px-6 rounded-2xl text-left font-bold text-xs tracking-widest uppercase border transition-all duration-300 flex items-center justify-between ${
                isSelected
                  ? (isDarkMode ? "bg-fuchsia-600 border-fuchsia-500 text-white shadow-lg" : "bg-[#2d124d] border-[#2d124d] text-white shadow-xl")
                  : (isDarkMode ? "bg-white/5 border-white/10 text-gray-400 hover:border-fuchsia-500/50" : "bg-white border-slate-200 text-[#2d124d]/60 hover:border-fuchsia-300")
              }`}
            >
              <span className="relative z-10">{opt}</span>
              {isSelected && <CheckCircle2 size={16} className="text-white animate-in zoom-in" />}
              
              {/* Subtle hover glow for non-selected items */}
              {!isSelected && (
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-r from-fuchsia-500/5 to-transparent pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}