import React, { useState, useEffect } from 'react';
import { 
  FaShieldAlt, 
  FaFileContract, 
  FaBalanceScale, 
  FaUserCheck, 
  FaRobot,
  FaHandshake,
  FaChevronRight,
  FaLock,
  FaGlobeAmericas,
  FaArrowRight,
  FaEnvelope  // Added missing icon
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const TermsOfService = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const sections = [
    {
      id: 0,
      title: "General Terms",
      icon: <FaFileContract />,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 1,
      title: "Definitions",
      icon: <FaBalanceScale />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Platform Use",
      icon: <FaUserCheck />,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 3,
      title: "Prohibited Conduct",
      icon: <FaLock />,
      color: "from-red-500 to-orange-500"
    },
    {
      id: 4,
      title: "Intellectual Property",
      icon: <FaShieldAlt />,
      color: "from-indigo-500 to-purple-500"
    },
    {
      id: 5,
      title: "Liability & Disclaimers",
      icon: <FaHandshake />,
      color: "from-yellow-500 to-amber-500"
    },
    {
      id: 6,
      title: "AI & Technology",
      icon: <FaRobot />,
      color: "from-teal-500 to-green-500"
    },
    {
      id: 7,
      title: "Legal Framework",
      icon: <FaGlobeAmericas />,
      color: "from-gray-700 to-gray-900"
    }
  ];

  const sectionContent = [
    {
      id: 0,
      title: "General Information & Acceptance",
      content: [
        {
          type: "paragraph",
          text: "These Terms of Service constitute a binding legal agreement between you and GOPHORA Inc., defining your rights and obligations when using our Human Activation Infrastructure."
        },
        {
          type: "highlight",
          title: "The Service",
          text: "GOPHORA provides a technological platform that connects human talent ('Explorers') with real, outcome-oriented missions in under 24 hours. We're not a traditional employment agency but a system for activating purpose through mission execution."
        },
        {
          type: "warning",
          text: "By registering, accessing, or using our Services, you agree to be bound by these Terms in their entirety. Minimum age requirement: 18 years."
        }
      ]
    },
    {
      id: 1,
      title: "Core Definitions",
      content: [
        {
          type: "definitions",
          items: [
            {
              term: "Explorer",
              definition: "Individuals whose talent is activated via the GOPHORA platform"
            },
            {
              term: "Mission",
              definition: "Real, outcome-oriented tasks assigned through the platform"
            },
            {
              term: "Visnity AI",
              definition: "GOPHORA's proprietary AI for talent identification and mission assignment"
            },
            {
              term: "PHORA",
              definition: "A unit of verifiable reputation earned upon successful mission execution"
            },
            {
              term: "Human Signals",
              definition: "Behavioral data, digital signals, and contextual data analyzed by Visnity AI"
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: "Platform Use & Relationship",
      content: [
        {
          type: "process",
          title: "The Activation Process",
          steps: [
            {
              step: "1",
              title: "Analysis",
              description: "Visnity AI scans for Human Signals to identify talent"
            },
            {
              step: "2",
              title: "Assignment",
              description: "Platform assigns compatible Mission based on detected capabilities"
            },
            {
              step: "3",
              title: "Execution",
              description: "Explorer accepts and completes the Mission with autonomy"
            },
            {
              step: "4",
              title: "Recognition",
              description: "Explorer receives compensation (minus 10% commission) and may earn PHORA"
            },
            {
              step: "5",
              title: "Identity",
              description: "Explorer builds verifiable identity based on missions accomplished"
            }
          ]
        },
        {
          type: "important",
          title: "Nature of Relationship",
          text: "Important: The relationship between an Explorer and GOPHORA is NOT one of employment. Users operate as independent parties engaging in specific, mission-based tasks."
        }
      ]
    },
    {
      id: 3,
      title: "Prohibited Conduct",
      content: [
        {
          type: "list",
          title: "Strictly Forbidden Activities",
          items: [
            "Providing false, inaccurate, or misleading information",
            "Attempting to manipulate or interfere with Platform systems",
            "Engaging in fraudulent activities related to Mission execution",
            "Using the Platform for illegal, unauthorized, or harmful purposes",
            "Infringing upon intellectual property rights",
            "Reverse engineering or decompiling any part of the platform"
          ]
        }
      ]
    },
    {
      id: 4,
      title: "Intellectual Property Rights",
      content: [
        {
          type: "card",
          title: "GOPHORA's IP",
          description: "GOPHORA and its licensors exclusively own all rights to the Platform and Services, including Visnity AI technology, branding, and proprietary systems.",
          icon: <FaShieldAlt />
        },
        {
          type: "card",
          title: "User-Generated Content",
          description: "Ownership of deliverables and content created during Mission execution is defined by the specific mission terms.",
          icon: <FaFileContract />
        }
      ]
    },
    {
      id: 5,
      title: "Liability & Disclaimers",
      content: [
        {
          type: "disclaimer",
          title: "Platform 'As Is'",
          text: "The GOPHORA Platform is provided on an 'as is' and 'as available' basis, without warranty of any kind."
        },
        {
          type: "warning",
          title: "PHORA Disclaimer",
          text: "CRITICAL: PHORA is a reputation token and NOT a financial instrument, security, or speculative asset. GOPHORA provides no guarantee of any financial gain from earning or holding PHORA."
        },
        {
          type: "disclaimer",
          title: "User Interactions",
          text: "GOPHORA is not a party to agreements between users. We disclaim all liability for disputes arising from user interactions."
        }
      ]
    },
    {
      id: 6,
      title: "AI & Automated Decision-Making",
      content: [
        {
          type: "feature",
          title: "Visnity AI",
          description: "Our proprietary artificial intelligence analyzes human signals to assess capabilities and assign compatible missions, replacing traditional evaluation methods."
        },
        {
          type: "rights",
          title: "Your Rights",
          items: [
            "Right to request human intervention in automated decisions",
            "Right to contest AI-based decisions affecting you",
            "Right to explanation of AI decision-making processes",
            "Right to opt-out of certain automated processing where possible"
          ]
        }
      ]
    },
    {
      id: 7,
      title: "Legal Framework",
      content: [
        {
          type: "legal",
          items: [
            {
              title: "Governing Law",
              description: "These Terms are governed by the laws of the State of Florida, USA"
            },
            {
              title: "Jurisdiction",
              description: "Courts of the State of Florida shall have exclusive jurisdiction"
            },
            {
              title: "Dispute Resolution",
              description: "Disputes will be resolved according to our Main Agreement"
            },
            {
              title: "International Compliance",
              description: "We comply with GDPR, CCPA/CPRA, and other applicable data protection laws"
            }
          ]
        }
      ]
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const renderContent = (content, idx) => {
    switch(content.type) {
      case "paragraph":
        return (
          <motion.p 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-gray-300 leading-relaxed text-lg mb-6"
          >
            {content.text}
          </motion.p>
        );
      
      case "highlight":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-r from-purple-900/30 to-pink-900/20 border-l-4 border-purple-500 p-6 rounded-r-xl mb-6"
          >
            <h4 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <FaChevronRight className="text-purple-400" />
              {content.title}
            </h4>
            <p className="text-gray-300">{content.text}</p>
          </motion.div>
        );
      
      case "warning":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-red-900/30 to-orange-900/20 border border-red-500/30 p-6 rounded-xl mb-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
              <span className="font-semibold text-white">Important Notice</span>
            </div>
            <p className="text-gray-300">{content.text}</p>
          </motion.div>
        );
      
      case "definitions":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6"
          >
            {content.items.map((item, itemIdx) => (
              <div 
                key={itemIdx}
                className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5 hover:border-purple-500/50 transition-all duration-300 group"
              >
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold">
                    {item.term.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1 group-hover:text-purple-300 transition-colors">
                      {item.term}
                    </h4>
                    <p className="text-gray-400 text-sm">{item.definition}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        );
      
      case "process":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <h4 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <span className="bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-lg">
                {content.title}
              </span>
            </h4>
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-emerald-500 to-teal-500 hidden md:block"></div>
              
              {content.steps.map((step, stepIdx) => (
                <div key={stepIdx} className="relative mb-8 md:ml-12 group">
                  {/* Step circle */}
                  <div className="absolute left-0 md:left-[-24px] w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg border-4 border-gray-900 z-10">
                    {step.step}
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 ml-0 md:ml-6 hover:border-emerald-500/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="text-xl font-semibold text-white">{step.title}</h5>
                      <FaArrowRight className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      
      case "important":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-amber-900/30 to-yellow-900/20 border border-amber-500/30 p-6 rounded-xl mb-6 transform hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center">
                <FaHandshake className="text-white text-lg" />
              </div>
              <h4 className="text-xl font-bold text-white">{content.title}</h4>
            </div>
            <p className="text-gray-300 text-lg">{content.text}</p>
          </motion.div>
        );
      
      case "list":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <h4 className="text-xl font-semibold text-white mb-4">{content.title}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {content.items.map((item, itemIdx) => (
                <div 
                  key={itemIdx}
                  className="flex items-start gap-3 p-4 bg-gradient-to-r from-red-900/20 to-orange-900/10 rounded-lg border border-red-900/30 hover:border-red-500/50 transition-all duration-300"
                >
                  <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center text-xs text-white mt-1 flex-shrink-0">
                    ✗
                  </div>
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        );
      
      case "card":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-6 hover:border-indigo-500/50 transition-all duration-300"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center">
                {content.icon}
              </div>
              <h4 className="text-xl font-semibold text-white">{content.title}</h4>
            </div>
            <p className="text-gray-400">{content.description}</p>
          </motion.div>
        );
      
      case "disclaimer":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 mb-6"
          >
            <h4 className="text-lg font-semibold text-white mb-2">{content.title}</h4>
            <p className="text-gray-400">{content.text}</p>
          </motion.div>
        );
      
      case "feature":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-br from-teal-900/30 to-green-900/20 border border-teal-500/30 rounded-xl p-6 mb-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-green-500 flex items-center justify-center">
                <FaRobot className="text-white text-lg" />
              </div>
              <h4 className="text-xl font-bold text-white">{content.title}</h4>
            </div>
            <p className="text-gray-300">{content.description}</p>
          </motion.div>
        );
      
      case "rights":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <h4 className="text-xl font-semibold text-white mb-4">{content.title}</h4>
            <div className="space-y-3">
              {content.items.map((item, itemIdx) => (
                <div 
                  key={itemIdx}
                  className="flex items-start gap-3 p-4 bg-gradient-to-r from-blue-900/20 to-cyan-900/10 rounded-lg border border-blue-900/30"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-xs text-white mt-1 flex-shrink-0">
                    ✓
                  </div>
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        );
      
      case "legal":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
          >
            {content.items.map((item, itemIdx) => (
              <div 
                key={itemIdx}
                className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all duration-300"
              >
                <h4 className="text-lg font-semibold text-white mb-2">{item.title}</h4>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white overflow-hidden">
      {/* Animated background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-3/4 left-3/4 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? 'bg-gray-900/90 backdrop-blur-md border-b border-gray-800' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                <FaFileContract className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  GOPHORA
                </h1>
                <p className="text-xs text-gray-400">Legal Terms</p>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Last Updated: <span className="text-purple-400">Dec 24, 2026</span>
            </div>
          </div>
        </div>
      </motion.header>

      <main className="pt-24 pb-20 px-4 sm:px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Terms of Service
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Understanding your rights, responsibilities, and the framework that powers 
              the GOPHORA Human Activation Infrastructure
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="px-4 py-2 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-full border border-purple-500/30 text-sm">
                <span className="text-gray-300">Effective from </span>
                <span className="text-purple-300 font-semibold">December 24, 2026</span>
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-full border border-blue-500/30 text-sm">
                <span className="text-gray-300">Version </span>
                <span className="text-blue-300 font-semibold">2.1.0</span>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-1/4">
              <div className="sticky top-32">
                <div className="bg-gradient-to-b from-gray-900/80 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <FaFileContract className="text-purple-400" />
                    Contents
                  </h3>
                  
                  <div className="space-y-2">
                    {sections.map((section) => (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full text-left p-4 rounded-xl transition-all duration-300 group ${
                          activeSection === section.id
                            ? `bg-gradient-to-r ${section.color} text-white transform scale-[1.02] shadow-lg`
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                            activeSection === section.id 
                              ? 'bg-white/20' 
                              : 'bg-gray-800'
                          }`}>
                            {section.icon}
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{section.title}</div>
                            <div className={`text-xs mt-1 ${
                              activeSection === section.id ? 'text-white/80' : 'text-gray-500'
                            }`}>
                              Section {section.id + 1}
                            </div>
                          </div>
                          <FaChevronRight className={`transition-transform ${
                            activeSection === section.id ? 'rotate-90' : 'group-hover:translate-x-1'
                          }`} />
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Quick Stats */}
                  <div className="mt-8 pt-6 border-t border-gray-700/50">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-gray-900/50 rounded-lg">
                        <div className="text-2xl font-bold text-purple-400">8</div>
                        <div className="text-xs text-gray-400">Sections</div>
                      </div>
                      <div className="text-center p-3 bg-gray-900/50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-400">24</div>
                        <div className="text-xs text-gray-400">Key Points</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:w-3/4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="bg-gradient-to-b from-gray-900/80 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8"
                >
                  {/* Section Header */}
                  <div className="flex items-center gap-4 mb-8 pb-6 border-b border-gray-700/50">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${sections[activeSection].color} flex items-center justify-center text-white text-xl`}>
                      {sections[activeSection].icon}
                    </div>
                    <div>
                      <div className="text-sm text-gray-400 mb-1">
                        Section {activeSection + 1} of {sections.length}
                      </div>
                      <h2 className="text-3xl font-bold text-white">
                        {sectionContent[activeSection]?.title}
                      </h2>
                    </div>
                  </div>

                  {/* Section Content */}
                  <div className="space-y-8">
                    {sectionContent[activeSection]?.content.map((content, idx) => (
                      <React.Fragment key={idx}>
                        {renderContent(content, idx)}
                      </React.Fragment>
                    ))}
                  </div>

                  {/* Navigation Buttons */}
                  <div className="flex justify-between mt-12 pt-8 border-t border-gray-700/50">
                    <button
                      onClick={() => setActiveSection(prev => Math.max(0, prev - 1))}
                      disabled={activeSection === 0}
                      className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all ${
                        activeSection === 0
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-gray-800/50'
                      }`}
                    >
                      <FaChevronRight className="rotate-180" />
                      Previous
                    </button>
                    
                    <div className="flex items-center gap-2">
                      {sections.map((_, idx) => (
                        <button
                          key={idx}
                          onClick={() => setActiveSection(idx)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            idx === activeSection
                              ? `bg-gradient-to-r ${sections[idx].color} w-8`
                              : 'bg-gray-700 hover:bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                    
                    <button
                      onClick={() => setActiveSection(prev => Math.min(sections.length - 1, prev + 1))}
                      disabled={activeSection === sections.length - 1}
                      className={`px-6 py-3 rounded-xl flex items-center gap-2 transition-all ${
                        activeSection === sections.length - 1
                          ? 'opacity-50 cursor-not-allowed'
                          : 'hover:bg-gray-800/50'
                      }`}
                    >
                      Next
                      <FaChevronRight />
                    </button>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Important Notice */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 bg-gradient-to-r from-red-900/30 via-orange-900/20 to-yellow-900/10 border border-red-500/30 rounded-2xl p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500 to-orange-500 flex items-center justify-center text-white text-xl flex-shrink-0">
                    ⚠️
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white mb-3">Important Legal Notice</h3>
                    <p className="text-gray-300 mb-4">
                      These Terms constitute a legally binding agreement. By using GOPHORA, you acknowledge that:
                    </p>
                    <ul className="space-y-2 text-gray-400">
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 text-xs mt-1">•</div>
                        <span>PHORA is NOT a financial instrument or cryptocurrency</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 text-xs mt-1">•</div>
                        <span>No employment relationship is created through platform use</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center text-red-400 text-xs mt-1">•</div>
                        <span>Automated decision-making by Visnity AI is integral to our service</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 bg-gray-900/80 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                GOPHORA
              </div>
              <p className="text-sm text-gray-400">
                Human Activation Infrastructure • Connecting Talent with Purpose
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-3">
                For questions about these Terms of Service:
              </p>
              <a 
                href="mailto:contact@gophora.com" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:opacity-90 transition-opacity"
              >
                <FaEnvelope />
                contact@gophora.com
              </a>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2026 GOPHORA Inc. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Florida, USA • Version 2.1.0
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default TermsOfService;