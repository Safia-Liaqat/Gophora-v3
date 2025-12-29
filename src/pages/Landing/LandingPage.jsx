import React from 'react'
import Footer from '../../components/common/Footer/Footer'
import HeroSection from './HeroSection'
import FoundationalThesis from './FoundationalThesis'
import HowWeWork from './HowItWorks'
import CallToAction from './CallToAction'

function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <HeroSection />
        <FoundationalThesis />
        <HowWeWork />
        <CallToAction />
      </main>
      <Footer />
    </div>
  )
}

export default LandingPage