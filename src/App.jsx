import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Terminal,
  Cpu,
  Code2,
  Database,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ChevronDown,
  Menu,
  X,
  Server,
  Layers,
  BrainCircuit,
  Award
} from 'lucide-react';
import AIChatAssistant from './components/AIChatAssistant';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${isScrolled ? 'glass py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-2xl font-display font-bold text-gradient"
        >
          SARAVANAN
        </motion.div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              href={link.href}
              className="text-slate-300 hover:text-white transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
        </div>

        {/* Mobile Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass"
          >
            <div className="flex flex-col p-6 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-slate-300"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      {/* Background Blobs */}
      <div className="absolute top-1/4 -left-20 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 -right-20 w-72 h-72 bg-secondary/20 rounded-full blur-[100px] animate-pulse" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-primary font-semibold mb-4 flex items-center gap-2"
          >
            <Terminal size={18} /> Hello, I am
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-bold mb-6"
          >
            Saravanan <br />
            <span className="text-gradient">Java & AI Developer</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-slate-400 mb-10 max-w-2xl"
          >
            Expert in building high-performance Java applications, intelligent AI models, and full-stack MERN solutions. Specialized in Spring Boot and ECE background.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#contact" className="btn-primary">Get In Touch</a>
            <a href="#projects" className="btn-outline">View Projects</a>
          </motion.div>
        </div>
      </div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500"
      >
        <ChevronDown size={32} />
      </motion.div>
    </section>
  );
};

