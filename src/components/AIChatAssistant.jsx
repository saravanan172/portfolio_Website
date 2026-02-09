import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, User, Sparkles } from 'lucide-react';

const AIChatAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', content: "Hello! I am Saravanan AI. I'm here to assist you with professional inquiries about Saravanan's work in Java, AI, and MERN stack development. What would you like to know?" }
    ]);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const saravananInfo = {
        bio: "Saravanan is a dedicated Java and AI Developer with a Bachelor of Engineering in Electronics and Communication.",
        skills: "His core expertise includes Java (Spring Boot), AI/ML integration, and the MERN stack.",
        learningPlatforms: "LeetCode, HackerRank, HackerEarth, GeeksforGeeks, Stack Overflow, and SkillRack.",
        experience: "He specializes in building scalable backend architectures and intelligent software solutions.",
        education: "He holds a BE in Electronics and Communication Engineering.",
        certificates: "Java Full Stack, AI & Machine Learning (Stanford), Google Cloud Fundamentals, and Advanced Spring Boot Microservices.",
        contact: "You can reach him professionally through the contact form on this page or via his social links."
    };

    const getAIResponse = (query) => {
        const q = query.toLowerCase();

        // Privacy Guard
        const privateKeywords = ['address', 'phone', 'mobile', 'whatsapp', 'home', 'family', 'money', 'salary', 'private', 'personal'];
        if (privateKeywords.some(keyword => q.includes(keyword))) {
            return "I am designed to share only professional information about Saravanan. For personal or specific inquiries, please use the professional contact section.";
        }

        if (q.includes('skill') || q.includes('tech') || q.includes('stack')) return `Saravanan is highly proficient in ${saravananInfo.skills}.`;
        if (q.includes('experience') || q.includes('work')) return saravananInfo.experience;
        if (q.includes('education') || q.includes('degree') || q.includes('be') || q.includes('ece')) return saravananInfo.education;
        if (q.includes('contact') || q.includes('reach') || q.includes('email')) return saravananInfo.contact;
        if (q.includes('java') || q.includes('spring')) return "Java and Spring Boot are Saravanan's primary tools for architecting robust backend systems.";
        if (q.includes('ai') || q.includes('artificial')) return "Artificial Intelligence is a core focus for Saravanan, ranging from model integration to intelligent system design.";
        if (q.includes('certificat') || q.includes('award') || q.includes('course')) {
            return `Saravanan holds several key certifications, including ${saravananInfo.certificates} He is committed to staying at the forefront of technology.`;
        }
        if (q.includes('leetcode') || q.includes('hackerrank') || q.includes('hacker') || q.includes('solving') || q.includes('platform') || q.includes('practice')) {
            return `Saravanan actively hones his problem-solving skills on platforms like ${saravananInfo.learningPlatforms}. He is passionate about algorithmic challenges and continuous learning.`;
        }

        return "I'm Saravanan AI, specialized in sharing professional insights about his portfolio. How can I help you regarding his Java or AI projects?";
    };

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsTyping(true);

        setTimeout(() => {
            const assistantMessage = { role: 'assistant', content: getAIResponse(input) };
            setMessages(prev => [...prev, assistantMessage]);
            setIsTyping(false);
        }, 1000);
    };

    return (
        <div className="fixed bottom-6 right-6 z-[100]">
            {/* Floating Button */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="btn-primary w-14 h-14 !p-0 flex items-center justify-center shadow-2xl relative"
            >
                <AnimatePresence mode="wait">
                    {isOpen ? (
                        <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                            <X size={28} />
                        </motion.div>
                    ) : (
                        <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
                            <MessageSquare size={28} />
                        </motion.div>
                    )}
                </AnimatePresence>
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute inset-0 rounded-full bg-primary/50 -z-10"
                />
            </motion.button>

            {/* Chat Window */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 100, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 100, scale: 0.8 }}
                        className="absolute bottom-20 right-0 w-[350px] md:w-[400px] glass overflow-hidden rounded-3xl flex flex-col shadow-2xl border-white/10"
                    >
                        {/* Header */}
                        <div className="p-4 bg-gradient-to-r from-primary/20 to-secondary/20 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                    <Bot className="text-primary" size={24} />
                                </div>
                                <div>
                                    <h3 className="font-bold text-sm">Saravanan AI</h3>
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">Online</span>
                                    </div>
                                </div>
                            </div>
                            <Sparkles className="text-secondary" size={20} />
                        </div>

                        {/* Messages */}
                        <div
                            ref={scrollRef}
                            className="flex-1 h-[400px] overflow-y-auto p-4 space-y-4 scrollbar-hide"
                        >
                            {messages.map((m, i) => (
                                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${m.role === 'user'
                                        ? 'bg-primary text-white rounded-tr-none'
                                        : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none'
                                        }`}>
                                        {m.content}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white/5 border border-white/10 p-3 rounded-2xl rounded-tl-none">
                                        <div className="flex gap-1">
                                            <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                                            <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                            <div className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Input */}
                        <div className="p-4 border-t border-white/10 bg-white/5">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                                    placeholder="Ask me anything..."
                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 pr-12 outline-none focus:border-primary transition-colors text-sm"
                                />
                                <button
                                    onClick={handleSend}
                                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-primary hover:text-white transition-colors"
                                >
                                    <Send size={18} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AIChatAssistant;
