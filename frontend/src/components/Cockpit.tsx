import React, { useEffect, useRef } from 'react';
import { Terminal, ExternalLink } from 'lucide-react';

export default function Cockpit({ logs, previewPort }: { logs: string[], previewPort: string | null }) {
    const logEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        logEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [logs]);

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-white mb-2">Mission Cockpit</h2>
                <p className="text-white/90">Cline is building your app right now</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-7xl mx-auto">
                {/* Terminal */}
                <div className="glass-card rounded-3xl overflow-hidden shadow-2xl hover-lift">
                    <div className="bg-gradient-to-r from-slate-800 to-slate-900 p-4 border-b border-slate-700 flex items-center gap-3">
                        <Terminal size={20} className="text-cyan-400" />
                        <span className="text-sm font-bold text-white uppercase tracking-wider">Build Log</span>
                        <div className="ml-auto flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                        </div>
                    </div>
                    <div className="bg-slate-900 h-[500px] overflow-y-auto p-6 font-mono text-sm">
                        {logs.length === 0 ? (
                            <div className="flex items-center justify-center h-full text-slate-500">
                                <div className="text-center">
                                    <Terminal size={48} className="mx-auto mb-4 opacity-50" />
                                    <p>Waiting for mission logs...</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                {logs.map((log, i) => (
                                    <div key={i} className="mb-1 text-cyan-400 whitespace-pre-wrap break-all leading-relaxed">
                                        <span className="text-slate-600 mr-2">›</span>{log}
                                    </div>
                                ))}
                                <div ref={logEndRef} />
                            </>
                        )}
                    </div>
                </div>

                {/* Preview */}
                <div className="glass-card rounded-3xl overflow-hidden shadow-2xl hover-lift">
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-4 border-b border-orange-400 flex items-center justify-between">
                        <span className="text-sm font-bold text-white uppercase tracking-wider">Live Preview</span>
                        {previewPort && (
                            <a
                                href={`http://localhost:${previewPort}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium transition-colors"
                            >
                                <ExternalLink size={16} />
                                Open
                            </a>
                        )}
                    </div>
                    <div className="bg-white h-[500px] relative">
                        {previewPort ? (
                            <iframe
                                src={`http://localhost:${previewPort}`}
                                className="w-full h-full border-0"
                                title="App Preview"
                            />
                        ) : (
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-50 to-yellow-50">
                                <div className="text-center">
                                    <div className="w-24 h-24 mx-auto mb-6 relative">
                                        <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full animate-ping opacity-20"></div>
                                        <div className="relative w-24 h-24 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                                            <svg className="w-12 h-12 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                            </svg>
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Cline is Coding...</h3>
                                    <p className="text-gray-600">Your app will appear here shortly</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Status Bar */}
            <div className="glass-card rounded-2xl p-4 max-w-7xl mx-auto">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-3 h-3 rounded-full bg-cyan-500 animate-pulse"></div>
                        <span className="text-sm font-medium text-gray-800">Squadron Active</span>
                    </div>
                    {previewPort && (
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-600">Port:</span>
                            <code className="px-3 py-1 bg-orange-100 rounded-lg text-sm font-mono text-orange-700">{previewPort}</code>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
