import React, { useState, useEffect } from 'react';
import { 
  FaGavel, 
  FaShieldAlt, 
  FaDatabase, 
  FaGlobeAmericas,
  FaBalanceScale,
  FaFileContract,
  FaExclamationTriangle,
  FaHandshake,
  FaRobot,
  FaChevronRight,
  FaEnvelope,
  FaLock,
  FaUserShield,
  FaBullhorn,
  FaFileAlt,
  FaArrowRight,
  FaCookie
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const LegalNotices = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const sections = [
    {
      id: 0,
      title: "GDPHORA DPA",
      icon: <FaGavel />,
      color: "from-purple-500 to-indigo-500",
      subtitle: "Data Processing Addendum"
    },
    {
      id: 1,
      title: "Data Processing",
      icon: <FaDatabase />,
      color: "from-blue-500 to-cyan-500",
      subtitle: "Agreement Details"
    },
    {
      id: 2,
      title: "Data Categories",
      icon: <FaFileContract />,
      color: "from-emerald-500 to-green-500",
      subtitle: "Types of Data"
    },
    {
      id: 3,
      title: "Governing Law",
      icon: <FaBalanceScale />,
      color: "from-amber-500 to-yellow-500",
      subtitle: "Legal Framework"
    },
    {
      id: 4,
      title: "Disclaimers",
      icon: <FaExclamationTriangle />,
      color: "from-red-500 to-orange-500",
      subtitle: "Important Notices"
    },
    {
      id: 5,
      title: "Special Data",
      icon: <FaLock />,
      color: "from-gray-600 to-gray-800",
      subtitle: "Protected Categories"
    },
    {
      id: 6,
      title: "Breach Protocol",
      icon: <FaBullhorn />,
      color: "from-rose-500 to-pink-500",
      subtitle: "Notification Procedures"
    },
    {
      id: 7,
      title: "Your Rights",
      icon: <FaUserShield />,
      color: "from-teal-500 to-cyan-500",
      subtitle: "Data Subject Rights"
    }
  ];

  const sectionContent = [
    {
      id: 0,
      title: "GDPHORA – Data Processing Addendum",
      content: [
        {
          type: "hero",
          title: "Integrated Data Protection",
          description: "This Addendum forms an integral part of the main services agreement and ensures GDPR compliance.",
          icon: <FaShieldAlt />
        },
        {
          type: "definition",
          title: "Purpose & Scope",
          description: "Ensures processing of Personal Data by GOPHORA complies with GDPR (EU) 2016/679 and other applicable data protection laws."
        },
        {
          type: "cards",
          items: [
            {
              title: "Data Controller",
              description: "The Company using GOPHORA services",
              icon: <FaFileContract />,
              color: "from-purple-600 to-indigo-600"
            },
            {
              title: "Data Processor",
              description: "GOPHORA Inc.",
              icon: <FaDatabase />,
              color: "from-blue-600 to-cyan-600"
            },
            {
              title: "Visnity AI",
              description: "Proprietary technology for mission assignment",
              icon: <FaRobot />,
              color: "from-emerald-600 to-green-600"
            },
            {
              title: "PHORA System",
              description: "Non-financial record of missions",
              icon: <FaHandshake />,
              color: "from-amber-600 to-yellow-600"
            }
          ]
        }
      ]
    },
    {
      id: 1,
      title: "Data Processing Agreement",
      content: [
        {
          type: "hero",
          title: "Article 28(3) GDPR Compliance",
          description: "Satisfies requirements for data processing agreements under European regulations.",
          icon: <FaGavel />
        },
        {
          type: "grid",
          items: [
            {
              title: "Processing Instructions",
              description: "GOPHORA processes data only per Client's documented instructions",
              icon: "📋"
            },
            {
              title: "Security Measures",
              description: "Appropriate technical and organizational measures implemented",
              icon: "🔒"
            },
            {
              title: "Sub-processors",
              description: "Client authorizes use with notification rights",
              icon: "🔄"
            },
            {
              title: "International Transfers",
              description: "SCCs or adequacy decisions for EEA transfers",
              icon: "🌍"
            }
          ]
        },
        {
          type: "highlight",
          title: "Automated Processing",
          text: "Visnity AI performs automated analysis and mission assignment, which may constitute automated individual decision-making under Article 22 of GDPR."
        }
      ]
    },
    {
      id: 2,
      title: "Data Categories & Types",
      content: [
        {
          type: "process",
          title: "Data Processing Flow",
          steps: [
            {
              step: "1",
              title: "Human Signals Collection",
              description: "Behavioral, digital, and contextual data analysis"
            },
            {
              step: "2",
              title: "Mission Processing",
              description: "Assignment and execution records management"
            },
            {
              step: "3",
              title: "Identity Generation",
              description: "Creating verifiable explorer identity"
            },
            {
              step: "4",
              title: "PHORA Ledger",
              description: "Immutable record of mission accomplishment"
            }
          ]
        },
        {
          type: "category",
          title: "Types of Personal Data",
          categories: [
            {
              name: "Human Signals Data",
              items: ["Behavioral Data", "Digital Signals", "Contextual Data"],
              color: "from-blue-500 to-cyan-500"
            },
            {
              name: "Mission Data",
              items: ["Assignment Records", "Execution Data", "Completion Metrics"],
              color: "from-purple-500 to-pink-500"
            },
            {
              name: "Identity Data",
              items: ["Generated Identity", "Mission History", "PHORA Records"],
              color: "from-emerald-500 to-teal-500"
            }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Governing Law & Jurisdiction",
      content: [
        {
          type: "hero",
          title: "Legal Framework",
          description: "Defining the legal boundaries and compliance requirements",
          icon: <FaGlobeAmericas />
        },
        {
          type: "legal",
          items: [
            {
              title: "Governing Law",
              description: "Laws of the State of Florida, USA",
              icon: "⚖️",
              color: "from-purple-600 to-indigo-600"
            },
            {
              title: "Jurisdiction",
              description: "Courts of the State of Florida, USA",
              icon: "🏛️",
              color: "from-blue-600 to-cyan-600"
            },
            {
              title: "GDPR Compliance",
              description: "General Data Protection Regulation (EU) 2016/679",
              icon: "🇪🇺",
              color: "from-emerald-600 to-green-600"
            },
            {
              title: "CCPA/CPRA",
              description: "California Consumer Privacy Act Regulations",
              icon: "🇺🇸",
              color: "from-amber-600 to-yellow-600"
            }
          ]
        },
        {
          type: "warning",
          text: "International data transfers comply with Standard Contractual Clauses (SCCs) or adequacy decisions where applicable."
        }
      ]
    },
    {
      id: 4,
      title: "Important Disclaimers",
      content: [
        {
          type: "critical",
          title: "PHORA TOKEN DISCLAIMER",
          text: "CRITICAL: PHORA is a reputation token and NOT a financial instrument, security, or speculative asset.",
          icon: "⚠️"
        },
        {
          type: "list",
          title: "PHORA is NOT:",
          items: [
            "A financial instrument or security",
            "A speculative asset",
            "A cryptocurrency for open market trading",
            "A guarantee of financial value or return"
          ]
        },
        {
          type: "disclaimer",
          title: "Relationship Status",
          description: "Users are independent parties engaging in mission-based tasks. No employer-employee, partnership, or joint venture relationship is created."
        },
        {
          type: "feature",
          title: "AI Decision-Making",
          description: "Visnity AI performs automated analysis and mission assignment. You have the right to request human intervention and contest decisions."
        }
      ]
    },
    {
      id: 5,
      title: "Special Categories of Data",
      content: [
        {
          type: "confirmation",
          title: "GDPR Article 9 Compliance",
          description: "GOPHORA does NOT process special categories of personal data as defined in Article 9 of GDPR.",
          icon: "✅"
        },
        {
          type: "excluded",
          title: "Excluded Data Types",
          items: [
            {
              category: "Biometric & Genetic",
              description: "Data for unique identification"
            },
            {
              category: "Health Data",
              description: "Physical or mental health information"
            },
            {
              category: "Political & Religious",
              description: "Beliefs and opinions data"
            },
            {
              category: "Sexual Orientation",
              description: "Personal life information"
            }
          ]
        },
        {
          type: "notice",
          title: "Compliance Assurance",
          text: "Our systems are designed to filter and exclude special category data from processing pipelines."
        }
      ]
    },
    {
      id: 6,
      title: "Breach Notification Procedures",
      content: [
        {
          type: "process",
          title: "Incident Response Protocol",
          steps: [
            {
              step: "1",
              title: "Immediate Detection",
              description: "24/7 monitoring systems detect anomalies"
            },
            {
              step: "2",
              title: "Rapid Assessment",
              description: "Impact analysis and categorization"
            },
            {
              step: "3",
              title: "Client Notification",
              description: "Without undue delay per GDPR requirements"
            },
            {
              step: "4",
              title: "Remediation Actions",
              description: "Immediate measures to address breach"
            }
          ]
        },
        {
          type: "requirements",
          title: "Notification Contents",
          items: [
            "Nature of the personal data breach",
            "Categories and approximate number of data subjects affected",
            "Categories and approximate number of personal data records concerned",
            "Name and contact details of data protection officer",
            "Likely consequences of the personal data breach",
            "Measures taken or proposed to address the breach"
          ]
        }
      ]
    },
    {
      id: 7,
      title: "Data Subject Rights",
      content: [
        {
          type: "rights",
          title: "Your GDPR Rights",
          items: [
            {
              right: "Right to Access",
              description: "Obtain confirmation of data processing"
            },
            {
              right: "Right to Rectification",
              description: "Correct inaccurate personal data"
            },
            {
              right: "Right to Erasure",
              description: "Request deletion under certain conditions"
            },
            {
              right: "Right to Restriction",
              description: "Limit processing of your data"
            },
            {
              right: "Right to Object",
              description: "Object to processing based on legitimate interests"
            },
            {
              right: "Right to Portability",
              description: "Receive your data in structured format"
            }
          ]
        },
        {
          type: "contact",
          title: "Exercise Your Rights",
          description: "Contact our Data Protection Officer to exercise any of your data subject rights.",
          email: "dpo@gophora.com",
          response: "We respond to all requests within 30 days as required by GDPR."
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
      case "hero":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-900/30 to-indigo-900/20 border-l-4 border-purple-500 p-8 rounded-r-2xl mb-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xl">
                {content.icon}
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white">{content.title}</h4>
                <p className="text-gray-300 mt-2">{content.description}</p>
              </div>
            </div>
          </motion.div>
        );
      
      case "definition":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-6"
          >
            <h4 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <FaChevronRight className="text-purple-400" />
              {content.title}
            </h4>
            <p className="text-gray-300">{content.description}</p>
          </motion.div>
        );
      
      case "cards":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
          >
            {content.items.map((item, itemIdx) => (
              <div 
                key={itemIdx}
                className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center text-white`}>
                    {item.icon}
                  </div>
                  <h5 className="text-lg font-semibold text-white">{item.title}</h5>
                </div>
                <p className="text-gray-400 text-sm">{item.description}</p>
              </div>
            ))}
          </motion.div>
        );
      
      case "grid":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8"
          >
            {content.items.map((item, itemIdx) => (
              <div 
                key={itemIdx}
                className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-2xl">{item.icon}</div>
                  <h5 className="text-lg font-semibold text-white">{item.title}</h5>
                </div>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </motion.div>
        );
      
      case "highlight":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-blue-900/30 to-cyan-900/20 border border-blue-500/30 p-6 rounded-xl mb-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
              <span className="font-semibold text-white">Automated Processing Note</span>
            </div>
            <p className="text-gray-300">{content.text}</p>
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
            <h4 className="text-2xl font-bold text-white mb-6">
              {content.title}
            </h4>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-500 via-pink-500 to-blue-500 hidden md:block"></div>
              
              {content.steps.map((step, stepIdx) => (
                <div key={stepIdx} className="relative mb-8 md:ml-12 group">
                  <div className="absolute left-0 md:left-[-24px] w-12 h-12 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold text-lg border-4 border-gray-900 z-10">
                    {step.step}
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 ml-0 md:ml-6 hover:border-purple-500/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="text-xl font-semibold text-white">{step.title}</h5>
                      <FaArrowRight className="text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      
      case "category":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6 mb-8"
          >
            <h4 className="text-2xl font-bold text-white">{content.title}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {content.categories.map((cat, catIdx) => (
                <div 
                  key={catIdx}
                  className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
                >
                  <div className={`h-1 rounded-full bg-gradient-to-r ${cat.color} mb-4`}></div>
                  <h5 className="text-lg font-semibold text-white mb-3">{cat.name}</h5>
                  <ul className="space-y-2">
                    {cat.items.map((item, itemIdx) => (
                      <li key={itemIdx} className="flex items-start">
                        <div className="w-1.5 h-1.5 rounded-full bg-gray-500 mt-2 mr-3"></div>
                        <span className="text-gray-400 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
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
            className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
          >
            {content.items.map((item, itemIdx) => (
              <div 
                key={itemIdx}
                className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 hover:border-gray-600 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="text-2xl">{item.icon}</div>
                  <h5 className="text-lg font-semibold text-white">{item.title}</h5>
                </div>
                <p className="text-gray-400">{item.description}</p>
              </div>
            ))}
          </motion.div>
        );
      
      case "warning":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-amber-900/30 to-yellow-900/20 border border-amber-500/30 p-6 rounded-xl mb-6 transform hover:scale-[1.02] transition-transform duration-300"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center">
                <FaExclamationTriangle className="text-white text-lg" />
              </div>
              <h4 className="text-xl font-bold text-white">Compliance Notice</h4>
            </div>
            <p className="text-gray-300">{content.text}</p>
          </motion.div>
        );
      
      case "critical":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-red-900/40 to-orange-900/30 border-2 border-red-500/50 p-8 rounded-2xl mb-8 animate-pulse"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-3xl">{content.icon}</div>
              <h4 className="text-2xl font-bold text-white">{content.title}</h4>
            </div>
            <p className="text-xl text-gray-300 font-semibold">{content.text}</p>
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
                  className="flex items-start gap-3 p-4 bg-gradient-to-r from-red-900/20 to-orange-900/10 rounded-lg border border-red-900/30"
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
      
      case "disclaimer":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-700 rounded-xl p-6 mb-6"
          >
            <h4 className="text-lg font-semibold text-white mb-2">{content.title}</h4>
            <p className="text-gray-400">{content.description}</p>
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
      
      case "confirmation":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-r from-emerald-900/30 to-green-900/20 border border-emerald-500/30 p-6 rounded-xl mb-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="text-2xl">{content.icon}</div>
              <h4 className="text-xl font-bold text-white">{content.title}</h4>
            </div>
            <p className="text-gray-300 text-lg">{content.description}</p>
          </motion.div>
        );
      
      case "excluded":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <h4 className="text-xl font-semibold text-white mb-4">{content.title}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.items.map((item, itemIdx) => (
                <div 
                  key={itemIdx}
                  className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-lg p-4"
                >
                  <h5 className="font-semibold text-white mb-2">{item.category}</h5>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        );
      
      case "notice":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-br from-blue-900/20 to-cyan-900/10 border border-blue-500/30 rounded-xl p-5 mb-6"
          >
            <h4 className="text-lg font-semibold text-white mb-2">{content.title}</h4>
            <p className="text-gray-300">{content.text}</p>
          </motion.div>
        );
      
      case "requirements":
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
                  className="flex items-start gap-3 p-4 bg-gradient-to-r from-pink-900/20 to-rose-900/10 rounded-lg border border-pink-900/30"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-pink-500 to-rose-500 flex items-center justify-center text-xs text-white mt-1 flex-shrink-0">
                    {itemIdx + 1}
                  </div>
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
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
            <h4 className="text-2xl font-bold text-white mb-6">{content.title}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {content.items.map((item, itemIdx) => (
                <div 
                  key={itemIdx}
                  className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5 hover:border-teal-500/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                      {itemIdx + 1}
                    </div>
                    <h5 className="text-lg font-semibold text-white">{item.right}</h5>
                  </div>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              ))}
            </div>
          </motion.div>
        );
      
      case "contact":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-teal-900/30 to-cyan-900/20 border border-teal-500/30 p-6 rounded-xl mb-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <FaEnvelope className="text-teal-400 text-2xl" />
              <h4 className="text-xl font-bold text-white">{content.title}</h4>
            </div>
            <p className="text-gray-300 mb-4">{content.description}</p>
            <div className="flex items-center gap-3">
              <a 
                href={`mailto:${content.email}`}
                className="px-4 py-2 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <FaEnvelope />
                {content.email}
              </a>
            </div>
            <p className="text-gray-400 text-sm mt-4">{content.response}</p>
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
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 flex items-center justify-center">
                <FaGavel className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  LEGAL NOTICES
                </h1>
                <p className="text-xs text-gray-400">GOPHORA Compliance Hub</p>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Last Updated: <span className="text-purple-400">Dec 26, 2026</span>
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
              <span className="bg-gradient-to-r from-purple-400 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
                Legal Notices & Compliance
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Comprehensive legal documentation for GDPR, data processing, and regulatory compliance
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="px-4 py-2 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 rounded-full border border-purple-500/30 text-sm">
                <span className="text-gray-300">Effective from </span>
                <span className="text-purple-300 font-semibold">December 26, 2026</span>
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-full border border-blue-500/30 text-sm">
                <span className="text-gray-300">Version </span>
                <span className="text-blue-300 font-semibold">3.2.0</span>
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-emerald-900/30 to-green-900/30 rounded-full border border-emerald-500/30 text-sm">
                <span className="text-gray-300">GDPR </span>
                <span className="text-emerald-300 font-semibold">Compliant</span>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-1/4">
              <div className="sticky top-32">
                <div className="bg-gradient-to-b from-gray-900/80 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <FaFileAlt className="text-purple-400" />
                    Legal Documents
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
                              {section.subtitle}
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
                        <div className="text-2xl font-bold text-blue-400">32</div>
                        <div className="text-xs text-gray-400">Compliance Points</div>
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
                      <div className="text-gray-400 text-sm mt-1">
                        {sections[activeSection].subtitle}
                      </div>
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

              {/* Quick Links */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 bg-gradient-to-r from-purple-900/30 via-indigo-900/20 to-blue-900/10 border border-purple-500/30 rounded-2xl p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xl flex-shrink-0">
                    <FaFileAlt />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-4">Full Legal Documents</h3>
                    <p className="text-gray-300 mb-6">
                      Complete versions of all legal documents are available for download and review:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <a 
                        href="/terms-of-service" 
                        className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-purple-500/50 transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                            <FaFileContract className="text-white text-sm" />
                          </div>
                          <h4 className="font-semibold text-white">Terms of Service</h4>
                        </div>
                        <p className="text-gray-400 text-sm">Full terms and conditions</p>
                      </a>
                      
                      <a 
                        href="/privacy-policy" 
                        className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-blue-500/50 transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                            <FaLock className="text-white text-sm" />
                          </div>
                          <h4 className="font-semibold text-white">Privacy Policy</h4>
                        </div>
                        <p className="text-gray-400 text-sm">Data protection information</p>
                      </a>
                      
                      <a 
                        href="/cookie-policy" 
                        className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-emerald-500/50 transition-all duration-300 group"
                      >
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center">
                            <FaCookie className="text-white text-sm" />
                          </div>
                          <h4 className="font-semibold text-white">Cookie Policy</h4>
                        </div>
                        <p className="text-gray-400 text-sm">Cookie usage details</p>
                      </a>
                    </div>
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
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent mb-2">
                GOPHORA LEGAL
              </div>
              <p className="text-sm text-gray-400">
                Comprehensive Legal Framework • GDPR Compliant • Global Standards
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-3">
                For legal inquiries and DPO contact:
              </p>
              <a 
                href="mailto:dpo@gophora.com" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-xl hover:opacity-90 transition-opacity"
              >
                <FaEnvelope />
                dpo@gophora.com
              </a>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2026 GOPHORA Inc. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Legal Notices v3.2.0 • Florida, USA
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LegalNotices;