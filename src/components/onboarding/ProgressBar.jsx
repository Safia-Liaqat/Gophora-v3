import React from "react";

export default function ProgressBar({ currentStep, totalSteps }) {
  const progressPercent = (currentStep / totalSteps) * 100;
  const isDarkMode = document.documentElement.classList.contains('dark');

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-bold tracking-widest opacity-50 uppercase">
        <span>Progress</span>
        <span>{Math.round(progressPercent)}%</span>
      </div>
      <div className={`w-full h-1.5 rounded-full overflow-hidden ${isDarkMode ? "bg-white/10" : "bg-slate-200"}`}>
        <div
          className="h-full bg-gradient-to-r from-fuchsia-500 to-indigo-500 transition-all duration-700 ease-out rounded-full"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
    </div>
  );
}