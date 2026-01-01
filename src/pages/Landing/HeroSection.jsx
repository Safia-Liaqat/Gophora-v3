import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  RocketLaunchIcon, 
  ArrowRightIcon, 
  SparklesIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from "@heroicons/react/20/solid";

export default function HeroSection() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const stats = [
    { value: "500+", label: "Active Missions" },
    { value: "24h", label: "Activation Time" },
    { value: "95%", label: "Success Rate" },
    { value: "∞", label: "Potential" }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % 4);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + 4) % 4);
  };

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black hero-gradient">
      {/* Clean Background */}
      <div className="absolute inset-0 bg-black">
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-transparent to-purple-900/5"></div>
        
        {/* Stars */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-[1px] h-[1px] bg-white rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: 0.3 + Math.random() * 0.7,
              boxShadow: `0 0 ${1 + Math.random() * 2}px rgba(255,255,255,0.8)`
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Main Content */}
          <div className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}>
            <div className="inline-block px-3 py-1.5 bg-gray-900/50 backdrop-blur-sm border border-purple-500/10 rounded-lg mb-4">
              <span className="text-xs sm:text-sm text-gray-300 flex items-center gap-1.5">
                <SparklesIcon className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400" />
                Welcome to the future of work
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              <span className="block text-white">Nobody is</span>
              <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mt-1">
                Ordinary Here
              </span>
            </h1>
            
            <p className="text-base sm:text-lg text-gray-300 max-w-lg mb-3 italic">
              "Exploration doesn't start in space. It starts in people."
            </p>
            
            <p className="text-sm sm:text-base text-gray-400 max-w-lg mb-6">
              Activate your talent. Accept real missions. Connect in less than 24 hours.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 max-w-md">
              <button
                onClick={() => navigate("/register")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-3 rounded-lg font-medium hover:from-purple-700 hover:to-pink-700 transition-all duration-300 group"
              >
                <span className="flex items-center justify-center gap-2">
                  <RocketLaunchIcon className="h-4 w-4" />
                  Launch Your Mission
                  <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </button>

              <button
                onClick={() => navigate("/login")}
                className="bg-gray-800 text-white px-6 py-3 rounded-lg font-medium border border-gray-700 hover:bg-gray-700 hover:border-gray-600 transition-all duration-300"
              >
                Already an Explorer?
              </button>
            </div>
          </div>

          {/* Right Column - Animated Stats Slider */}
          <div className="hidden lg:flex flex-col items-center justify-center">
            <div className="relative w-full max-w-md h-64">
              {/* Stats Slider Container */}
              <div className="relative w-full h-full overflow-hidden rounded-2xl border border-purple-500/10 bg-gray-900/50 backdrop-blur-sm">
                {/* Animated background effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-purple-400/5 to-transparent animate-pulse"></div>
                
                {/* Slides */}
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`absolute inset-0 flex flex-col items-center justify-center p-8 transition-all duration-700 ease-in-out ${
                      currentSlide === index 
                        ? 'opacity-100 translate-x-0' 
                        : 'opacity-0 translate-x-full'
                    }`}
                  >
                    {/* Value with animation */}
                    <div className={`text-7xl font-bold mb-4 transition-all duration-500 ${
                      currentSlide === index
                        ? 'bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent scale-110'
                        : 'text-white'
                    }`}>
                      {stat.value}
                    </div>
                    
                    {/* Label */}
                    <div className="text-xl text-gray-300 font-medium">
                      {stat.label}
                    </div>
                    
                    {/* Description */}
                    <div className="text-sm text-gray-400 mt-4 text-center max-w-xs">
                      {index === 0 && "Real-time projects waiting for talent"}
                      {index === 1 && "Average time to start working"}
                      {index === 2 && "Mission completion satisfaction"}
                      {index === 3 && "Unlimited growth opportunities"}
                    </div>
                  </div>
                ))}
                
                {/* Navigation Dots */}
                <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {stats.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        currentSlide === index 
                          ? 'bg-gradient-to-r from-purple-400 to-pink-400 w-8' 
                          : 'bg-gray-700 hover:bg-gray-600'
                      }`}
                    />
                  ))}
                </div>
              </div>
              
              {/* Navigation Arrows */}
              <button
                onClick={prevSlide}
                className="absolute -left-4 top-1/2 -translate-y-1/2 bg-gray-900 border border-purple-500/10 rounded-full p-2 hover:bg-purple-400/10 hover:border-purple-400 transition-all duration-300"
              >
                <ChevronLeftIcon className="h-5 w-5 text-white" />
              </button>
              
              <button
                onClick={nextSlide}
                className="absolute -right-4 top-1/2 -translate-y-1/2 bg-gray-900 border border-purple-500/10 rounded-full p-2 hover:bg-purple-400/10 hover:border-purple-400 transition-all duration-300"
              >
                <ChevronRightIcon className="h-5 w-5 text-white" />
              </button>
            </div>

            {/* Static stats grid for mobile */}
            <div className="lg:hidden mt-8">
              <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
                {stats.map((stat, index) => (
                  <div 
                    key={index} 
                    className="bg-gray-900/50 backdrop-blur-sm border border-purple-500/10 rounded-xl p-4 hover:border-purple-400/30 transition-all duration-300"
                  >
                    <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
                    <div className="text-xs text-gray-300">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Stats Display */}
      <div className="lg:hidden absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full px-4">
        <div className="flex justify-center gap-2">
          {stats.map((_, index) => (
            <div 
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentSlide === index 
                  ? 'bg-gradient-to-r from-purple-400 to-pink-400' 
                  : 'bg-gray-700'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}