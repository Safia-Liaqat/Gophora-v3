import React, { useState, useEffect } from 'react';
import { 
  FaCookie, 
  FaShieldAlt, 
  FaCog, 
  FaChartLine,
  FaBullhorn,
  FaRobot,
  FaDatabase,
  FaGlobeAmericas,
  FaChevronRight,
  FaChevronDown,
  FaEnvelope,
  FaExclamationTriangle,
  FaCheckCircle,
  FaInfoCircle,
  FaFileContract,
  FaArrowRight,
  FaLock
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const CookiePolicy = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDetails, setOpenDetails] = useState({});

  const sections = [
    {
      id: 0,
      title: "Introduction",
      icon: <FaInfoCircle />,
      color: "from-blue-500 to-cyan-500",
      subtitle: "What Are Cookies"
    },
    {
      id: 1,
      title: "Cookie Types",
      icon: <FaCookie />,
      color: "from-purple-500 to-pink-500",
      subtitle: "Technologies We Use"
    },
    {
      id: 2,
      title: "Your Choices",
      icon: <FaShieldAlt />,
      color: "from-green-500 to-emerald-500",
      subtitle: "Consent & Management"
    },
    {
      id: 3,
      title: "Third Parties",
      icon: <FaGlobeAmericas />,
      color: "from-orange-500 to-amber-500",
      subtitle: "External Services"
    },
    {
      id: 4,
      title: "Data Transfers",
      icon: <FaDatabase />,
      color: "from-indigo-500 to-purple-500",
      subtitle: "International Compliance"
    },
    {
      id: 5,
      title: "Browser Guide",
      icon: <FaLock />,
      color: "from-red-500 to-pink-500",
      subtitle: "Manage Cookies"
    },
    {
      id: 6,
      title: "Updates",
      icon: <FaFileContract />,
      color: "from-gray-600 to-gray-800",
      subtitle: "Policy Changes"
    },
    {
      id: 7,
      title: "Contact",
      icon: <FaEnvelope />,
      color: "from-teal-500 to-cyan-500",
      subtitle: "Get in Touch"
    }
  ];

  const cookieTypes = [
    {
      id: 'essential',
      name: "Strictly Necessary",
      description: "Essential for basic platform operation and cannot be disabled",
      icon: "🔒",
      color: "from-green-500 to-emerald-500",
      features: [
        "User authentication and secure login sessions",
        "Security features and fraud prevention",
        "Core activation protocol for mission assignment",
        "Session management"
      ],
      required: true
    },
    {
      id: 'functional',
      name: "Functional / Preference",
      description: "Remember your choices for enhanced features",
      icon: "⚙️",
      color: "from-blue-500 to-cyan-500",
      features: [
        "Language and region preferences",
        "Customizable settings",
        "Display preferences",
        "Feature accessibility"
      ],
      required: false
    },
    {
      id: 'analytics',
      name: "Analytics / Performance",
      description: "Collect anonymous information to improve our service",
      icon: "📊",
      color: "from-yellow-500 to-amber-500",
      features: [
        "User behavior and interactions",
        "Technical issue identification",
        "Feature usage and value assessment",
        "Platform performance monitoring"
      ],
      required: false
    },
    {
      id: 'marketing',
      name: "Marketing / Advertising",
      description: "Deliver relevant information and measure campaign effectiveness",
      icon: "🎯",
      color: "from-purple-500 to-pink-500",
      features: [
        "Campaign effectiveness measurement",
        "Re-targeting on other websites",
        "Finding individuals with untapped talent",
        "Personalized recommendations"
      ],
      required: false
    }
  ];

  const similarTech = [
    {
      name: "Visnity AI Analysis",
      description: "Proprietary AI that analyzes 'human signals' (behavioral data, digital signals, context) for talent identification",
      icon: <FaRobot />,
      color: "from-teal-500 to-green-500"
    },
    {
      name: "Local Storage",
      description: "Stores data on your device for improved performance and offline functionality",
      icon: <FaDatabase />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Pixels (Web Beacons)",
      description: "Used in emails or on our platform to understand communication effectiveness",
      icon: <FaChartLine />,
      color: "from-purple-500 to-indigo-500"
    },
    {
      name: "SDKs",
      description: "Software Development Kits included in mobile applications for functionality or analytics",
      icon: <FaCog />,
      color: "from-orange-500 to-yellow-500"
    }
  ];

  const thirdPartyServices = [
    {
      provider: "Google Analytics",
      purpose: "Website analytics and performance tracking",
      link: "https://policies.google.com/privacy",
      category: "Analytics"
    },
    {
      provider: "Cloudflare",
      purpose: "Security, DDoS protection, and content delivery",
      link: "https://www.cloudflare.com/privacypolicy/",
      category: "Security"
    },
    {
      provider: "Stripe",
      purpose: "Secure payment processing",
      link: "https://stripe.com/privacy",
      category: "Payments"
    },
    {
      provider: "Segment",
      purpose: "Customer data platform integration",
      link: "https://segment.com/legal/privacy/",
      category: "Data Management"
    },
    {
      provider: "Intercom",
      purpose: "Customer support and communication",
      link: "https://www.intercom.com/legal/privacy",
      category: "Support"
    },
    {
      provider: "AWS",
      purpose: "Cloud infrastructure and hosting",
      link: "https://aws.amazon.com/privacy/",
      category: "Infrastructure"
    }
  ];

  const browserGuides = [
    {
      browser: "Google Chrome",
      icon: "🔍",
      color: "from-blue-500 to-green-500",
      steps: [
        "Click ⋮ in the top-right corner",
        "Select 'Settings' from the menu",
        "Navigate to 'Privacy and security'",
        "Click 'Cookies and other site data'",
        "Adjust settings as desired"
      ]
    },
    {
      browser: "Mozilla Firefox",
      icon: "🦊",
      color: "from-orange-500 to-red-500",
      steps: [
        "Click ☰ in the top-right corner",
        "Select 'Settings' from the menu",
        "Go to 'Privacy & Security'",
        "Find 'Cookies and Site Data' section",
        "Manage exceptions and data"
      ]
    },
    {
      browser: "Safari",
      icon: "🦁",
      color: "from-blue-500 to-purple-500",
      steps: [
        "Click 'Safari' in the menu bar",
        "Select 'Preferences'",
        "Go to 'Privacy' tab",
        "Click 'Manage Website Data'",
        "Choose blocking options"
      ]
    },
    {
      browser: "Microsoft Edge",
      icon: "🌊",
      color: "from-blue-500 to-cyan-500",
      steps: [
        "Click … in the top-right corner",
        "Select 'Settings'",
        "Navigate to 'Cookies and site permissions'",
        "Click 'Cookies and site data'",
        "Select your preference"
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

  const toggleDetail = (id) => {
    setOpenDetails(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const sectionContent = [
    {
      id: 0,
      title: "Introduction: What Are Cookies and Why We Use Them",
      content: [
        {
          type: "hero",
          title: "Understanding Cookie Technology",
          description: "Cookies are small text files stored by your web browser that enable our Human Activation Infrastructure to function optimally.",
          icon: <FaInfoCircle />
        },
        {
          type: "definition",
          title: "What is a Cookie?",
          text: "A 'cookie' is a small text file stored by your web browser on your computer or mobile device when you visit a website. It helps the website remember information about your visit."
        },
        {
          type: "purpose",
          title: "Purpose at GOPHORA",
          text: "We use these technologies to enable our Human Activation Infrastructure, ensuring a seamless, secure, and responsive experience for activating human potential."
        }
      ]
    },
    {
      id: 1,
      title: "Technologies We Use",
      content: [
        {
          type: "cards",
          title: "Cookie Categories",
          items: cookieTypes
        },
        {
          type: "warning",
          text: "⚠️ Disabling strictly necessary cookies will prevent the platform from functioning correctly."
        },
        {
          type: "similar",
          title: "Similar Technologies",
          items: similarTech
        }
      ]
    },
    {
      id: 2,
      title: "Consent and Your Choices",
      content: [
        {
          type: "hero",
          title: "You Control Your Preferences",
          description: "Non-essential cookies require your explicit consent. You can manage your preferences at any time.",
          icon: <FaShieldAlt />
        },
        {
          type: "process",
          title: "How to Manage Your Preferences",
          steps: [
            {
              step: "1",
              title: "Initial Consent",
              description: "You'll see a cookie banner on first visit"
            },
            {
              step: "2",
              title: "Access Settings",
              description: "Click 'Cookie Settings' in the website footer"
            },
            {
              step: "3",
              title: "Customize Preferences",
              description: "Use the consent management platform interface"
            },
            {
              step: "4",
              title: "Save Changes",
              description: "Toggle individual cookie categories on/off and save"
            },
            {
              step: "5",
              title: "Modify Anytime",
              description: "Withdraw or modify consent through account settings"
            }
          ]
        },
        {
          type: "notice",
          title: "Important Notice",
          text: "Essential cookies cannot be disabled as they are required for the platform to function. You can opt-out of non-essential categories."
        }
      ]
    },
    {
      id: 3,
      title: "Third-Party Services",
      content: [
        {
          type: "hero",
          title: "External Service Integration",
          description: "We integrate third-party services that place their own cookies for enhanced functionality.",
          icon: <FaGlobeAmericas />
        },
        {
          type: "table",
          title: "Third-Party Providers",
          items: thirdPartyServices
        },
        {
          type: "warning",
          text: "Note: Third-party partners are subject to change. An updated list is maintained in our documentation."
        }
      ]
    },
    {
      id: 4,
      title: "International Data Transfers",
      content: [
        {
          type: "hero",
          title: "Global Platform Compliance",
          description: "As a global platform, data may be transferred outside your country of residence with appropriate safeguards.",
          icon: <FaDatabase />
        },
        {
          type: "safeguards",
          title: "Safeguards for EEA Data Transfers",
          items: [
            "Standard Contractual Clauses (SCCs) approved by European Commission",
            "Adequacy decisions for recipient countries",
            "Binding Corporate Rules where applicable",
            "Technical and organizational security measures"
          ]
        }
      ]
    },
    {
      id: 5,
      title: "How to Manage Cookies in Your Browser",
      content: [
        {
          type: "hero",
          title: "Browser-Level Controls",
          description: "You can manage cookie preferences directly through your web browser settings.",
          icon: <FaLock />
        },
        {
          type: "browsers",
          title: "Browser-Specific Guides",
          items: browserGuides
        },
        {
          type: "critical",
          text: "WARNING: Disabling strictly necessary cookies will prevent the platform from functioning correctly."
        }
      ]
    },
    {
      id: 6,
      title: "Policy Updates",
      content: [
        {
          type: "hero",
          title: "Keeping You Informed",
          description: "We may update this Cookie Policy to reflect changes in technology, law, or our operations.",
          icon: <FaFileContract />
        },
        {
          type: "update",
          title: "Update Process",
          text: "Significant changes will be communicated through our platform notifications and email updates where applicable."
        }
      ]
    },
    {
      id: 7,
      title: "Contact Us",
      content: [
        {
          type: "contact",
          title: "Questions About Cookies?",
          description: "Contact our Data Protection Officer for any questions about our cookie usage.",
          email: "dpo@gophora.com",
          links: [
            { text: "View Privacy Policy", url: "/privacy-policy" },
            { text: "View Terms of Service", url: "/terms-of-service" },
            { text: "Legal Notices", url: "/legal-notices" }
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
      
      case "purpose":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-6"
          >
            <h4 className="text-xl font-semibold text-white mb-3 flex items-center gap-2">
              <FaCheckCircle className="text-green-400" />
              {content.title}
            </h4>
            <p className="text-gray-300">{content.text}</p>
          </motion.div>
        );
      
      case "cards":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <h4 className="text-2xl font-bold text-white mb-6">{content.title}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.items.map((item, itemIdx) => (
                <div 
                  key={itemIdx}
                  className={`bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border ${
                    item.required ? 'border-red-500/30' : 'border-gray-700/50'
                  } rounded-xl p-6 hover:scale-[1.02] transition-transform duration-300`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{item.icon}</div>
                      <h5 className="text-lg font-semibold text-white">{item.name}</h5>
                    </div>
                    {item.required && (
                      <span className="px-2 py-1 bg-red-500/20 text-red-300 text-xs rounded-full">Required</span>
                    )}
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-4">{item.description}</p>
                  
                  <div className="space-y-2">
                    {item.features.map((feature, featureIdx) => (
                      <div key={featureIdx} className="flex items-start">
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${item.color} mt-2 mr-3`}></div>
                        <span className="text-gray-300 text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
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
            className="bg-gradient-to-r from-red-900/30 to-orange-900/20 border border-red-500/30 p-6 rounded-xl mb-6"
          >
            <div className="flex items-center gap-3 mb-3">
              <FaExclamationTriangle className="text-red-400" />
              <span className="font-semibold text-white">Important Notice</span>
            </div>
            <p className="text-gray-300">{content.text}</p>
          </motion.div>
        );
      
      case "similar":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <h4 className="text-2xl font-bold text-white mb-6">{content.title}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.items.map((item, itemIdx) => (
                <div 
                  key={itemIdx}
                  className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center text-white`}>
                      {item.icon}
                    </div>
                    <h5 className="text-lg font-semibold text-white">{item.name}</h5>
                  </div>
                  <p className="text-gray-400 text-sm">{item.description}</p>
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
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-green-500 via-emerald-500 to-teal-500 hidden md:block"></div>
              
              {content.steps.map((step, stepIdx) => (
                <div key={stepIdx} className="relative mb-8 md:ml-12 group">
                  <div className="absolute left-0 md:left-[-24px] w-12 h-12 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg border-4 border-gray-900 z-10">
                    {step.step}
                  </div>
                  
                  <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 ml-0 md:ml-6 hover:border-green-500/50 transition-all duration-300">
                    <div className="flex items-center justify-between mb-3">
                      <h5 className="text-xl font-semibold text-white">{step.title}</h5>
                      <FaArrowRight className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <p className="text-gray-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      
      case "notice":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-amber-900/30 to-yellow-900/20 border border-amber-500/30 p-6 rounded-xl mb-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-amber-500 to-yellow-500 flex items-center justify-center">
                <FaInfoCircle className="text-white text-lg" />
              </div>
              <h4 className="text-xl font-bold text-white">{content.title}</h4>
            </div>
            <p className="text-gray-300">{content.text}</p>
          </motion.div>
        );
      
      case "table":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <h4 className="text-2xl font-bold text-white mb-6">{content.title}</h4>
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gradient-to-r from-gray-900 to-gray-800">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Provider</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Purpose</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Category</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-white">Privacy Policy</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-800">
                    {content.items.map((item, itemIdx) => (
                      <tr key={itemIdx} className="hover:bg-gray-800/50 transition-colors">
                        <td className="px-6 py-4 text-sm text-gray-300">{item.provider}</td>
                        <td className="px-6 py-4 text-sm text-gray-300">{item.purpose}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 bg-blue-900/30 text-blue-300 rounded-full text-xs">
                            {item.category}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <a 
                            href={item.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-purple-400 hover:text-purple-300 transition-colors text-sm flex items-center gap-1"
                          >
                            View Policy
                            <FaChevronRight className="text-xs" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        );
      
      case "safeguards":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <h4 className="text-2xl font-bold text-white mb-6">{content.title}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.items.map((item, itemIdx) => (
                <div 
                  key={itemIdx}
                  className="bg-gradient-to-br from-blue-900/20 to-cyan-900/10 border border-blue-500/30 rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm">
                      ✓
                    </div>
                    <span className="text-gray-300">{item}</span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      
      case "browsers":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-8"
          >
            <h4 className="text-2xl font-bold text-white mb-6">{content.title}</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {content.items.map((item, itemIdx) => (
                <div 
                  key={itemIdx}
                  className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-2xl">{item.icon}</div>
                    <h5 className="text-lg font-semibold text-white">{item.browser}</h5>
                  </div>
                  
                  <div className="space-y-2">
                    {item.steps.map((step, stepIdx) => (
                      <div key={stepIdx} className="flex items-start">
                        <div className="w-5 h-5 rounded-full bg-gray-700 flex items-center justify-center text-xs text-gray-400 mt-1 mr-3 flex-shrink-0">
                          {stepIdx + 1}
                        </div>
                        <span className="text-gray-300 text-sm">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        );
      
      case "critical":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-gradient-to-r from-red-900/40 to-orange-900/30 border-2 border-red-500/50 p-6 rounded-xl mb-6 animate-pulse"
          >
            <div className="flex items-center gap-3 mb-3">
              <FaExclamationTriangle className="text-red-400 text-xl" />
              <h4 className="text-xl font-bold text-white">Critical Warning</h4>
            </div>
            <p className="text-gray-300">{content.text}</p>
          </motion.div>
        );
      
      case "update":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 mb-6"
          >
            <h4 className="text-lg font-semibold text-white mb-2">{content.title}</h4>
            <p className="text-gray-400">{content.text}</p>
          </motion.div>
        );
      
      case "contact":
        return (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-r from-teal-900/30 to-cyan-900/20 border border-teal-500/30 p-8 rounded-2xl mb-6"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center">
                <FaEnvelope className="text-white text-xl" />
              </div>
              <div>
                <h4 className="text-2xl font-bold text-white">{content.title}</h4>
                <p className="text-gray-300 mt-1">{content.description}</p>
              </div>
            </div>
            
            <div className="space-y-6">
              <a 
                href={`mailto:${content.email}`}
                className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl hover:opacity-90 transition-opacity"
              >
                <FaEnvelope />
                {content.email}
              </a>
              
              <div className="pt-4 border-t border-gray-700/50">
                <p className="text-gray-400 mb-3">Related Documents:</p>
                <div className="flex flex-wrap gap-3">
                  {content.links.map((link, linkIdx) => (
                    <a 
                      key={linkIdx}
                      href={link.url}
                      className="px-4 py-2 bg-gradient-to-br from-gray-900/50 to-gray-800/30 border border-gray-700/50 text-gray-300 rounded-lg hover:border-purple-500/50 hover:text-white transition-all"
                    >
                      {link.text}
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
                <FaCookie className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  COOKIE POLICY
                </h1>
                <p className="text-xs text-gray-400">GOPHORA Cookie Management</p>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Effective: <span className="text-purple-400">Dec 24, 2026</span>
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
                Cookie Policy
              </span>
            </h1>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Understanding how we use cookies and tracking technologies to enhance your GOPHORA experience
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="px-4 py-2 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-full border border-purple-500/30 text-sm">
                <span className="text-gray-300">Effective from </span>
                <span className="text-purple-300 font-semibold">December 24, 2026</span>
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 rounded-full border border-blue-500/30 text-sm">
                <span className="text-gray-300">Version </span>
                <span className="text-blue-300 font-semibold">2.0.0</span>
              </div>
              <div className="px-4 py-2 bg-gradient-to-r from-green-900/30 to-emerald-900/30 rounded-full border border-green-500/30 text-sm">
                <span className="text-gray-300">GDPR </span>
                <span className="text-green-300 font-semibold">Compliant</span>
              </div>
            </div>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="lg:w-1/4">
              <div className="sticky top-32">
                <div className="bg-gradient-to-b from-gray-900/80 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6">
                  <h3 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                    <FaCookie className="text-purple-400" />
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
                        <div className="text-2xl font-bold text-purple-400">4</div>
                        <div className="text-xs text-gray-400">Cookie Types</div>
                      </div>
                      <div className="text-center p-3 bg-gray-900/50 rounded-lg">
                        <div className="text-2xl font-bold text-blue-400">6</div>
                        <div className="text-xs text-gray-400">Third Parties</div>
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

              {/* Cookie Settings */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 bg-gradient-to-r from-purple-900/30 via-pink-900/20 to-blue-900/10 border border-purple-500/30 rounded-2xl p-8"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl flex-shrink-0">
                    <FaCog />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-4">Manage Your Cookie Preferences</h3>
                    <p className="text-gray-300 mb-6">
                      You have full control over your cookie preferences. Adjust settings anytime through our cookie management tool.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5">
                        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                          <FaShieldAlt className="text-green-400" />
                          Current Cookie Status
                        </h4>
                        <div className="space-y-3">
                          {cookieTypes.map((type) => (
                            <div key={type.id} className="flex items-center justify-between">
                              <span className="text-gray-300 text-sm">{type.name}</span>
                              <div className={`w-8 h-4 rounded-full ${type.required ? 'bg-green-500' : 'bg-gray-700'}`}>
                                <div className={`w-4 h-4 rounded-full bg-white transform ${type.required ? 'translate-x-4' : ''} transition-transform`}></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      
                      <div className="bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-5">
                        <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
                          <FaInfoCircle className="text-blue-400" />
                          Quick Actions
                        </h4>
                        <div className="space-y-3">
                          <button className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-lg text-sm hover:opacity-90 transition-opacity">
                            Open Cookie Settings
                          </button>
                          <button className="w-full px-4 py-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 text-gray-300 rounded-lg text-sm hover:bg-gray-800 transition-colors">
                            Accept All Cookies
                          </button>
                          <button className="w-full px-4 py-2 bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 text-gray-300 rounded-lg text-sm hover:bg-gray-800 transition-colors">
                            Reject Non-Essential
                          </button>
                        </div>
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
                GOPHORA COOKIES
              </div>
              <p className="text-sm text-gray-400">
                Transparent Tracking • GDPR Compliant • User-Controlled
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-3">
                For cookie-related inquiries:
              </p>
              <a 
                href="mailto:dpo@gophora.com" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:opacity-90 transition-opacity"
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
                Cookie Policy v2.0 • Updated: Dec 24, 2026
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CookiePolicy;