import React, { useState } from "react";
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
    <div className="flex flex-col h-full p-4 md:p-6 font-sans bg-white text-black">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#FF4F00]">
          <Bolt className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-xl md:text-2xl font-bold">Visinity AI</h1>
          <p className="text-xs text-gray-600">Your intelligent activation assistant</p>
        </div>
      </div>
      
      {/* Chat Messages Container */}
      <div className="flex-1 rounded-lg p-4 overflow-y-auto border bg-white border-gray-200 shadow-sm mb-4">
        {messages.map((msg, i) => (
          <div 
            key={i} 
            className={`my-3 max-w-xs md:max-w-md ${msg.from === 'user' ? 'ml-auto' : 'mr-auto'}`}
          >
            <div className={`p-3 rounded-lg text-sm ${
              msg.from === 'user'
                ? "bg-[#FF4F00] text-white rounded-br-none" 
                : "bg-gray-100 border border-gray-200 text-black rounded-bl-none"
            }`}>
              {msg.text}
            </div>
            <div className={`text-[10px] uppercase tracking-[0.1em] mt-1 px-2 ${
              msg.from === 'user' ? 'text-right' : 'text-left'
            } text-gray-600`}>
              {msg.from === 'user' ? 'You' : 'Visinity AI'}
            </div>
          </div>
        ))}
        
        {loading && (
          <div className="my-3 mr-auto max-w-xs md:max-w-md">
            <div className="p-3 rounded-lg text-sm rounded-bl-none bg-gray-100 border border-gray-200 text-black">
              <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 rounded-full animate-pulse bg-gray-400"></div>
                  <div className="w-2 h-2 rounded-full animate-pulse delay-150 bg-gray-400"></div>
                  <div className="w-2 h-2 rounded-full animate-pulse delay-300 bg-gray-400"></div>
                </div>
                <span className="text-gray-600">Thinking...</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Job Opportunities */}
      {opportunities.length > 0 && (
        <div className="mb-4 rounded-lg p-4 border bg-white border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-black">
              Found {opportunities.length} Mission{opportunities.length !== 1 ? 's' : ''}
            </h3>
            <span className="text-xs px-2 py-1 rounded-full bg-[#FF4F00]/10 text-[#FF4F00]">
              AI Recommended
            </span>
          </div>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {opportunities.map((job, idx) => (
              <div 
                key={idx} 
                className="p-3 rounded-lg border transition-all hover:scale-[1.01] bg-white border-gray-200 hover:border-[#FF4F00]/30"
              >
                <div className="flex justify-between items-start gap-3">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-black">
                      {job.jobTitle || job.title}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-gray-600">
                        {job.company || job.source}
                      </span>
                      {job.location && (
                        <>
                          <span className="text-xs text-gray-600">•</span>
                          <span className="text-xs text-gray-600">{job.location}</span>
                        </>
                      )}
                    </div>
                    {job.category && (
                      <div className="mt-2 text-xs px-2 py-1 rounded-full inline-block bg-[#FF4F00]/10 text-[#FF4F00]">
                        {job.category}
                      </div>
                    )}
                  </div>
                  <button
                    onClick={() => job.sourceLink && window.open(job.sourceLink, '_blank')}
                    className="group px-3 py-1.5 text-xs rounded-lg flex items-center gap-1 transition-all active:scale-95 bg-[#FF4F00] text-white hover:bg-[#FF4F00]/90"
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
            className="flex-1 p-3 rounded-lg text-sm text-black placeholder:text-gray-400 focus:border-[#FF4F00] focus:ring-1 focus:ring-[#FF4F00]/20 outline-none transition-all bg-white border border-gray-300"
            placeholder="Ask about missions, skills, or opportunities..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && !loading && sendMessage()}
            disabled={loading}
          />
          <button 
            onClick={sendMessage} 
            disabled={loading || !input.trim()}
            className={`group p-3 rounded-lg transition-all active:scale-95 shadow-md ${
              loading || !input.trim()
                ? "bg-[#FF4F00]/50 text-white/50 cursor-not-allowed"
                : "bg-[#FF4F00] text-white hover:bg-[#FF4F00]/90"
            }`}
          >
            <FiSend className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
        <p className="text-xs mt-2 text-center text-gray-600">
          Type your question and press Enter or click Send
        </p>
      </div>
    </div>
  );
}