// src/components/FAQ.jsx
import React, { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon, SparklesIcon, UserGroupIcon, RocketLaunchIcon, CurrencyDollarIcon, UserIcon } from "@heroicons/react/24/outline";

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

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
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E1B4B]/50 border border-[#2D1B69] rounded-full mb-4">
          <span className="text-sm text-[#A78BFA]">FAQ</span>
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">Frequently Asked Questions</h2>
        <p className="text-gray-400 text-sm">Clear answers about GOPHORA's mission, process, and vision</p>
      </div>

      {/* FAQ Sections */}
      <div className="space-y-8">
        {faqSections.map((section, sectionIndex) => (
          <div key={sectionIndex} className="border border-[#2D1B69] rounded-xl overflow-hidden">
            {/* Section Header */}
            <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-[#1E1B4B]/30 to-[#2D1B69]/20 border-b border-[#2D1B69]">
              <div className="p-2 bg-[#8B5CF6]/10 rounded-lg">
                <div className="text-[#A78BFA]">{section.icon}</div>
              </div>
              <h3 className="font-semibold text-white">{section.title}</h3>
            </div>

            {/* Questions */}
            <div className="divide-y divide-[#2D1B69]">
              {section.questions.map((question, questionIndex) => {
                const isOpen = openIndex === `${sectionIndex}-${questionIndex}`;
                
                return (
                  <div key={questionIndex} className="transition-colors hover:bg-[#1E1B4B]/10">
                    <button
                      onClick={() => toggleQuestion(sectionIndex, questionIndex)}
                      className="flex items-center justify-between w-full p-4 text-left"
                    >
                      <span className="font-medium text-white pr-8">{question.q}</span>
                      {isOpen ? (
                        <ChevronUpIcon className="h-5 w-5 text-[#A78BFA] flex-shrink-0" />
                      ) : (
                        <ChevronDownIcon className="h-5 w-5 text-gray-500 flex-shrink-0" />
                      )}
                    </button>
                    
                    {isOpen && (
                      <div className="px-4 pb-4 animate-fadeIn">
                        <div className="pl-4 border-l-2 border-[#A78BFA]/50">
                          <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">
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
      <div className="text-center mt-12 pt-8 border-t border-[#2D1B69]">
        <p className="text-gray-400 text-sm mb-4">
          Still have questions?
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button className="px-5 py-2.5 bg-gradient-to-r from-[#8B5CF6] to-[#A78BFA] text-white rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
            Contact Support
          </button>
          <button className="px-5 py-2.5 border border-[#2D1B69] text-gray-300 rounded-lg text-sm font-medium hover:border-[#A78BFA]/30 transition-colors">
            Join Community
          </button>
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
      `}</style>
    </div>
  );
}