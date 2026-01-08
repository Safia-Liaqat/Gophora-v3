import React, { useState, useEffect } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  SparklesIcon,
  UserGroupIcon,
  RocketLaunchIcon,
  CurrencyDollarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(
    document.documentElement.classList.contains("dark")
  );

  // Listen for theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Theme (UNCHANGED)
  const theme = {
    bg: isDarkMode ? "bg-[#000000]" : "bg-white",
    text: isDarkMode ? "text-white" : "text-black",
    textSecondary: isDarkMode ? "text-gray-300" : "text-gray-600",
    textTertiary: isDarkMode ? "text-gray-400" : "text-gray-500",
    card: isDarkMode
      ? "bg-white/[0.02] border border-white/5"
      : "bg-white border border-gray-200 shadow-sm",
    accentBorder: "border-[#FF4F00]/40",
    accentBg: "bg-[#FF4F00]/10",
    hover: "hover:shadow-xl transition-all duration-300 ease-in-out",
  };

  const faqSections = [
    {
      title: "The Basics: Understanding GOPHORA",
      icon: <SparklesIcon className="h-5 w-5" />,
      questions: [
        {
          q: "What is GOPHORA?",
          a: "GOPHORA is a human activation infrastructure built to awaken explorers by connecting them with real missions in under 24 hours. It operates on the principle that the greatest resource on the planet—human talent—is not broken, merely inactive. GOPHORA was not born to create jobs; it was born to activate purpose.",
        },
        {
          q: "What core problem does GOPHORA solve?",
          a: "GOPHORA confronts the systemic failure of inactive human talent. The problem is not a lack of capable people, but the slow, obsolete systems that keep them disconnected. The core problem isn't a scarcity of talent; it's a 'lack of immediate activation.'",
        },
        {
          q: "Who is GOPHORA for?",
          a: "1. Individuals: Any person whose talent is currently inactive or disconnected—who become 'explorers' when they accept a mission.\n2. Organizations: Companies and teams that demand rapid execution, allowing them to connect with activated talent ready to accomplish missions.",
        },
      ],
    },
    {
      title: "The GOPHORA Philosophy",
      icon: <UserIcon className="h-5 w-5" />,
      questions: [
        {
          q: "What does 'Nobody is Ordinary' mean?",
          a: "It's the central thesis of GOPHORA: 'ordinary' is a condition imposed by broken systems. Nobody is ordinary when given a clear mission, when their time is valued, when they can activate their talent in 24 hours, and when they stop surviving and start exploring.",
        },
        {
          q: "How does GOPHORA redefine 'work'?",
          a: "GOPHORA shifts from traditional employment to direct activation: Offering Jobs → Assigning Missions, Asking for CVs → Reading Signals, Hiring → Activating, Waiting Months → Activating in <24 Hours.",
        },
        {
          q: "What is a 'Mission' versus a 'Job'?",
          a: "A traditional job defines a person by tasks. A mission is about participating in something bigger than oneself.",
        },
      ],
    },
    {
      title: "How It Works",
      icon: <RocketLaunchIcon className="h-5 w-5" />,
      questions: [
        {
          q: "How does GOPHORA connect people to missions?",
          a: "1. Analysis: Visnity AI scans behavior and digital signals to identify talent.\n2. Assignment: GOPHORA assigns a compatible mission.\n3. Execution: User accepts and completes the mission.\n4. Recognition: User earns PHORA.\n5. Identity: User becomes an explorer.",
        },
        {
          q: "What are 'human signals'?",
          a: "Dynamic indicators of a person's real capabilities that Visnity AI reads. Instead of static CVs, the system analyzes behavior and digital context to match talent with missions based on proven potential.",
        },
      ],
    },
    {
      title: "Understanding PHORA",
      icon: <CurrencyDollarIcon className="h-5 w-5" />,
      questions: [
        {
          q: "What is PHORA?",
          a: "PHORA is not a currency. It is evidence of mission accomplished. It is the unit of reputation within the GOPHORA ecosystem, a direct measure of contribution.",
        },
        {
          q: "How is PHORA different from a cryptocurrency?",
          a: "• Earned, Not Traded\n• Reputation, Not Speculation\n• Impact, Not Promises",
        },
        {
          q: "What is the ultimate purpose of PHORA?",
          a: "To serve as a permanent record of an individual's impact and an exchangeable asset within the GOPHORA ecosystem.",
        },
      ],
    },
    {
      title: "Vision & Founder",
      icon: <UserGroupIcon className="h-5 w-5" />,
      questions: [
        {
          q: "Who is Andrea Covarrubias?",
          a: "Founder & Architect of GOPHORA. Her journey through corporate leadership and academic scholarships was forged by confronting a broken system.",
        },
        {
          q: "What is the long-term vision for GOPHORA?",
          a: "'Before an interplanetary civilization, we need a functional humanity.'",
        },
        {
          q: "How does GOPHORA plan to achieve this vision?",
          a: "By being an infrastructure of human activation—not just a marketplace.",
        },
      ],
    },
  ];

  const toggleQuestion = (sectionIndex, questionIndex) => {
    const key = `${sectionIndex}-${questionIndex}`;
    setOpenIndex(openIndex === key ? null : key);
  };

  return (
    <div className={`min-h-screen w-full transition-colors duration-700 ${theme.bg} ${theme.text} font-sans`}>
      <div className="w-full px-4 md:px-6 lg:px-8 py-8 md:py-12">

        {/* TOP HEADER */}
        <div className="text-center mb-8 md:mb-12 max-w-4xl mx-auto">
          <div className={`inline-flex items-center gap-2 px-4 py-2 border rounded-full mb-4 ${theme.accentBorder} ${theme.textSecondary}`}>
            <span className="text-sm">FAQ</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold mb-3">
            Frequently Asked Questions
          </h1>
          <p className={theme.textSecondary}>
            Clear answers about GOPHORA's mission, process, and vision
          </p>
        </div>

        {/* FAQ SECTIONS */}
        <div className="w-full max-w-7xl mx-auto space-y-6">
          {faqSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className={`rounded-xl overflow-hidden ${theme.card}`}>

              {/* SECTION HEADER */}
              <div className="flex items-center gap-3 p-4 md:p-6 bg-[#333333] text-white">
                <div className="p-2 md:p-3 rounded-lg bg-[#333333] text-white">
                  {section.icon}
                </div>
                <h3 className="font-semibold text-lg md:text-xl text-white">
                  {section.title}
                </h3>
              </div>

              {/* QUESTIONS */}
              <div className={`divide-y ${isDarkMode ? "divide-white/10" : "divide-gray-200"}`}>
                {section.questions.map((question, questionIndex) => {
                  const isOpen = openIndex === `${sectionIndex}-${questionIndex}`;
                  return (
                    <div key={questionIndex} className={theme.hover}>
                      <button
                        onClick={() => toggleQuestion(sectionIndex, questionIndex)}
                        className="flex items-center justify-between w-full p-4 md:p-6 text-left"
                      >
                        <span className="font-medium pr-8">{question.q}</span>
                        {isOpen ? <ChevronUpIcon className="h-5 w-5" /> : <ChevronDownIcon className="h-5 w-5" />}
                      </button>

                      {isOpen && (
                        <div className="px-4 md:px-6 pb-4 md:pb-6">
                          <div className={`pl-4 border-l-2 ${theme.accentBorder}`}>
                            <p className={`${theme.textSecondary} text-sm leading-relaxed whitespace-pre-line`}>
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

        {/* CTA — RESTORED */}
        <div className={`text-center mt-8 md:mt-12 pt-8 border-t ${theme.accentBorder} max-w-4xl mx-auto`}>
          <p className={`${theme.textSecondary} text-sm md:text-base mb-4`}>
            Still have questions?
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button className="px-5 py-2.5 md:px-6 md:py-3 bg-[#FF4F00] hover:bg-[#e04b00] text-white rounded-lg text-sm md:text-base font-medium transition-colors">
              Contact Support
            </button>
            <a
              href="https://t.me/gophoraofficial"
              className="px-5 py-2.5 md:px-6 md:py-3 border border-[#FF4F00] hover:border-[#e04b00] text-[#FF4F00] rounded-lg text-sm md:text-base font-medium transition-colors"
            >
              Join Community
            </a>
          </div>
        </div>

      </div>
    </div>
  );
}
