import React, { useState, useEffect } from 'react';
import { 
  FaQuestionCircle, 
  FaEnvelope, 
  FaComments, 
  FaLightbulb,
  FaShieldAlt,
  FaRobot,
  FaUserCheck,
  FaFileContract,
  FaCog,
  FaSearch,
  FaChevronRight,
  FaChevronDown,
  FaPaperPlane,
  FaHeadset,
  FaStar,
  FaChartLine,
  FaWallet,
  FaLock,
  FaGlobe,
  FaArrowRight
} from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const HelpCenter = () => {
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [openFaqs, setOpenFaqs] = useState({});
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    description: ''
  });

  const categories = [
    { 
      id: 'general', 
      name: 'General', 
      icon: <FaQuestionCircle />, 
      count: 3,
      color: "from-purple-500 to-pink-500",
      description: "Basic information about GOPHORA"
    },
    { 
      id: 'missions', 
      name: 'Missions', 
      icon: <FaFileContract />, 
      count: 3,
      color: "from-blue-500 to-cyan-500",
      description: "How missions work on our platform"
    },
    { 
      id: 'payments', 
      name: 'Payments & PHORA', 
      icon: <FaWallet />, 
      count: 3,
      color: "from-emerald-500 to-green-500",
      description: "Payment processing and reputation tokens"
    },
    { 
      id: 'technical', 
      name: 'Technical', 
      icon: <FaRobot />, 
      count: 3,
      color: "from-amber-500 to-yellow-500",
      description: "AI systems and technical aspects"
    },
    { 
      id: 'legal', 
      name: 'Legal & Privacy', 
      icon: <FaLock />, 
      count: 3,
      color: "from-red-500 to-orange-500",
      description: "Legal information and data protection"
    },
  ];

  const faqs = {
    general: [
      {
        id: 'g1',
        question: "What is GOPHORA?",
        answer: "GOPHORA is a Human Activation Infrastructure that connects human talent (Explorers) with real, outcome-oriented missions in under 24 hours. We're not a job board or employment agency, but a system for activating purpose through mission-based tasks.",
        icon: "🚀"
      },
      {
        id: 'g2',
        question: "How do I get started as an Explorer?",
        answer: "1. Create an account\n2. Complete your profile\n3. Our Visnity AI will analyze your capabilities\n4. Receive compatible mission assignments\n5. Accept and execute missions\n6. Earn compensation and build reputation",
        icon: "🎯",
        steps: true
      },
      {
        id: 'g3',
        question: "Is there a fee to join?",
        answer: "No, joining GOPHORA as an Explorer is completely free. We only retain a 10% commission on completed missions. This commission helps us maintain and improve the platform.",
        icon: "💸"
      }
    ],
    missions: [
      {
        id: 'm1',
        question: "How are missions assigned?",
        answer: "Our proprietary Visnity AI analyzes your 'human signals' (behavioral data, digital signals, context) to identify your capabilities and assign compatible missions automatically. This process happens in real-time and matches your skills with mission requirements.",
        icon: "🤖"
      },
      {
        id: 'm2',
        question: "What types of missions are available?",
        answer: "Missions range from market research and content creation to software development and strategic analysis. Each mission is real, outcome-oriented work from legitimate organizations seeking specific skills and expertise.",
        icon: "📋",
        examples: ["Market Research", "Content Creation", "Software Development", "Data Analysis", "Design Projects", "Strategic Planning"]
      },
      {
        id: 'm3',
        question: "How long do I have to complete a mission?",
        answer: "Mission timelines vary but typically range from a few hours to several days. The exact deadline is specified in each mission brief. You can view this information before accepting any mission.",
        icon: "⏱️"
      }
    ],
    payments: [
      {
        id: 'p1',
        question: "How and when do I get paid?",
        answer: "Payment is released after mission completion is confirmed by the client. GOPHORA retains a 10% platform commission. Payments are processed through our secure payment system within 3-5 business days.",
        icon: "💰"
      },
      {
        id: 'p2',
        question: "What is PHORA?",
        answer: "PHORA is a non-financial reputation token earned upon mission completion. It builds your verifiable identity within the GOPHORA ecosystem and cannot be bought, sold, or traded externally. PHORA represents your mission history and reliability.",
        icon: "🏆"
      },
      {
        id: 'p3',
        question: "Is PHORA a cryptocurrency?",
        answer: "NO. PHORA is NOT a cryptocurrency, financial instrument, or speculative asset. It is exclusively a reputation token within the GOPHORA ecosystem. Think of it as a verified badge of accomplishment.",
        icon: "⚠️",
        warning: true
      }
    ],
    technical: [
      {
        id: 't1',
        question: "What is Visnity AI?",
        answer: "Visnity AI is our proprietary artificial intelligence that analyzes human signals to identify talent and assign compatible missions. It replaces traditional, biased evaluation methods with data-driven insights.",
        icon: "🧠"
      },
      {
        id: 't2',
        question: "Can I opt-out of AI analysis?",
        answer: "Visnity AI analysis is essential for our core service. However, you have rights regarding automated decisions under GDPR and can request human intervention through our support system for any concerns.",
        icon: "🔍"
      },
      {
        id: 't3',
        question: "How is my data protected?",
        answer: "We implement technical and organizational security measures compliant with GDPR, CCPA/CPRA, and other international data protection standards. All data is encrypted and stored on secure servers.",
        icon: "🛡️"
      }
    ],
    legal: [
      {
        id: 'l1',
        question: "Am I an employee of GOPHORA?",
        answer: "NO. Explorers are independent parties engaging in mission-based tasks. No employer-employee, partnership, or joint venture relationship exists. You maintain full control over your work.",
        icon: "⚖️",
        warning: true
      },
      {
        id: 'l2',
        question: "Who owns the work I produce?",
        answer: "Ownership rights are defined by the terms of each specific mission. Typically, work products become the property of the mission provider, but you retain the right to showcase completed work in your portfolio.",
        icon: "📝"
      },
      {
        id: 'l3',
        question: "What are my data rights?",
        answer: "You have rights under GDPR, CCPA/CPRA including access, rectification, erasure, portability, and objection to processing. Contact our Data Protection Officer to exercise these rights.",
        icon: "🔐"
      }
    ]
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleFaq = (id) => {
    setOpenFaqs(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      description: ''
    });
  };

  const filteredFAQs = faqs[activeCategory].filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderFAQContent = (faq) => {
    if (faq.steps) {
      const steps = faq.answer.split('\n').filter(step => step.trim());
      return (
        <div className="space-y-3">
          {steps.map((step, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                {idx + 1}
              </div>
              <span className="text-gray-300">{step}</span>
            </div>
          ))}
        </div>
      );
    }

    if (faq.examples) {
      return (
        <div className="space-y-3">
          <p className="text-gray-300 mb-3">{faq.answer.split('Examples:')[0]}</p>
          <div className="flex flex-wrap gap-2">
            {faq.examples.map((example, idx) => (
              <span 
                key={idx}
                className="px-3 py-1 bg-gradient-to-r from-blue-900/30 to-cyan-900/20 text-blue-300 rounded-full text-sm border border-blue-500/30"
              >
                {example}
              </span>
            ))}
          </div>
        </div>
      );
    }

    return <p className="text-gray-300">{faq.answer}</p>;
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
                <FaQuestionCircle className="text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  HELP CENTER
                </h1>
                <p className="text-xs text-gray-400">GOPHORA Support Hub</p>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              Support: <span className="text-purple-400">24/7 Available</span>
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
            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent">
                Help & Support Center
              </span>
            </h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
              Get instant answers, expert guidance, and personalized support for your GOPHORA journey
            </p>
          </motion.div>

          {/* Search Section */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-3xl mx-auto mb-12"
          >
            <div className="relative group">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
              <div className="relative">
                <FaSearch className="absolute left-6 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for answers, guides, or support topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-14 pr-6 py-5 bg-gradient-to-b from-gray-900/80 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 text-lg"
                />
              </div>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Categories Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-b from-gray-900/80 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sticky top-32">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <FaLightbulb className="text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg font-semibold text-white">Help Categories</h2>
                    <p className="text-sm text-gray-400">Browse by topic</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {categories.map((category) => (
                    <motion.button
                      key={category.id}
                      onClick={() => {
                        setActiveCategory(category.id);
                        setSearchQuery('');
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 group ${
                        activeCategory === category.id
                          ? `bg-gradient-to-r ${category.color} text-white shadow-lg`
                          : 'bg-gray-900/50 text-gray-300 hover:bg-gray-800/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          activeCategory === category.id ? 'bg-white/20' : 'bg-gray-800'
                        }`}>
                          {category.icon}
                        </div>
                        <div className="text-left">
                          <div className="font-medium">{category.name}</div>
                          <div className={`text-xs ${
                            activeCategory === category.id ? 'text-white/80' : 'text-gray-500'
                          }`}>
                            {category.description}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          activeCategory === category.id 
                            ? 'bg-white/20 text-white' 
                            : 'bg-gray-800 text-gray-400'
                        }`}>
                          {category.count}
                        </span>
                        <FaChevronRight className={`transition-transform ${
                          activeCategory === category.id ? 'rotate-90' : 'group-hover:translate-x-1'
                        }`} />
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Support Stats */}
                <div className="mt-8 pt-6 border-t border-gray-700/50">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-900/50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-400">24/7</div>
                      <div className="text-xs text-gray-400">Support</div>
                    </div>
                    <div className="text-center p-3 bg-gray-900/50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-400">98%</div>
                      <div className="text-xs text-gray-400">Satisfaction</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="lg:col-span-3 space-y-8">
              {/* FAQ Section */}
              <motion.div 
                key={activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-b from-gray-900/80 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8"
              >
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-4">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${
                      categories.find(c => c.id === activeCategory)?.color
                    } flex items-center justify-center text-white text-xl`}>
                      {categories.find(c => c.id === activeCategory)?.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        {categories.find(c => c.id === activeCategory)?.name} FAQs
                      </h2>
                      <p className="text-gray-400 text-sm">
                        {categories.find(c => c.id === activeCategory)?.description}
                      </p>
                    </div>
                  </div>
                  <span className="px-3 py-1 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-full text-sm text-gray-300">
                    {filteredFAQs.length} questions found
                  </span>
                </div>

                <div className="space-y-4">
                  {filteredFAQs.length > 0 ? (
                    filteredFAQs.map((faq) => (
                      <motion.div 
                        key={faq.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className={`rounded-xl overflow-hidden border ${
                          faq.warning 
                            ? 'border-red-500/30 bg-gradient-to-r from-red-900/20 to-orange-900/10' 
                            : 'border-gray-700/50 bg-gradient-to-br from-gray-900/50 to-gray-800/30'
                        }`}
                      >
                        <button
                          onClick={() => toggleFaq(faq.id)}
                          className="w-full flex items-center justify-between p-6 text-left"
                        >
                          <div className="flex items-center gap-4">
                            <div className="text-2xl">{faq.icon}</div>
                            <div>
                              <h3 className="text-lg font-semibold text-white">
                                {faq.question}
                              </h3>
                              <p className={`text-sm mt-1 ${
                                faq.warning ? 'text-red-400' : 'text-gray-400'
                              }`}>
                                Click to {openFaqs[faq.id] ? 'collapse' : 'expand'} answer
                              </p>
                            </div>
                          </div>
                          <FaChevronDown className={`text-gray-400 transition-transform duration-300 ${
                            openFaqs[faq.id] ? 'rotate-180' : ''
                          }`} />
                        </button>
                        
                        <AnimatePresence>
                          {openFaqs[faq.id] && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <div className="px-6 pb-6">
                                <div className="pt-4 border-t border-gray-700/50">
                                  {renderFAQContent(faq)}
                                  {faq.warning && (
                                    <div className="mt-4 p-3 bg-red-900/20 rounded-lg border border-red-500/30">
                                      <p className="text-sm text-red-300 font-medium flex items-center gap-2">
                                        ⚠️ Important Notice
                                      </p>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    ))
                  ) : (
                    <motion.div 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="text-center py-12"
                    >
                      <FaSearch className="w-16 h-16 text-gray-500 mx-auto mb-4" />
                      <h3 className="text-xl font-semibold text-gray-300 mb-2">No results found</h3>
                      <p className="text-gray-400">Try searching with different keywords or browse the categories</p>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              {/* Contact Form Section */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-gradient-to-b from-gray-900/80 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8"
              >
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <FaComments className="text-white text-xl" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Need Personalized Help?</h2>
                    <p className="text-gray-400">Our support team is ready to assist you</p>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="group">
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subject
                    </label>
                    <select 
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                    >
                      <option value="">Select a category</option>
                      <option value="technical">Technical Support</option>
                      <option value="payment">Payment Issues</option>
                      <option value="mission">Mission Problems</option>
                      <option value="account">Account Help</option>
                      <option value="privacy">Privacy Concerns</option>
                      <option value="feature">Feature Request</option>
                      <option value="other">Other Inquiry</option>
                    </select>
                  </div>
                  
                  <div className="group">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      rows={5}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700/50 rounded-xl text-white focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none"
                      placeholder="Please describe your issue or question in detail..."
                    />
                  </div>
                  
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all duration-300 flex items-center gap-3 group"
                    >
                      <FaPaperPlane className="group-hover:translate-x-1 transition-transform" />
                      Submit Support Request
                    </motion.button>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-sm text-gray-400">Typically responds in</span>
                      </div>
                      <span className="text-purple-300 font-semibold">24 hours</span>
                    </div>
                  </div>
                </form>
              </motion.div>

              {/* Quick Links Section */}
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="space-y-6"
              >
                <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                  <FaStar className="text-yellow-400" />
                  Additional Resources
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <a
                    href="/privacy-policy"
                    className="group bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-purple-500 to-indigo-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FaShieldAlt className="text-white text-lg" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">Privacy Policy</h4>
                        <p className="text-sm text-gray-400">Data protection details</p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Understand how we protect and use your personal data
                    </p>
                  </a>
                  
                  <a
                    href="/terms-of-service"
                    className="group bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FaFileContract className="text-white text-lg" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">Terms of Service</h4>
                        <p className="text-sm text-gray-400">Platform rules & guidelines</p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Review our terms, conditions, and user agreements
                    </p>
                  </a>
                  
                  <a
                    href="/cookie-policy"
                    className="group bg-gradient-to-br from-gray-900/50 to-gray-800/30 backdrop-blur-sm border border-gray-700/50 rounded-xl p-6 hover:border-emerald-500/50 transition-all duration-300 hover:scale-[1.02]"
                  >
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-emerald-500 to-green-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                        <FaCog className="text-white text-lg" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-white">Cookie Policy</h4>
                        <p className="text-sm text-gray-400">Tracking & preferences</p>
                      </div>
                    </div>
                    <p className="text-gray-400 text-sm">
                      Learn about cookies and how we use tracking technologies
                    </p>
                  </a>
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
                GOPHORA SUPPORT
              </div>
              <p className="text-sm text-gray-400">
                24/7 Help Center • Expert Assistance • Rapid Response
              </p>
            </div>
            
            <div className="text-center">
              <p className="text-gray-400 text-sm mb-3">
                For urgent support requests:
              </p>
              <a 
                href="mailto:support@gophora.com" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:opacity-90 transition-opacity"
              >
                <FaHeadset />
                support@gophora.com
              </a>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2026 GOPHORA Inc. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Help Center v2.0 • Support SLA: 24-hour response
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HelpCenter;