import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot } from 'lucide-react';
import { getAIConsultation } from '../geminiService';

const AIConsultant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  // Initial state
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>([
    { role: 'ai', text: "Hello. I am VinKand's AI Technical Advisor. I can answer questions about our services, case studies, or engagement models. How can I help?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  useEffect(() => scrollToBottom(), [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = input;
    setInput('');
    setLoading(true);

    // 1. Add User Message to UI immediately
    const newHistory = [...messages, { role: 'user' as const, text: userMsg }];
    setMessages(newHistory);

    try {
      // 2. Send the User Message AND the History to the API
      // We pass 'messages' (the history before the new user msg) so the bot knows context
      const aiResponseText = await getAIConsultation(userMsg, messages);
      
      // 3. Add AI Response to UI
      setMessages(prev => [...prev, { role: 'ai', text: aiResponseText || "I apologize, I could not process that request." }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'ai', text: "Connection error. Please try again later." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {isOpen ? (
        <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-[90vw] md:w-96 overflow-hidden flex flex-col h-[500px] animate-fade-in-up">
          {/* Header */}
          <div className="bg-slate-900 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-1.5 rounded-lg">
                 <Bot size={20} className="text-white" />
              </div>
              <div>
                <div className="font-bold text-sm">VinKand Intelligence</div>
                <div className="text-[10px] text-slate-400 uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span> Online
                </div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors"><X size={20} /></button>
          </div>
          
          {/* Chat Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 scrollbar-hide">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                {m.role === 'ai' && (
                  <div className="w-6 h-6 rounded-full bg-slate-900 text-blue-500 flex items-center justify-center mr-2 flex-shrink-0 mt-2">
                    <Bot size={14} />
                  </div>
                )}
                <div className={`max-w-[85%] p-3.5 rounded-2xl text-sm leading-relaxed shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none' 
                    : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                 <div className="w-6 h-6 rounded-full bg-slate-900 text-blue-500 flex items-center justify-center mr-2 flex-shrink-0">
                    <Bot size={14} />
                 </div>
                 <div className="bg-white border border-slate-200 px-4 py-3 rounded-2xl rounded-bl-none shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce delay-200"></div>
                    </div>
                 </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 border-t border-slate-100 bg-white">
            <div className="relative flex items-center">
              <input 
                type="text" 
                value={input} 
                onChange={(e) => setInput(e.target.value)} 
                onKeyDown={(e) => e.key === 'Enter' && handleSend()} 
                placeholder="Ask about our services..." 
                className="w-full bg-slate-100 border-none rounded-full pl-5 pr-12 py-3.5 text-sm text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" 
              />
              <button 
                onClick={handleSend} 
                disabled={!input.trim() || loading}
                className="absolute right-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600 transition-colors shadow-sm"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)} 
          className="group flex items-center justify-center md:justify-start gap-0 md:gap-3 bg-transparent md:bg-slate-900 text-white w-14 h-14 md:w-auto md:h-auto md:pl-5 md:pr-2 md:py-2 rounded-full shadow-none md:shadow-2xl hover:-translate-y-1 transition-all duration-300 border-none md:border md:border-slate-700"
        >
          <span className="font-bold text-sm hidden md:block whitespace-nowrap">Ask AI CTO</span>
          <div className="w-14 h-14 md:w-10 md:h-10 bg-blue-600 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-2xl md:shadow-none">
            <MessageSquare size={20} fill="currentColor" />
          </div>
        </button>
      )}
    </div>
  );
};

export default AIConsultant;