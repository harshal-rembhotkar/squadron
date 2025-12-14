import React, { useState, useEffect } from 'react';
import { History } from 'lucide-react';

export default function HistorySidebar() {
    const [history, setHistory] = useState<{ id: string, prompt: string, date: string }[]>([]);

    useEffect(() => {
        // Initial load
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

        // Listen for custom event or storage event
        const handleUpdate = () => loadHistory();
        window.addEventListener('mission_history_update', handleUpdate);
        return () => window.removeEventListener('mission_history_update', handleUpdate);
    }, []);

    return (
        <div className="w-64 border-r hidden md:flex flex-col h-screen overflow-hidden sticky top-0"
            style={{ borderColor: 'var(--border)', backgroundColor: 'var(--card)' }}>
            <div className="p-4 border-b flex items-center gap-2" style={{ borderColor: 'var(--border)' }}>
                <History size={16} className="text-gray-500" />
                <span className="font-medium text-sm" style={{ color: 'var(--foreground)' }}>Mission History</span>
            </div>
            <div className="flex-1 overflow-y-auto">
                {history.slice().reverse().map((item) => (
                    <div key={item.id} className="p-3 border-b cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: 'var(--border)' }}>
                        <div className="font-medium text-sm truncate" style={{ color: 'var(--foreground)' }}>{item.prompt}</div>
                        <div className="text-xs text-gray-400 mt-1">{new Date(item.date).toLocaleString()}</div>
                    </div>
                ))}
                {history.length === 0 && (
                    <div className="p-4 text-xs text-gray-400 text-center">No previous missions.</div>
                )}
            </div>
        </div>
    );
}
