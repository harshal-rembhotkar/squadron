import React, { useState, useEffect } from 'react';
import { History, Clock, Trash2 } from 'lucide-react';

export default function HistorySidebar() {
    const [history, setHistory] = useState<{ id: string, prompt: string, date: string }[]>([]);

    useEffect(() => {
        const loadHistory = () => {
            const saved = localStorage.getItem('mission_history');
            if (saved) {
                try {
                    setHistory(JSON.parse(saved));
                } catch (e) {
                    console.error("Failed to parse history", e);
                }
            }
        };

        loadHistory();

        const handleUpdate = () => loadHistory();
        window.addEventListener('mission_history_update', handleUpdate);
        return () => window.removeEventListener('mission_history_update', handleUpdate);
    }, []);

    const clearHistory = () => {
        localStorage.removeItem('mission_history');
        setHistory([]);
    };

    return (
        <div className="w-80 glass-card border-r border-orange-100 hidden md:flex flex-col h-screen overflow-hidden sticky top-0 shadow-2xl">
            <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-6">
                <div className="flex items-center gap-3 mb-2">
                    <History size={24} className="text-white" />
                    <span className="font-bold text-white text-lg">History</span>
                </div>
                <p className="text-white/90 text-sm">Your previous builds</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {history.slice().reverse().map((item, index) => (
                    <div
                        key={item.id}
                        className="glass-card rounded-xl p-4 hover-lift cursor-pointer group transition-all border border-orange-100"
                    >
                        <div className="flex items-start gap-3">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                                {history.length - index}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-800 text-sm truncate mb-2 group-hover:text-orange-600 transition-colors">
                                    {item.prompt}
                                </p>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                    <Clock size={12} />
                                    <span>{new Date(item.date).toLocaleDateString()}</span>
                                    <span>•</span>
                                    <span>{new Date(item.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                {history.length === 0 && (
                    <div className="text-center py-12">
                        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-full flex items-center justify-center">
                            <History size={32} className="text-orange-500" />
                        </div>
                        <p className="text-sm text-gray-600 font-medium">No builds yet</p>
                        <p className="text-xs text-gray-500 mt-1">Start creating</p>
                    </div>
                )}
            </div>

            {history.length > 0 && (
                <div className="p-4 border-t border-orange-100">
                    <button
                        onClick={clearHistory}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl font-medium text-sm transition-colors"
                    >
                        <Trash2 size={16} />
                        Clear
                    </button>
                </div>
            )}
        </div>
    );
}
