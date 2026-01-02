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
    <div className="min-h-screen flex flex-col bg-background-primary text-text-primary">
      <main className="flex-1">
        <div 
          id="hero" 
          ref={el => sectionRefs.current[0] = el}
          className={visibleSections.includes('hero') ? 'section-reveal' : 'opacity-0'}
        >
          <HeroSection />
        </div>
        
        <div 
          id="thesis" 
          ref={el => sectionRefs.current[1] = el}
          className={visibleSections.includes('thesis') ? 'section-reveal' : 'opacity-0'}
        >
          <FoundationalThesis />
        </div>
        
        <div 
          id="how-it-works" 
          ref={el => sectionRefs.current[2] = el}
          className={visibleSections.includes('how-it-works') ? 'section-reveal' : 'opacity-0'}
        >
          <HowWeWork />
        </div>
        
        <div 
          id="cta" 
          ref={el => sectionRefs.current[3] = el}
          className={visibleSections.includes('cta') ? 'section-reveal' : 'opacity-0'}
        >
          <CallToAction />
        </div>
      </main>
    
    
    </div>
  )
}

export default LandingPage