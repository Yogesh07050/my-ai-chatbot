'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, User, Bot, Sparkles, Languages, GraduationCap, Briefcase, Zap, Terminal } from 'lucide-react';
import { AI_PROFILE } from '@/lib/ai-profile';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: `Hello! I'm Yogesh's AI assistant. I can tell you all about his expertise in ${AI_PROFILE.skills.ml_ai[0]}, his projects like ${AI_PROFILE.projects[0].title}, or his background. What would you like to know?`,
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) throw new Error('Failed to get response');

      const reader = response.body?.getReader();
      const decoder = new TextEncoder();
      let assistantMessage = '';

      setMessages((prev) => [...prev, { role: 'assistant', content: '' }]);

      while (true) {
        const { done, value } = await reader!.read();
        if (done) break;

        const text = new TextDecoder().decode(value);
        assistantMessage += text;

        setMessages((prev) => {
          const newMessages = [...prev];
          newMessages[newMessages.length - 1].content = assistantMessage;
          return newMessages;
        });
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, I encountered an error. Please make sure the API key is configured.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col bg-[#0a0a0a] text-[#f2ebe4]">
      {/* Background Decor */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 noise" />
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-[#c5a059]/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[50%] h-[50%] bg-[#856b56]/5 rounded-full blur-[120px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-10 border-b border-white/5 bg-[#0a0a0a]/80 backdrop-blur-xl px-6 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#d4af37] to-[#856b56] flex items-center justify-center border border-white/10">
              <Bot size={20} className="text-[#0a0a0a]" />
            </div>
            <div>
              <h1 className="font-outfit font-bold text-lg tracking-tight">Yogesh AI</h1>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest text-[#8e8e8e] font-bold">Online & Ready</span>
              </div>
            </div>
          </div>
          <div className="hidden md:flex items-center gap-6 text-[10px] uppercase tracking-[0.2em] font-bold text-muted">
            <span className="flex items-center gap-1.5 hover:text-gold transition-colors cursor-default"><Zap size={12} /> Tech</span>
            <span className="flex items-center gap-1.5 hover:text-gold transition-colors cursor-default"><Terminal size={12} /> Projects</span>
          </div>
        </div>
      </header>

      {/* Chat Container */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <AnimatePresence mode="popLayout">
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border ${
                  message.role === 'user' 
                    ? 'bg-white/5 border-white/10' 
                    : 'bg-[#c5a059]/10 border-[#c5a059]/20'
                }`}>
                  {message.role === 'user' ? <User size={14} /> : <Sparkles size={14} className="text-[#d4af37]" />}
                </div>
                <div className={`max-w-[80%] space-y-2 ${message.role === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block px-5 py-3 rounded-2xl text-sm leading-relaxed ${
                    message.role === 'user'
                      ? 'bg-[#c5a059] text-[#0a0a0a] font-medium rounded-tr-none'
                      : 'glass-card rounded-tl-none text-[#f2ebe4]'
                  }`}>
                    {message.content || (<span className="flex gap-1 py-1"><span className="w-1.5 h-1.5 bg-gold/40 rounded-full animate-bounce" /><span className="w-1.5 h-1.5 bg-gold/40 rounded-full animate-bounce [animation-delay:0.2s]" /><span className="w-1.5 h-1.5 bg-gold/40 rounded-full animate-bounce [animation-delay:0.4s]" /></span>)}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Suggestions */}
      <div className="px-6 py-4">
        <div className="max-w-4xl mx-auto flex flex-wrap gap-2">
          {[
            { icon: <GraduationCap size={12}/>, text: "Tell me about your education" },
            { icon: <Briefcase size={12}/>, text: "What are your top projects?" },
            { icon: <Languages size={12}/>, text: "Do you know Tamil?" },
            { icon: <Terminal size={12}/>, text: "What technical skills do you have?" }
          ].map((suggest, i) => (
            <button
              key={i}
              onClick={() => setInput(suggest.text)}
              className="px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] text-[11px] font-medium text-muted hover:border-gold/30 hover:text-gold transition-all flex items-center gap-2"
            >
              {suggest.icon} {suggest.text}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <footer className="p-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="relative group">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything about Yogesh..."
              className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 pr-16 focus:outline-none focus:border-[#c5a059]/50 focus:ring-1 focus:ring-[#c5a059]/50 transition-all font-outfit"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 w-12 h-12 rounded-xl bg-[#c5a059] text-[#0a0a0a] flex items-center justify-center hover:bg-[#d4af37] disabled:opacity-50 disabled:hover:bg-[#c5a059] transition-all"
            >
              <Send size={20} />
            </button>
          </form>
          <p className="text-center text-[10px] text-muted mt-4 uppercase tracking-widest font-bold opacity-50">
            Powered by Grok-2 & AI/ML Expertise
          </p>
        </div>
      </footer>
    </main>
  );
}
