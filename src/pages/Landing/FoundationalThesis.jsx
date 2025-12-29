import React from "react";

export default function FoundationalThesis() {
  return (
    <section className="relative bg-[#0A0F2C] text-white py-16 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            THE FOUNDATIONAL THESIS
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] mx-auto"></div>
        </div>

        {/* Main Thesis */}
        <div className="mb-10">
          <p className="text-lg sm:text-xl text-center italic text-gray-300 mb-6">
            "For years, they made us believe that some are born to lead and others to obey. 
            But we discovered something different:"
          </p>
          <h3 className="text-xl sm:text-2xl font-bold text-center text-[#A78BFA] mb-6">
            Nobody is ordinary when they are given a mission.
          </h3>
        </div>

        {/* Key Insight */}
        <div className="bg-gradient-to-r from-[#1E1B4B]/40 to-[#2E1B4B]/40 border-l-4 border-[#A78BFA] p-5 rounded-r-lg mb-8">
          <p className="text-base sm:text-lg">
            <span className="font-bold text-[#A78BFA]">The biggest wasted resource on the planet</span> 
            {" is not money or technology, but human talent."}
            <br />
            <span className="font-bold text-[#A78BFA]">Human talent is not broken; it is inactive/disconnected.</span>
          </p>
        </div>

        {/* GOPHORA's Purpose */}
        <div className="text-center mb-10">
          <h4 className="text-xl sm:text-2xl font-bold mb-5">
            <span className="text-[#A78BFA]">GOPHORA</span> was not born to create jobs.
            <br className="hidden sm:block" />
            It was born to awaken explorers.
          </h4>
        </div>

        {/* Nobody is Ordinary When... */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            "They are given a clear mission.",
            "Their time is valued.",
            "They can activate their talent in 24 hours.",
            "They stop surviving and start exploring."
          ].map((item, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-[#1E1B4B]/30 to-[#2E1B4B]/30 border border-[#2D1B69] rounded-xl p-4 sm:p-5 hover:border-[#A78BFA]/50 transition-all duration-300"
            >
              <div className="flex items-start">
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] flex items-center justify-center mr-3 sm:mr-4 mt-0.5 flex-shrink-0">
                  <span className="text-white font-bold text-sm sm:text-base">{index + 1}</span>
                </div>
                <p className="text-base sm:text-lg font-medium leading-relaxed">{item}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}