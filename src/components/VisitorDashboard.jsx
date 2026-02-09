import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    X,
    MapPin,
    Monitor,
    Clock,
    Globe,
    ShieldCheck,
    ShieldAlert,
    Trash2
} from 'lucide-react';

const VisitorDashboard = ({ isOpen, onClose }) => {
    const [logs, setLogs] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [passcode, setPasscode] = useState('');
    const [error, setError] = useState(false);

    // Use a simple passcode for now (owner can change this)
    const CORRECT_PASSCODE = '1721';

    useEffect(() => {
        if (isOpen) {
            const savedLogs = JSON.parse(localStorage.getItem('visitor_logs') || '[]');
            setLogs(savedLogs);
        }
    }, [isOpen]);

    const handleLogin = (e) => {
        e.preventDefault();
        if (passcode === CORRECT_PASSCODE) {
            setIsAuthenticated(true);
            setError(false);
        } else {
            setError(true);
            setTimeout(() => setError(false), 2000);
        }
    };

    const clearLogs = () => {
        if (window.confirm('Clear all visitor history?')) {
            localStorage.removeItem('visitor_logs');
            setLogs([]);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={onClose}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                className="relative w-full max-w-4xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl"
            >
                {/* Header */}
                <div className="p-6 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/20 rounded-lg">
                            <Users className="text-primary" size={24} />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">Visitor Analytics</h2>
                            <p className="text-xs text-slate-400">Personal & Secure Profile Viewer</p>
                        </div>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                    {!isAuthenticated ? (
                        <div className="py-12 flex flex-col items-center justify-center text-center">
                            <div className={`p-4 rounded-full mb-6 transition-colors ${error ? 'bg-red-500/20' : 'bg-primary/20'}`}>
                                {error ? <ShieldAlert className="text-red-500" size={40} /> : <ShieldCheck className="text-primary" size={40} />}
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Access Restricted</h3>
                            <p className="text-slate-400 mb-8 max-w-xs text-sm">
                                This area is visible only to you. Please enter your secret passcode to continue.
                            </p>

                            <form onSubmit={handleLogin} className="w-full max-w-xs space-y-4">
                                <input
                                    type="password"
                                    placeholder="Enter Passcode"
                                    value={passcode}
                                    onChange={(e) => setPasscode(e.target.value)}
                                    className={`w-full bg-white/5 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 outline-none focus:border-primary transition-all text-center tracking-widest`}
                                />
                                <button
                                    type="submit"
                                    className="w-full btn-primary"
                                >
                                    Verify Access
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="flex justify-between items-center mb-6">
                                <p className="text-slate-400 text-sm">Showing last {logs.length} visitor profiles</p>
                                <button
                                    onClick={clearLogs}
                                    className="flex items-center gap-2 text-xs text-red-400 hover:text-red-300 transition-colors"
                                >
                                    <Trash2 size={14} /> Clear Logs
                                </button>
                            </div>

                            {logs.length === 0 ? (
                                <div className="text-center py-12 text-slate-500">
                                    No visitors tracked yet.
                                </div>
                            ) : (
                                <div className="grid gap-4">
                                    {logs.map((log, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="glass p-4 rounded-2xl border-white/5 hover:border-white/20 transition-all group"
                                        >
                                            <div className="flex flex-wrap justify-between gap-4">
                                                <div className="flex items-start gap-3">
                                                    <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                                                        <Globe size={18} />
                                                    </div>
                                                    <div>
                                                        <p className="font-mono font-bold text-blue-400">{log.ip}</p>
                                                        <p className="text-[10px] text-slate-500 truncate max-w-[200px]">{log.userAgent}</p>
                                                    </div>
                                                </div>

                                                <div className="flex gap-6">
                                                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                                                        <Clock size={14} className="text-primary" />
                                                        {new Date(log.timestamp).toLocaleString()}
                                                    </div>
                                                    <div className="flex items-center gap-2 text-slate-400 text-xs">
                                                        <Monitor size={14} className="text-secondary" />
                                                        {log.screenResolution}
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default VisitorDashboard;
