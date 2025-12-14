import React, { useEffect, useRef } from 'react';
import { Terminal } from 'lucide-react';

export default function Cockpit({ logs, previewPort }: { logs: string[], previewPort: string | null }) {
    const logEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [logs]);

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 h-[60vh] p-4">
            {/* Terminal */}
            <div className="rounded-lg border flex flex-col overflow-hidden shadow-lg"
                style={{ backgroundColor: 'var(--cockpit-bg)', borderColor: 'var(--border)' }}>
                <div className="bg-black/30 p-2 border-b border-white/10 flex items-center gap-2 px-4">
                    <Terminal size={16} style={{ color: 'var(--cockpit-text)' }} />
                    <span className="text-xs font-mono uppercase" style={{ color: 'var(--cockpit-text)' }}>Mission Log</span>
                </div>
                <div className="flex-1 overflow-y-auto p-4 font-mono text-xs md:text-sm space-y-1">
                    {logs.map((log, i) => (
                        <div key={i} className="whitespace-pre-wrap break-all" style={{ color: 'var(--cockpit-text)' }}>{log}</div>
                    ))}
                    <div ref={logEndRef} />
                </div>
            </div>

            {/* Preview */}
            <div className="rounded-lg border flex flex-col overflow-hidden shadow-lg relative"
                style={{ backgroundColor: 'var(--card)', borderColor: 'var(--border)' }}>
                <div className="bg-gray-50 p-2 border-b flex items-center justify-between px-4"
                    style={{ borderColor: 'var(--border)' }}>
                    <span className="text-xs font-medium text-gray-500 uppercase">Live Preview</span>
                    {previewPort && (
                        <a href={`http://localhost:${previewPort}`} target="_blank" rel="noopener noreferrer"
                            className="text-xs hover:underline" style={{ color: 'var(--accent)' }}>
                            Open in New Tab
                        </a>
                    )}
                </div>
                <div className="flex-1 bg-white relative">
                    {previewPort ? (
                        <iframe
                            src={`http://localhost:${previewPort}`}
                            className="w-full h-full border-0"
                            title="App Preview"
                        />
                    ) : (
                        <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                            Waiting for deployment...
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
