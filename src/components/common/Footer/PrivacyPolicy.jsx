import React, { useState, useEffect } from 'react';
import { 
  FaShieldAlt, 
  FaDatabase, 
  FaUserLock,
  FaRobot,
  FaGlobeAmericas,
  FaChevronRight,
  FaChevronDown,
  FaEnvelope,
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
  FaFileContract,
  FaArrowRight,
  FaLock,
  FaChartLine,
  FaCog,
  FaUsers,
  FaBalanceScale,
  FaTrashAlt,
  FaClock
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDataTypes, setOpenDataTypes] = useState({});

  const sections = [
    {
      id: 0,
      title: "Introduction",
      icon: <FaInfoCircle />,
      color: "from-blue-500 to-cyan-500",
      subtitle: "Our Privacy Commitment"
    },
    {
      id: 1,
      title: "Data Controller",
      icon: <FaShieldAlt />,
      color: "from-purple-500 to-pink-500",
      subtitle: "Who We Are"
    },
    {
      id: 2,
      title: "Data Collection",
      icon: <FaDatabase />,
      color: "from-emerald-500 to-green-500",
      subtitle: "What We Collect"
    },
    {
      id: 3,
      title: "Visnity AI",
      icon: <FaRobot />,
      color: "from-teal-500 to-cyan-500",
      subtitle: "AI Processing"
    },
    {
      id: 4,
      title: "Data Sharing",
      icon: <FaGlobeAmericas />,
      color: "from-orange-500 to-amber-500",
      subtitle: "Third Parties & Transfers"
    },
    {
      id: 5,
      title: "Your Rights",
      icon: <FaUserLock />,
      color: "from-indigo-500 to-purple-500",
      subtitle: "Data Subject Rights"
    },
    {
      id: 6,
      title: "Security",
      icon: <FaLock />,
      color: "from-red-500 to-pink-500",
      subtitle: "Protection & Retention"
    },
    {
      id: 7,
      title: "Updates",
      icon: <FaFileContract />,
      color: "from-gray-600 to-gray-800",
      subtitle: "Policy Changes"
    }
  ];

  const dataTypes = [
    {
      id: 'account',
      name: "Account Registration Data",
      description: "Personal information provided during account creation",
      icon: "👤",
      color: "from-purple-500 to-pink-500",
      dataPoints: [
        "Name and contact information",
        "Email address",
        "Profile details",
        "Verification documents"
      ],
      purpose: "Create and manage your account, facilitate communication regarding missions",
      legalBasis: "Performance of a contract"
    },
    {
      id: 'platform',
      name: "Platform Usage Data",
      description: "Information about your interactions with GOPHORA",
      icon: "📱",
      color: "from-blue-500 to-cyan-500",
      dataPoints: [
        "Mission history and performance metrics",
        "Interaction logs and session data",
        "Feature usage patterns",
        "Communication records"
      ],
      purpose: "Operate and maintain Platform, improve services, personalize experience, ensure security",
      legalBasis: "Performance of a contract; Legitimate interest"
    },
    {
      id: 'signals',
      name: "Human Signals Data",
      description: "Behavioral and contextual information analyzed by Visnity AI",
      icon: "🧠",
      color: "from-emerald-500 to-green-500",
      dataPoints: [
        "Behavioral patterns and preferences",
        "Digital footprint and interactions",
        "Contextual environmental data",
        "Capability indicators"
      ],
      purpose: "Analyzed by Visnity AI for talent identification and mission assignment",
      legalBasis: "Performance of a contract"
    }
  ];

  const dataRights = [
    {
      id: 'access',
      name: "Right to Access",
      description: "Request a copy of personal data we hold about you",
      icon: <FaChartLine />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      id: 'rectification',
      name: "Right to Rectification",
      description: "Request correction of inaccurate or incomplete data",
      icon: <FaCog />,
      color: "from-green-500 to-emerald-500"
    },
    {
      id: 'erasure',
      name: "Right to Erasure",
      description: "Request deletion of your data under certain conditions",
      icon: <FaTrashAlt />,
      color: "from-red-500 to-orange-500"
    },
    {
      id: 'restrict',
      name: "Right to Restrict Processing",
      description: "Request limitation on how we process your data",
      icon: <FaLock />,
      color: "from-yellow-500 to-amber-500"
    },
    {
      id: 'portability',
      name: "Right to Data Portability",
      description: "Receive your data in machine-readable format",
      icon: <FaDatabase />,
      color: "from-purple-500 to-pink-500"
    },
    {
      id: 'object',
      name: "Right to Object",
      description: "Object to processing, particularly for direct marketing",
      icon: <FaExclamationTriangle />,
      color: "from-orange-500 to-red-500"
    },
    {
      id: 'automated',
      name: "Automated Decision Rights",
      description: "Not to be subject to solely automated decisions with significant effects",
      icon: <FaRobot />,
      color: "from-teal-500 to-cyan-500"
    },
    {
      id: 'optout',
      name: "Right to Opt-Out (CCPA/CPRA)",
      description: "Opt out of 'sale' or 'sharing' of personal information",
      icon: <FaUserLock />,
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const retentionPeriods = [
    {
      type: "Account Data",
      period: "While account is active + 2 years after inactivity",
      reason: "Account management and reactivation"
    },
    {
      type: "Mission Data",
      period: "7 years",
      reason: "Compliance and historical reference"
    },
    {
      type: "Financial Records",
      period: "7 years",
      reason: "Legal and tax compliance"
    },
    {
      type: "Analytics Data",
      period: "3 years",
      reason: "Service improvement and trend analysis"
    },
    {
      type: "Communication Data",
      period: "3 years",
      reason: "Customer service and dispute resolution"
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleDataType = (id) => {
    setOpenDataTypes(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const sectionContent = [
    {
      id: 0,
      title: "Introduction to Our Privacy Commitment",
      content: [
        {
          type: "hero",
          title: "Protecting Your Privacy",
          description: "GOPHORA is committed to protecting the privacy and security of our users' data. We operate with transparency and accountability.",
          icon: <FaShieldAlt />
        },
        {
          type: "definition",
          title: "Our Privacy Philosophy",
          text: "This Privacy Policy explains how we collect, use, process, and safeguard your personal information while enabling our Human Activation Infrastructure."
        },
        {
          type: "compliance",
          title: "Global Compliance Standards",
          items: [
            "GDPR (General Data Protection Regulation)",
            "CCPA/CPRA (California Consumer Privacy Act)",
            "Data protection principles in Latin America",
            "International privacy best practices"
          ]
        }
      ]
    },
    {
      id: 1,
      title: "Data Controller Information",
      content: [
        {
          type: "hero",
          title: "Who Is Responsible For Your Data",
          description: "The entity responsible for processing your personal information",
          icon: <FaShieldAlt />
        },
        {
          type: "controller",
          title: "Data Controller",
          company: "GOPHORA Inc.",
          location: "Florida, USA",
          role: "Primary data controller responsible for your personal information"
        },
        {
          type: "contact",
          title: "Contact Information",
          email: "contact@gophora.com",
          role: "For privacy-related inquiries and data rights requests"
        }
      ]
    },
    {
      id: 2,
      title: "Personal Data We Collect and How We Use It",
      content: [
        {
          type: "hero",
          title: "Transparent Data Collection",
          description: "We collect only necessary data to provide our services effectively",
          icon: <FaDatabase />
        },
        {
          type: "dataCards",
          title: "Categories of Personal Data",
          items: dataTypes
        },
        {
          type: "warning",
          text: "Processing of Human Signals Data is strictly necessary for our core Service. For non-essential processing or sensitive data, we will obtain your explicit consent."
        }
      ]
    },
    {
      id: 3,
      title: "Artificial Intelligence - Visnity AI",
      content: [
        {
          type: "hero",
          title: "AI-Driven Talent Activation",
          description: "Our proprietary Visnity AI analyzes Human Signals to assess capabilities and assign compatible missions",
          icon: <FaRobot />
        },
        {
          type: "aiProcess",
          title: "How Visnity AI Works",
          steps: [
            {
              step: "1",
              title: "Signal Collection",
              description: "Gather behavioral and contextual data"
            },
            {
              step: "2",
              title: "Pattern Analysis",
              description: "Identify talent indicators and capabilities"
            },
            {
              step: "3",
              title: "Mission Matching",
              description: "Match skills with compatible missions"
            },
            {
              step: "4",
              title: "Continuous Learning",
              description: "Improve algorithms based on outcomes"
            }
          ]
        },
        {
          type: "rights",
          title: "Your Rights Regarding AI Decisions",
          items: [
            "Request human intervention in automated decisions",
            "Contest AI-based decisions affecting you",
            "Receive explanation of AI decision-making processes",
            "Express your point of view regarding automated decisions"
          ]
        }
      ]
    },
    {
      id: 4,
      title: "Data Sharing and International Transfers",
      content: [
        {
          type: "hero",
          title: "Responsible Data Sharing",
          description: "We handle your data with care and only share it under specific circumstances",
          icon: <FaGlobeAmericas />
        },
        {
          type: "sharing",
          title: "Data Sharing Partners",
          items: [
            {
              category: "Service Providers",
              description: "Trusted partners for cloud hosting, security, and infrastructure",
              examples: "AWS, Google Cloud, Cloudflare"
            },
            {
              category: "Mission Organizations",
              description: "Only necessary information for mission execution",
              examples: "Client companies and organizations"
            },
            {
              category: "Legal Authorities",
              description: "When required by law or to protect rights",
              examples: "Court orders, regulatory requirements"
            }
          ]
        },
        {
          type: "transfers",
          title: "International Data Transfers",
          text: "As a global platform, your data may be transferred outside your country of residence. We use Standard Contractual Clauses (SCCs) to ensure GDPR-level protection for EEA data transfers.",
          safeguards: [
            "Standard Contractual Clauses (SCCs)",
            "Adequacy decisions for recipient countries",
            "Binding Corporate Rules where applicable",
            "Technical encryption and security measures"
          ]
        }
      ]
    },
    {
      id: 5,
      title: "Your Data Rights",
      content: [
        {
          type: "hero",
          title: "Control Over Your Data",
          description: "You have comprehensive rights regarding your personal information",
          icon: <FaUserLock />
        },
        {
          type: "rightsGrid",
          title: "Your Data Protection Rights",
          items: dataRights
        },
        {
          type: "process",
          title: "How to Exercise Your Rights",
          steps: [
            {
              step: "1",
              title: "Contact Us",
              description: "Email contact@gophora.com with 'Data Rights Request'"
            },
            {
              step: "2",
              title: "Provide Identification",
              description: "Include your user ID and verification details"
            },
            {
              step: "3",
              title: "Specify Request",
              description: "Clearly state which right you wish to exercise"
            },
            {
              step: "4",
              title: "Receive Response",
              description: "We will respond within 30 days as required by law"
            }
          ]
        }
      ]
    },
    {
      id: 6,
      title: "Data Security and Retention",
      content: [
        {
          type: "hero",
          title: "Security First Approach",
          description: "We implement robust security measures to protect your information",
          icon: <FaLock />
        },
        {
          type: "security",
          title: "Security Measures",
          measures: [
            "End-to-end encryption for data in transit and at rest",
            "Regular security audits and penetration testing",
            "Access controls and authentication mechanisms",
            "Incident response and breach notification procedures"
          ]
        },
        {
          type: "retention",
          title: "Data Retention Periods",
          items: retentionPeriods
        }
      ]
    },
    {
      id: 7,
      title: "Policy Updates and Contact",
      content: [
        {
          type: "hero",
          title: "Keeping You Informed",
          description: "We may update this policy to reflect changes in our practices",
          icon: <FaFileContract />
        },
        {
          type: "updates",
          title: "Policy Update Process",
          text: "Material changes will be notified through our Platform notifications and email communications where appropriate. The 'Last Updated' date indicates when this policy was last revised.",
          communication: [
            "In-platform notifications",
            "Email updates for significant changes",
            "Updated documentation and version history",
            "Clear changelog of modifications"
          ]
        },
        {
          type: "finalContact",
          title: "Contact Our Privacy Team",
          description: "For privacy-related questions or to exercise your data rights",
          email: "contact@gophora.com",
          address: "GOPHORA Inc., Florida, USA",
          additional: [
            { label: "Cookie Policy", url: "/cookie-policy" },
            { label: "Terms of Service", url: "/terms-of-service" },
            { label: "Legal Notices", url: "/legal-notices" }
          ]
        }
      ]
    }
  ];

  const renderContent = (content, idx) => {
    switch(content.type) {
      case "hero":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-900/30 to-pink-900/20 border-l-4 border-purple-500 p-8 rounded-r-2xl mb-8"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl">
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
              <FaInfoCircle className="text-blue-400" />
              {content.title}
            </h4>
            <p className="text-gray-300">{content.text}</p>
          </motion.div>
        );
      
      case "compliance":
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
                  className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-900/20 to-cyan-900/10 rounded-lg border border-blue-900/30"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-xs text-white flex-shrink-0">
                    ✓
                  </div>
                  <span className="text-gray-300 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        );
      
      case "controller":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-br from-purple-900/30 to-pink-900/20 border border-purple-500/30 rounded-xl p-6 mb-6"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <FaShieldAlt className="text-white text-lg" />
              </div>
              <h4 className="text-xl font-bold text-white">{content.title}</h4>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Company</div>
                <div className="text-lg font-semibold text-white">{content.company}</div>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Location</div>
                <div className="text-lg font-semibold text-white">{content.location}</div>
              </div>
              
              <div className="p-4 bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-lg">
                <div className="text-sm text-gray-400 mb-1">Role</div>
                <div className="text-gray-300">{content.role}</div>
              </div>
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
            <a 
              href={`mailto:${content.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl hover:opacity-90 transition-opacity mb-3"
            >
              <FaEnvelope />
              {content.email}
            </a>
            <p className="text-gray-400 text-sm">{content.role}</p>
          </motion.div>
        );
      
      case "dataCards":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <h4 className="text-2xl font-bold text-white mb-6">{content.title}</h4>
            <div className="space-y-6">
              {content.items.map((item, itemIdx) => (
                <div 
                  key={itemIdx}
                  className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleDataType(item.id)}
                    className="w-full flex items-center justify-between p-6 text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{item.icon}</div>
                      <div>
                        <h5 className="text-lg font-semibold text-white">{item.name}</h5>
                        <p className="text-gray-400 text-sm mt-1">{item.description}</p>
                      </div>
                    </div>
                    <FaChevronDown className={`text-gray-400 transition-transform duration-300 ${
                      openDataTypes[item.id] ? 'rotate-180' : ''
                    }`} />
                  </button>
                  
                  <AnimatePresence>
                    {openDataTypes[item.id] && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="px-6 pb-6">
                          <div className="pt-4 border-t border-gray-700/50">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              <div className="space-y-4">
                                <h6 className="font-semibold text-white">Data Points</h6>
                                <ul className="space-y-2">
                                  {item.dataPoints.map((point, pointIdx) => (
                                    <li key={pointIdx} className="flex items-start">
                                      <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${item.color} mt-2 mr-3`}></div>
                                      <span className="text-gray-300 text-sm">{point}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                              
                              <div>
                                <h6 className="font-semibold text-white mb-2">Purpose</h6>
                                <p className="text-gray-300 text-sm">{item.purpose}</p>
                              </div>
                              
                              <div>
                                <h6 className="font-semibold text-white mb-2">Legal Basis (GDPR)</h6>
                                <div className="px-3 py-1 bg-gradient-to-r from-blue-900/30 to-cyan-900/20 text-blue-300 rounded-full text-sm border border-blue-500/30 inline-block">
                                  {item.legalBasis}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        );
      
      case "warning":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-yellow-900/30 to-amber-900/20 border border-yellow-500/30 p-6 rounded-xl mb-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <FaExclamationTriangle className="text-yellow-400" />
              <span className="font-semibold text-white">Important Notice</span>
            </div>
            <p className="text-gray-300">{content.text}</p>
          </motion.div>
        );
      
      case "aiProcess":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <h4 className="text-2xl font-bold text-white mb-6">{content.title}</h4>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-teal-500 via-cyan-500 to-blue-500 hidden md:block"></div>
              
              {content.steps.map((step, stepIdx) => (
                <div key={stepIdx} className="relative mb-8 md:ml-12 group">
                  <div className="absolute left-0 md:left-[-24px] w-12 h-12 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg border-4 border-gray-900 z-10">
                    {step.step}
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 ml-0 md:ml-6 hover:border-teal-500/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="text-xl font-semibold text-white">{step.title}</h5>
                      <FaArrowRight className="text-teal-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
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
            <h4 className="text-xl font-semibold text-white mb-4">{content.title}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.items.map((item, itemIdx) => (
                <div 
                  key={itemIdx}
                  className="flex items-start gap-3 p-4 bg-gradient-to-r from-teal-900/20 to-cyan-900/10 rounded-lg border border-teal-900/30"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-xs text-white mt-1 flex-shrink-0">
                    ✓
                  </div>
                  <span className="text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </motion.div>
        );
      
      case "sharing":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <h4 className="text-2xl font-bold text-white mb-6">{content.title}</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {content.items.map((item, itemIdx) => (
                <div 
                  key={itemIdx}
                  className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-lg ${
                      itemIdx === 0 ? 'bg-gradient-to-r from-blue-500 to-cyan-500' :
                      itemIdx === 1 ? 'bg-gradient-to-r from-purple-500 to-pink-500' :
                      'bg-gradient-to-r from-orange-500 to-yellow-500'
                    } flex items-center justify-center text-white`}>
                      {itemIdx === 0 ? <FaCog /> : itemIdx === 1 ? <FaUsers /> : <FaBalanceScale />}
                    </div>
                    <h5 className="text-lg font-semibold text-white">{item.category}</h5>
                  </div>
                  <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                  <div className="px-3 py-1 bg-gray-800/50 text-gray-300 rounded text-xs">
                    Examples: {item.examples}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      
      case "transfers":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-6"
          >
            <h4 className="text-xl font-semibold text-white mb-3">{content.title}</h4>
            <p className="text-gray-300 mb-4">{content.text}</p>
            
            <div className="space-y-3">
              <h5 className="font-semibold text-white">Safeguards Implemented:</h5>
              {content.safeguards.map((safeguard, idx) => (
                <div key={idx} className="flex items-start">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-xs text-white mt-1 mr-3 flex-shrink-0">
                    ✓
                  </div>
                  <span className="text-gray-300 text-sm">{safeguard}</span>
                </div>
              ))}
            </div>
          </motion.div>
        );
      
      case "rightsGrid":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <h4 className="text-2xl font-bold text-white mb-6">{content.title}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {content.items.map((item, itemIdx) => (
                <div 
                  key={itemIdx}
                  className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5 hover:border-purple-500/50 transition-all duration-300 group"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center text-white`}>
                      {item.icon}
                    </div>
                    <h5 className="text-sm font-semibold text-white">{item.name}</h5>
                  </div>
                  <p className="text-gray-400 text-xs">{item.description}</p>
                </div>
              ))}
            </div>
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
            <h4 className="text-2xl font-bold text-white mb-6">{content.title}</h4>
            <div className="relative">
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500 hidden md:block"></div>
              
              {content.steps.map((step, stepIdx) => (
                <div key={stepIdx} className="relative mb-8 md:ml-12 group">
                  <div className="absolute left-0 md:left-[-24px] w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg border-4 border-gray-900 z-10">
                    {step.step}
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 ml-0 md:ml-6 hover:border-indigo-500/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="text-xl font-semibold text-white">{step.title}</h5>
                      <FaArrowRight className="text-indigo-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      
      case "security":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <h4 className="text-xl font-semibold text-white mb-4">{content.title}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {content.measures.map((measure, measureIdx) => (
                <div 
                  key={measureIdx}
                  className="flex items-start gap-3 p-4 bg-gradient-to-r from-green-900/20 to-emerald-900/10 rounded-lg border border-green-900/30"
                >
                  <div className="w-6 h-6 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-xs text-white mt-1 flex-shrink-0">
                    🔒
                  </div>
                  <span className="text-gray-300">{measure}</span>
                </div>
              ))}
            </div>
          </motion.div>
        );
      
      case "retention":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6"
          >
            <h4 className="text-xl font-semibold text-white mb-4">{content.title}</h4>
            <div className="space-y-4">
              {content.items.map((item, itemIdx) => (
                <div 
                  key={itemIdx}
                  className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h5 className="font-semibold text-white mb-1">{item.type}</h5>
                      <p className="text-gray-400 text-sm">{item.reason}</p>
                    </div>
                    <div className="px-4 py-2 bg-gradient-to-r from-blue-900/30 to-cyan-900/20 text-blue-300 rounded-lg text-sm font-semibold border border-blue-500/30">
                      {item.period}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      
      case "updates":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-6"
          >
            <h4 className="text-lg font-semibold text-white mb-2">{content.title}</h4>
            <p className="text-gray-400 mb-4">{content.text}</p>
            
            <div className="space-y-2">
              <h5 className="font-semibold text-white text-sm">Update Communication:</h5>
              {content.communication.map((method, idx) => (
                <div key={idx} className="flex items-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mr-3"></div>
                  <span className="text-gray-300 text-sm">{method}</span>
                </div>
              ))}
            </div>
          </motion.div>
        );
      
      case "finalContact":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-purple-900/30 to-pink-900/20 border border-purple-500/30 p-8 rounded-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                <FaEnvelope className="text-white text-xl" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white">{content.title}</h4>
                <p className="text-gray-300 mt-1">{content.description}</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <FaEnvelope className="text-purple-400" />
                    <h5 className="font-semibold text-white">Email</h5>
                  </div>
                  <a 
                    href={`mailto:${content.email}`}
                    className="text-purple-300 hover:text-purple-200 transition-colors"
                  >
                    {content.email}
                  </a>
                </div>
                
                <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <FaMapMarkerAlt className="text-blue-400" />
                    <h5 className="font-semibold text-white">Address</h5>
                  </div>
                  <p className="text-gray-300">{content.address}</p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-700/50">
                <h5 className="font-semibold text-white mb-3">Related Policies:</h5>
                <div className="flex flex-wrap gap-3">
                  {content.additional.map((link, linkIdx) => (
                    <a 
                      key={linkIdx}
                      href={link.url}
                      className="px-4 py-2 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 text-gray-300 rounded-lg hover:border-purple-500/50 hover:text-white transition-all text-sm"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>
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
                <FaShieldAlt className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  PRIVACY POLICY
                </h1>
                <p className="text-xs text-gray-400">GOPHORA Data Protection</p>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Updated: <span className="text-purple-400">Dec 24, 2026</span>
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
                Privacy Policy
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Your privacy matters. Learn how we protect and process your personal information
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="px-4 py-2 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-full border border-purple-500/30 text-sm">
                <span className="text-gray-300">Last Updated </span>
                <span className="text-purple-300 font-semibold">December 24, 2026</span>
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-full border border-blue-500/30 text-sm">
                <span className="text-gray-300">Version </span>
                <span className="text-blue-300 font-semibold">3.0.0</span>
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-full border border-green-500/30 text-sm">
                <span className="text-gray-300">Compliance </span>
                <span className="text-green-300 font-semibold">GDPR, CCPA, ISO 27001</span>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-1/4">
              <div className="sticky top-32">
                <div className="bg-gradient-to-b from-gray-900/80 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <FaShieldAlt className="text-purple-400" />
                    Policy Sections
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
                        <div className="text-xs text-gray-400">Rights</div>
                      </div>
                      <div className="text-center p-3 bg-gray-900/50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-400">5</div>
                        <div className="text-xs text-gray-400">Retention Periods</div>
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

              {/* Data Rights Exercise */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 bg-gradient-to-r from-indigo-900/30 via-purple-900/20 to-pink-900/10 border border-purple-500/30 rounded-2xl p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xl flex-shrink-0">
                    <FaUserLock />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-4">Exercise Your Data Rights</h3>
                    <p className="text-gray-300 mb-6">
                      Ready to exercise your data protection rights? Use our simplified process to submit your request.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5">
                        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                          <FaEnvelope className="text-blue-400" />
                          Email Request
                        </h4>
                        <p className="text-gray-400 text-sm mb-3">
                          Send request to: <span className="text-blue-300">contact@gophora.com</span>
                        </p>
                        <div className="text-xs text-gray-500">Subject: "Data Rights Request"</div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5">
                        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                          <FaShieldAlt className="text-green-400" />
                          Required Information
                        </h4>
                        <ul className="space-y-1 text-sm text-gray-400">
                          <li>• Your user ID</li>
                          <li>• Specific right to exercise</li>
                          <li>• Verification details</li>
                        </ul>
                      </div>
                      
                      <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5">
                        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                          <FaClock className="text-yellow-400" />
                          Response Time
                        </h4>
                        <p className="text-gray-400 text-sm">
                          We respond to all data rights requests within <span className="text-yellow-300 font-semibold">30 days</span> as required by law.
                        </p>
                      </div>
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
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">
                GOPHORA PRIVACY
              </div>
              <p className="text-sm text-gray-400">
                Transparent Data Protection • User Control • Global Compliance
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-3">
                For privacy inquiries:
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
                Privacy Policy v3.0 • Updated: Dec 24, 2026
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;