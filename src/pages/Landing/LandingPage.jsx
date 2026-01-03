import React, { useEffect, useRef, useState } from 'react'
import HeroSection from './HeroSection'
import FoundationalThesis from './FoundationalThesis'
import HowWeWork from './HowItWorks'
import CallToAction from './CallToAction'

function LandingPage() {
  const [visibleSections, setVisibleSections] = useState([])
  const sectionRefs = useRef([])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            if (!visibleSections.includes(sectionId)) {
              setVisibleSections(prev => [...prev, sectionId])
            }
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    )

    sectionRefs.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => {
      sectionRefs.current.forEach((section) => {
        if (section) observer.unobserve(section)
      })
    }
  }, [visibleSections])

  return (
    <div className="min-h-screen flex flex-col bg-[#0a0514] text-gray-100 font-sans selection:bg-fuchsia-500 selection:text-white">
      <main className="flex-1">
        {/* Hero Section */}
        <div 
          id="hero" 
          ref={el => sectionRefs.current[0] = el}
          className={`${visibleSections.includes('hero') ? 'section-reveal transition-all duration-700 opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
        >
          <HeroSection />
        </div>
        
        {/* Foundational Thesis Section */}
        <div 
          id="thesis" 
          ref={el => sectionRefs.current[1] = el}
          className={`${visibleSections.includes('thesis') ? 'section-reveal transition-all duration-700 opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
        >
          <FoundationalThesis theme="dark" />
        </div>
        
        {/* How We Work Section */}
        <div 
          id="how-it-works" 
          ref={el => sectionRefs.current[2] = el}
          className={`${visibleSections.includes('how-it-works') ? 'section-reveal transition-all duration-700 opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
        >
          <HowWeWork theme="dark" />
        </div>
        
        {/* Call To Action Section */}
        <div 
          id="cta" 
          ref={el => sectionRefs.current[3] = el}
          className={`${visibleSections.includes('cta') ? 'section-reveal transition-all duration-700 opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'}`}
        >
          <CallToAction theme="dark" />
        </div>
      </main>
    </div>
  )
}

export default LandingPage
