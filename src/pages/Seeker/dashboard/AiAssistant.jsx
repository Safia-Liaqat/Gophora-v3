import React, { useState, useEffect } from "react";
import { FiSend } from "react-icons/fi";
import { Bolt, ArrowRight } from "lucide-react";
import api from '../../../services/api';

export default function AIAssistant() {
  const [messages, setMessages] = useState([
    { text: "Hello! I'm Visinity AI, your intelligent assistant. Ask me anything - general questions, job searches, or platform help!", from: "ai" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [opportunities, setOpportunities] = useState([]);
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

  // Theme variables
  const theme = {
    bg: isDarkMode ? "bg-[#0a0514]" : "bg-slate-50",
    card: isDarkMode ? "bg-white/[0.02] border-white/5" : "bg-white border-fuchsia-100 shadow-sm",
    buttonPrimary: isDarkMode ? "bg-fuchsia-600 hover:bg-fuchsia-700 text-white" : "bg-[#2d124d] hover:bg-fuchsia-600 text-white",
    buttonSecondary: isDarkMode ? "bg-white/5 border-white/10 text-white hover:bg-white/10" : "bg-white border-fuchsia-100 text-black hover:bg-fuchsia-50",
    inputBg: isDarkMode ? "bg-white/5 border-white/10" : "bg-white border-fuchsia-100",
    textColor: isDarkMode ? "text-white" : "text-black",
    textMuted: isDarkMode ? "text-gray-300" : "text-gray-600",
    accentBorder: isDarkMode ? "border-fuchsia-500/30" : "border-fuchsia-300",
  };

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage = input.trim();
    setMessages(prev => [...prev, { text: userMessage, from: "user" }]);
    setInput("");
    setLoading(true);
    
    try {
      const response = await api.post('/chat', { message: userMessage });
      const aiReply = response.data.reply || "I'm sorry, I couldn't process that. Please try again.";
      
      setMessages(prev => [...prev, { text: aiReply, from: "ai" }]);
      
      // If there are job recommendations, store and display them
      if (response.data.opportunities && response.data.opportunities.length > 0) {
        setOpportunities(response.data.opportunities);
      } else {
        setOpportunities([]);
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        text: "Sorry, I'm having trouble connecting right now. Please try again later.", 
        from: "ai" 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex flex-col h-full p-4 md:p-6 font-sans transition-colors duration-700 ${theme.bg} ${theme.textColor}`}>
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
          isDarkMode 
            ? "bg-gradient-to-br from-fuchsia-600 to-purple-700" 
            : "bg-fuchsia-100 text-fuchsia-600"
        }`}>
          <Bolt className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Visinity AI</h1>
          <p className={`text-xs ${theme.textMuted}`}>Your intelligent activation assistant</p>
        </div>
      </div>
      
      {/* Chat Messages Container */}
      <div className={`flex-1 rounded-2xl p-4 overflow-y-auto border ${theme.card} mb-4`}>
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`my-3 max-w-xs md:max-w-md ${msg.from === 'user' ? 'ml-auto' : 'mr-auto'}`}
          >
            <div className={`p-3 rounded-2xl text-sm ${
              msg.from === 'user'
                ? isDarkMode 
                  ? "bg-fuchsia-500/20 border border-fuchsia-500/30 text-white rounded-br-none" 
                  : "bg-fuchsia-50 border border-fuchsia-200 text-black rounded-br-none"
                : isDarkMode
                  ? "bg-white/5 border border-white/5 text-white rounded-bl-none"
                  : "bg-gray-50 border border-gray-200 text-black rounded-bl-none"
            }`}>
              {msg.text}
            </div>
            <div className={`text-[10px] uppercase tracking-[0.1em] mt-1 px-2 ${
              msg.from === 'user' ? 'text-right' : 'text-left'
            } ${theme.textMuted}`}>
              {msg.from === 'user' ? 'You' : 'Visinity AI'}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="my-3 mr-auto max-w-xs md:max-w-md">
            <div className={`p-3 rounded-2xl text-sm rounded-bl-none ${
              isDarkMode 
                ? "bg-white/5 border border-white/5 text-white" 
                : "bg-gray-50 border border-gray-200 text-black"
            }`}>
              <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className={`w-2 h-2 rounded-full animate-pulse ${
                    isDarkMode ? "bg-white/60" : "bg-gray-400"
                  }`}></div>
                  <div className={`w-2 h-2 rounded-full animate-pulse delay-150 ${
                    isDarkMode ? "bg-white/60" : "bg-gray-400"
                  }`}></div>
                  <div className={`w-2 h-2 rounded-full animate-pulse delay-300 ${
                    isDarkMode ? "bg-white/60" : "bg-gray-400"
                  }`}></div>
                </div>
                <span className={theme.textMuted}>Thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Job Opportunities */}
      {opportunities.length > 0 && (
        <div className={`mb-4 rounded-2xl p-4 border ${theme.card}`}>
          <div className="flex items-center justify-between mb-3">
            <h3 className={`text-sm font-bold uppercase tracking-[0.1em] ${theme.textColor}`}>
              Found {opportunities.length} Mission{opportunities.length !== 1 ? 's' : ''}
            </h3>
            <span className={`text-xs px-2 py-1 rounded-full ${
              isDarkMode 
                ? "bg-fuchsia-500/20 text-fuchsia-400" 
                : "bg-fuchsia-100 text-fuchsia-600"
            }`}>
              AI Recommended
            </span>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {opportunities.map((job, idx) => (
              <div 
                key={idx} 
                className={`p-3 rounded-xl border transition-all hover:scale-[1.01] ${
                  isDarkMode 
                    ? "bg-white/5 border-white/5 hover:bg-white/10" 
                    : "bg-white border-fuchsia-100 hover:bg-fuchsia-50"
                }`}
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <p className={`font-medium text-sm ${theme.textColor}`}>
                      {job.jobTitle || job.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`text-xs ${theme.textMuted}`}>
                        {job.company || job.source}
                      </span>
                      {job.location && (
                        <>
                          <span className={`text-xs ${theme.textMuted}`}>•</span>
                          <span className={`text-xs ${theme.textMuted}`}>{job.location}</span>
                        </>
                      )}
                    </div>
                    {job.category && (
                      <div className={`mt-2 text-xs px-2 py-1 rounded-full inline-block ${
                        isDarkMode 
                          ? "bg-fuchsia-500/10 text-fuchsia-400" 
                          : "bg-fuchsia-100 text-fuchsia-600"
                      }`}>
                        {job.category}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => job.sourceLink && window.open(job.sourceLink, '_blank')}
                    className={`group px-3 py-1.5 text-xs rounded-lg flex items-center gap-1 transition-all active:scale-95 ${
                      isDarkMode 
                        ? "bg-fuchsia-600 text-white hover:bg-fuchsia-700" 
                        : "bg-[#2d124d] text-white hover:bg-fuchsia-600"
                    }`}
                  >
                    Apply
                    <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="mt-2">
        <div className="flex gap-2">
          <input
            type="text"
            className={`flex-1 p-3 rounded-xl text-sm ${theme.textColor} placeholder:text-gray-400 focus:border-fuchsia-500/50 focus:ring-1 focus:ring-fuchsia-500/20 outline-none transition-all ${theme.inputBg}`}
            placeholder="Ask about missions, skills, or opportunities..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !loading && sendMessage()}
            disabled={loading}
          />
          <button 
            onClick={sendMessage} 
            disabled={loading || !input.trim()}
            className={`group p-3 rounded-xl transition-all active:scale-95 shadow-md ${
              loading || !input.trim()
                ? isDarkMode
                  ? "bg-fuchsia-600/50 text-white/50 cursor-not-allowed"
                  : "bg-[#2d124d]/50 text-white/50 cursor-not-allowed"
                : isDarkMode
                  ? "bg-fuchsia-600 text-white hover:bg-fuchsia-700"
                  : "bg-[#2d124d] text-white hover:bg-fuchsia-600"
            }`}
          >
            <FiSend className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
        <p className={`text-xs mt-2 text-center ${theme.textMuted}`}>
          Type your question and press Enter or click Send
        </p>
      </div>
    </div>
  );
}