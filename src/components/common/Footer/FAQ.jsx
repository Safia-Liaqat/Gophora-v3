import React, { useState, useEffect } from "react";
import { ChevronDownIcon, ChevronUpIcon, SparklesIcon, UserGroupIcon, RocketLaunchIcon, CurrencyDollarIcon, UserIcon } from "@heroicons/react/24/outline";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(document.documentElement.classList.contains('dark'));

  // Listen for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class'],
    });

    return () => observer.disconnect();
  }, []);

  // Professional theme with black/white text
  const theme = {
    bg: isDarkMode ? "bg-[#0a0514]" : "bg-white",
    text: isDarkMode ? "text-white" : "text-black",
    textSecondary: isDarkMode ? "text-gray-300" : "text-gray-600",
    textTertiary: isDarkMode ? "text-gray-400" : "text-gray-500",
    card: isDarkMode ? "bg-white/[0.02] border border-white/5" : "bg-white border border-gray-200",
    accentBorder: isDarkMode ? "border-fuchsia-500/30" : "border-fuchsia-200",
    accentBg: isDarkMode ? "bg-fuchsia-500/10" : "bg-fuchsia-50",
    hover: isDarkMode ? "hover:bg-white/5" : "hover:bg-gray-50",
  };

  const faqSections = [
    {
      title: "The Basics: Understanding GOPHORA",
      icon: <SparklesIcon className="h-5 w-5" />,
      questions: [
        {
          q: "What is GOPHORA?",
          a: "GOPHORA is a human activation infrastructure built to awaken explorers by connecting them with real missions in under 24 hours. It operates on the principle that the greatest resource on the planet—human talent—is not broken, merely inactive. GOPHORA was not born to create jobs; it was born to activate purpose."
        },
        {
          q: "What core problem does GOPHORA solve?",
          a: "GOPHORA confronts the systemic failure of inactive human talent. The problem is not a lack of capable people, but the slow, obsolete systems that keep them disconnected. The core problem isn't a scarcity of talent; it's a 'lack of immediate activation.'"
        },
        {
          q: "Who is GOPHORA for?",
          a: "1. Individuals: Any person whose talent is currently inactive or disconnected—who become 'explorers' when they accept a mission.\n2. Organizations: Companies and teams that demand rapid execution, allowing them to connect with activated talent ready to accomplish missions."
        }
      ]
    },
    {
      title: "The GOPHORA Philosophy",
      icon: <UserIcon className="h-5 w-5" />,
      questions: [
        {
          q: "What does 'Nobody is Ordinary' mean?",
          a: "It's the central thesis of GOPHORA: 'ordinary' is a condition imposed by broken systems. Nobody is ordinary when given a clear mission, when their time is valued, when they can activate their talent in 24 hours, and when they stop surviving and start exploring."
        },
        {
          q: "How does GOPHORA redefine 'work'?",
          a: "GOPHORA shifts from traditional employment to direct activation: Offering Jobs → Assigning Missions, Asking for CVs → Reading Signals, Hiring → Activating, Waiting Months → Activating in <24 Hours."
        },
        {
          q: "What is a 'Mission' versus a 'Job'?",
          a: "A traditional job defines a person by tasks. A mission is about participating in something bigger than oneself. 'No estás buscando trabajo. Estás aceptando una misión.' (You are not looking for a job. You are accepting a mission.)"
        }
      ]
    },
    {
      title: "How It Works",
      icon: <RocketLaunchIcon className="h-5 w-5" />,
      questions: [
        {
          q: "How does GOPHORA connect people to missions?",
          a: "1. Analysis: Visnity AI scans behavior and digital signals to identify talent.\n2. Assignment: GOPHORA assigns a compatible mission.\n3. Execution: User accepts and completes the mission.\n4. Recognition: User earns PHORA, building measurable reputation.\n5. Identity: User becomes an explorer based on missions accomplished."
        },
        {
          q: "What are 'human signals'?",
          a: "Dynamic indicators of a person's real capabilities that Visnity AI reads. Instead of static CVs, the system analyzes behavior and digital context to match talent with missions based on proven potential."
        }
      ]
    },
    {
      title: "Understanding PHORA",
      icon: <CurrencyDollarIcon className="h-5 w-5" />,
      questions: [
        {
          q: "What is PHORA?",
          a: "PHORA is not a currency. It is evidence of mission accomplished. It is the unit of reputation within the GOPHORA ecosystem, a direct measure of contribution. PHORA will grant access to the GOPHORA O'NEIL STARSHIP ecosystem."
        },
        {
          q: "How is PHORA different from a cryptocurrency?",
          a: "• Earned, Not Traded: Earned exclusively by executing missions.\n• Reputation, Not Speculation: Value tied to proven trust.\n• Impact, Not Promises: Measures proven human impact, not future potential."
        },
        {
          q: "What is the ultimate purpose of PHORA?",
          a: "To serve as a permanent record of an individual's impact and an exchangeable asset for tools, VIP experiences, and unique features within the GOPHORA ecosystem. It demonstrates that 'someone chose not to be ordinary.'"
        }
      ]
    },
    {
      title: "Vision & Founder",
      icon: <UserGroupIcon className="h-5 w-5" />,
      questions: [
        {
          q: "Who is Andrea Covarrubias?",
          a: "Founder & Architect of GOPHORA. Her journey through corporate leadership and academic scholarships was forged by confronting a broken system. She transformed 'pain into purpose,' creating GOPHORA as an infrastructure for human dignity and activation."
        },
        {
          q: "What is the long-term vision for GOPHORA?",
          a: "'Before an interplanetary civilization, we need a functional humanity.' GOPHORA is the 'human infrastructure for the explorers of the present and the civilizations of the future,' built to activate talent for humanity's next great explorations."
        },
        {
          q: "How does GOPHORA plan to achieve this vision?",
          a: "By being an 'infrastructure of human activation'—not just a marketplace. It connects purpose with execution, creating a functional system for human contribution and activating talent that was 'never supposed to be left behind.'"
        }
      ]
    }
  ];

  const toggleQuestion = (sectionIndex, questionIndex) => {
    const key = `${sectionIndex}-${questionIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-700 ${theme.bg} ${theme.text} font-sans`}>
      
      {/* Background elements matching landing page */}
      <div className="fixed inset-0 overflow-hidden -z-10">
        <div className={`absolute top-[-10%] left-[-10%] w-[70%] h-[40%] blur-[120px] rounded-full ${isDarkMode ? 'bg-fuchsia-900/20' : 'bg-fuchsia-500/10'}`} />
        <div className={`absolute bottom-[-10%] right-[-10%] w-[70%] h-[40%] blur-[120px] rounded-full ${isDarkMode ? 'bg-indigo-900/20' : 'bg-indigo-500/10'}`} />
        {!isDarkMode && <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(217,70,239,0.03)_50%,transparent_100%)] h-[20%] w-full animate-scan" />}
      </div>

      {/* Content */}
      <div className="w-full px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12 max-w-4xl mx-auto">
          <div className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full mb-4 ${isDarkMode ? 'border-white/20 text-white/60' : 'border-gray-300 text-gray-600'}`}>
            <span className="text-sm">FAQ</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3">Frequently Asked Questions</h1>
          <p className={`${theme.textSecondary}`}>Clear answers about GOPHORA's mission, process, and vision</p>
        </div>

        {/* FAQ Sections - Full width with responsive max-width */}
        <div className="w-full max-w-7xl mx-auto space-y-6">
          {faqSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className={`rounded-xl overflow-hidden ${theme.card}`}>
              {/* Section Header */}
              <div className={`flex items-center gap-3 p-4 md:p-6 ${isDarkMode ? 'bg-white/5' : 'bg-gray-50'} border-b ${isDarkMode ? 'border-white/10' : 'border-gray-200'}`}>
                <div className={`p-2 md:p-3 rounded-lg ${theme.accentBg}`}>
                  <div className={theme.text}>{section.icon}</div>
                </div>
                <h3 className="font-semibold text-lg md:text-xl">{section.title}</h3>
              </div>

              {/* Questions */}
              <div className={`divide-y ${isDarkMode ? 'divide-white/10' : 'divide-gray-200'}`}>
                {section.questions.map((question, questionIndex) => {
                  const isOpen = openIndex === `${sectionIndex}-${questionIndex}`;
                  
                  return (
                    <div key={questionIndex} className={`transition-colors ${theme.hover}`}>
                      <button
                        onClick={() => toggleQuestion(sectionIndex, questionIndex)}
                        className="flex items-center justify-between w-full p-4 md:p-6 text-left"
                      >
                        <span className="font-medium pr-8 text-base md:text-lg">{question.q}</span>
                        {isOpen ? (
                          <ChevronUpIcon className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
                        ) : (
                          <ChevronDownIcon className="h-5 w-5 md:h-6 md:w-6 flex-shrink-0" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="px-4 md:px-6 pb-4 md:pb-6 animate-fadeIn">
                          <div className={`pl-4 md:pl-6 border-l-2 ${theme.accentBorder}`}>
                            <p className={`${theme.textSecondary} text-sm md:text-base leading-relaxed whitespace-pre-line`}>
                              {question.a}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-8 md:mt-12 pt-8 border-t ${isDarkMode ? 'border-white/10' : 'border-gray-200'} max-w-4xl mx-auto`}>
          <p className={`${theme.textSecondary} text-sm md:text-base mb-4`}>
            Still have questions?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className={`px-5 py-2.5 md:px-6 md:py-3 ${isDarkMode ? 'bg-fuchsia-600 hover:bg-fuchsia-700' : 'bg-fuchsia-600 hover:bg-fuchsia-700'} text-white rounded-lg text-sm md:text-base font-medium transition-colors`}>
              Contact Support
            </button>
            <a href="https://t.me/gophoraofficial" className={`px-5 py-2.5 md:px-6 md:py-3 border ${isDarkMode ? 'border-white/10 hover:border-fuchsia-500/30 text-gray-300' : 'border-gray-300 hover:border-fuchsia-300 text-gray-700'} rounded-lg text-sm md:text-base font-medium transition-colors`}>
              Join Community
            </a>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-5px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        
        @keyframes scan { 
          from { transform: translateY(-100%); } 
          to { transform: translateY(500%); } 
        }
        .animate-scan { 
          animation: scan 6s linear infinite; 
        }
      `}</style>
    </div>
  );
}