const Skills = () => {
  const skillGroups = [
    {
      title: "Backend",
      icon: <Server className="text-primary" />,
      skills: ["Java", "Spring Boot", "Microservices", "Node.js"]
    },
    {
      title: "AI & Intelligence",
      icon: <BrainCircuit className="text-secondary" />,
      skills: ["Machine Learning", "Neural Networks", "NLP", "Python"]
    },
    {
      title: "Frontend",
      icon: <Layers className="text-blue-400" />,
      skills: ["React.js", "Tailwind CSS", "Redux", "Framer Motion"]
    },
    {
      title: "Databases",
      icon: <Database className="text-emerald-400" />,
      skills: ["MongoDB", "PostgreSQL", "MySQL", "Redis"]
    },
    {
      title: "Problem Solving",
      icon: <Terminal className="text-amber-400" />,
      skills: ["LeetCode", "HackerRank", "GeeksforGeeks", "SkillRack"]
    }
  ];

  return (
    <section id="skills" className="py-24 bg-slate-900/50">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-16 text-center">
          Core <span className="text-gradient">Expertise</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skillGroups.map((group, i) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass p-8 rounded-2xl hover:bg-white/15 transition-all group"
            >
              <div className="mb-6 p-4 rounded-xl bg-white/5 w-fit group-hover:scale-110 transition-transform">
                {group.icon}
              </div>
              <h3 className="text-xl font-bold mb-4">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-white/5 rounded-full text-sm text-slate-300">
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Intelligent Supply Chain",
      desc: "AI-driven demand forecasting and inventory management system built with Java Spring Boot and TensorFlow.",
      tech: ["Java", "Spring Boot", "Python", "React"],
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "MERN Health Tracker",
      desc: "Comprehensive health monitoring dashboard with real-time data visualization and personalized AI insights.",
      tech: ["MongoDB", "Express", "React", "Node.js"],
      image: "https://images.unsplash.com/photo-1504868584819-f8e90526354a?auto=format&fit=crop&q=80&w=800"
    },
    {
      title: "AI Financial Analyser",
      desc: "Real-time market sentiment analysis tool using deep learning to predict stock trends and financial news impact.",
      tech: ["Python", "Java", "React", "TensorFlow"],
      image: "https://images.unsplash.com/photo-1611974717482-58a2543e5227?auto=format&fit=crop&q=80&w=800"
    }
  ];

  return (
    <section id="projects" className="py-24">
      <div className="container mx-auto px-6">
        <div className="flex justify-between items-end mb-16">
          <div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
              Featured <span className="text-gradient">Projects</span>
            </h2>
            <p className="text-slate-400">Selected works that showcase my technical capabilities.</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group relative overflow-hidden rounded-3xl"
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-[400px] object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/40 to-transparent opacity-90" />
              <div className="absolute bottom-0 p-8 w-full">
                <div className="flex gap-2 mb-4">
                  {project.tech.map(t => (
                    <span key={t} className="text-xs font-semibold px-2 py-1 bg-primary/20 text-primary rounded backdrop-blur-sm">
                      {t}
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <p className="text-slate-300 text-sm mb-6 line-clamp-2">{project.desc}</p>
                <div className="flex gap-4">
                  <a href="#" className="flex items-center gap-2 text-white font-semibold hover:text-primary transition-colors text-sm">
                    Demo <ExternalLink size={14} />
                  </a>
                  <a href="#" className="flex items-center gap-2 text-white font-semibold hover:text-primary transition-colors text-sm">
                    Code <Github size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Certificates = () => {
  const certificates = [
    {
      title: "Java Full Stack Development",
      issuer: "Udemy Professional",
      date: "2024",
      icon: <Code2 className="text-primary" />
    },
    {
      title: "AI & Machine Learning Specialization",
      issuer: "Coursera / Stanford",
      date: "2023",
      icon: <BrainCircuit className="text-secondary" />
    },
    {
      title: "Google Cloud Fundamentals",
      issuer: "Google Cloud Training",
      date: "2023",
      icon: <Server className="text-blue-400" />
    },
    {
      title: "Advanced Spring Boot Microservices",
      issuer: "Oracle Academy",
      date: "2022",
      icon: <Cpu className="text-amber-400" />
    },
    {
      title: "Mastering MERN Stack",
      issuer: "MongoDB University",
      date: "2022",
      icon: <Database className="text-emerald-400" />
    }
  ];

  return (
    <section id="certificates" className="py-24 bg-slate-900/30">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Award className="text-primary" size={32} />
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
            Professional <span className="text-gradient">Certifications</span>
          </h2>
          <p className="text-slate-400">Validated expertise through industry-leading platforms.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="glass p-6 rounded-2xl flex items-start gap-4 hover:bg-white/10 transition-all border-white/5"
            >
              <div className="p-3 rounded-xl bg-white/5">
                {cert.icon}
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">{cert.title}</h3>
                <p className="text-sm text-slate-400 mb-2">{cert.issuer}</p>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary px-2 py-0.5 bg-primary/10 rounded">
                  {cert.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      e.target.reset();
    }, 1500);
  };
  return (
    <section id="contact" className="py-24 bg-slate-900/50">
      <div className="container mx-auto px-6 max-w-4xl text-center">
        <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">
          Let's Build Something <span className="text-gradient">Great</span>
        </h2>
        <p className="text-slate-400 mb-12 text-lg">
          I'm always open to discussing new projects, creative ideas or opportunities to be part of your visions.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <a href="mailto:contact@saravanan.dev" className="glass p-6 rounded-2xl flex flex-col items-center gap-4 hover:bg-white/15 transition-all">
            <Mail className="text-primary" size={32} />
            <span className="font-semibold text-slate-300">Email Me</span>
          </a>
          <a href="#" className="glass p-6 rounded-2xl flex flex-col items-center gap-4 hover:bg-white/15 transition-all">
            <Linkedin className="text-primary" size={32} />
            <span className="font-semibold text-slate-300">LinkedIn</span>
          </a>
          <a href="#" className="glass p-6 rounded-2xl flex flex-col items-center gap-4 hover:bg-white/15 transition-all">
            <Github className="text-primary" size={32} />
            <span className="font-semibold text-slate-300">GitHub</span>
          </a>
        </div>

        <div className="glass p-8 md:p-12 rounded-3xl text-left relative overflow-hidden">
          <AnimatePresence mode="wait">
            {status === 'sent' ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-10"
              >
                <div className="w-20 h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="text-secondary" size={40} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-slate-400 mb-8">Thank you for reaching out. I'll get back to you soon.</p>
                <button
                  onClick={() => setStatus('')}
                  className="btn-outline"
                >
                  Send Another
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-400">Name</label>
                  <input required type="text" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-400">Email</label>
                  <input required type="email" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-sm font-semibold text-slate-400">Message</label>
                  <textarea required rows="4" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none focus:border-primary transition-colors"></textarea>
                </div>
                <button
                  disabled={status === 'sending'}
                  className="btn-primary md:w-fit disabled:opacity-50 flex items-center gap-2"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <div id="about">
        <section className="py-24 overflow-hidden">
          <div className="container mx-auto px-6">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="aspect-square rounded-3xl overflow-hidden glass">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 animate-gradient-x" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Code2 size={120} className="text-white/20" />
                  </div>
                </div>
                <div className="absolute -bottom-6 -right-6 glass p-8 rounded-2xl">
                  <p className="text-4xl font-bold text-primary">BE</p>
                  <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest">Electronics & Comm.</p>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-5xl font-display font-bold mb-8">
                  Engineering <span className="text-gradient">Excellence</span>
                </h2>
                <div className="space-y-6 text-slate-300 text-lg">
                  <p>
                    I am a versatile developer with a solid foundation in Electronics and Communication Engineering, which provides me with a deep understanding of system architectures and hardware-software integration.
                  </p>
                  <p>
                    My passion lies at the intersection of robust backend systems (Java/Spring Boot) and cutting-edge Artificial Intelligence. Whether it's architecting microservices or training intelligent models, I focus on building products that are scalable, efficient, and user-centric.
                  </p>
                  <div className="flex gap-12 pt-4">
                    <div>
                      <h4 className="text-2xl font-bold text-white">Full</h4>
                      <p className="text-sm text-slate-400">Stack Expert</p>
                    </div>
                    <div>
                      <h4 className="text-2xl font-bold text-white">AI</h4>
                      <p className="text-sm text-slate-400">Pioneer</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
      <Skills />
      <Certificates />
      <Projects />
      <Contact />

      <footer className="py-12 border-t border-white/5 text-center text-slate-500">
        <div className="container mx-auto px-6">
          <p>© 2026 Saravanan. Built with React & Tailwind.</p>
        </div>
      </footer>
      <AIChatAssistant />
    </div>
  );
}

export default App;
