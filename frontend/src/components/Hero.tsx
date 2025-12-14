import React from 'react';
import { ArrowRight, Sparkles, Zap } from 'lucide-react';

export default function Hero({ onStart }: { onStart: (prompt: string) => void }) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const prompt = (e.target as any).prompt.value;
        if (prompt) onStart(prompt);
    };

    return (
        <div className="relative">
            {/* Hero Section */}
            <div className="flex flex-col items-center justify-center min-h-[50vh] text-center p-8 relative">
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
                <div className="absolute top-0 right-1/4 w-72 h-72 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>

                <div className="relative z-10">
                    {/* Powered by Cline Badge */}
                    <div className="inline-flex items-center gap-2 bg-white/95 backdrop-blur-sm px-6 py-3 rounded-full mb-6 shadow-lg border border-orange-200">
                        <Zap size={18} className="text-orange-500" fill="#FF6B35" />
                        <span className="text-sm font-bold text-gray-700">Powered by</span>
                        <a
                            href="https://cline.bot"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-bold text-orange-600 hover:text-orange-700 transition-colors"
                        >
                            Cline AI
                        </a>
                    </div>

                    <div className="flex items-center justify-center mb-4">
                        <Sparkles className="text-white animate-pulse" size={40} />
                    </div>
                    <h1 className="text-6xl md:text-7xl font-extrabold mb-6 tracking-tight">
                        <span className="text-white">Validate Your Idea,</span>
                        <br />
                        <span className="text-white drop-shadow-lg">Not Your Code.</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-white/95 mb-4 max-w-2xl mx-auto font-medium">
                        Describe it. Watch Cline build it. Ship it. All in seconds.
                    </p>
                    <p className="text-md text-white/80 mb-8 max-w-xl mx-auto">
                        Cline's autonomous AI coding agent writes production-ready apps from just a description.
                    </p>

                    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto mt-12">
                        <div className="glass-card p-2 rounded-2xl shadow-2xl glow">
                            <div className="flex gap-3">
                                <input
                                    name="prompt"
                                    type="text"
                                    placeholder="Describe your app (e.g., 'A minimalist todo app with tags')"
                                    className="flex-1 px-6 py-5 bg-transparent text-gray-800 placeholder-gray-500 focus:outline-none text-lg font-medium"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-5 rounded-xl font-bold text-lg flex items-center gap-3 hover-lift shadow-xl"
                                >
                                    Build <ArrowRight size={24} />
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

            {/* Cline Features Callout */}
            <div className="max-w-6xl mx-auto px-8 py-12 mb-8">
                <div className="glass-card rounded-3xl p-8 border-2 border-orange-200">
                    <div className="text-center mb-6">
                        <h3 className="text-2xl font-bold text-gray-800 mb-2">
                            Why Cline?
                        </h3>
                        <p className="text-gray-600">The autonomous AI coding assistant that thinks like a developer</p>
                    </div>
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <h4 className="font-bold text-gray-800 mb-1">Plans First</h4>
                            <p className="text-sm text-gray-600">Thinks through architecture before coding</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-cyan-400 to-cyan-600 rounded-2xl flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <h4 className="font-bold text-gray-800 mb-1">Executes Fast</h4>
                            <p className="text-sm text-gray-600">Autonomous coding with real-time progress</p>
                        </div>
                        <div className="text-center">
                            <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-green-400 to-emerald-600 rounded-2xl flex items-center justify-center">
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <h4 className="font-bold text-gray-800 mb-1">Production Ready</h4>
                            <p className="text-sm text-gray-600">Clean, tested, modern code every time</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* How to Use Section */}
            <div className="max-w-6xl mx-auto px-8 py-16">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        How It Works
                    </h2>
                    <p className="text-xl text-white/90">
                        Cline does the heavy lifting
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {/* Step 1 */}
                    <div className="step-card glass-card rounded-3xl p-8 hover-lift">
                        <div className="step-number w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg">
                            1
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">You Describe</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Tell Cline what you want. Features, design, functionality - be as specific as you like.
                        </p>
                    </div>

                    {/* Step 2 */}
                    <div className="step-card glass-card rounded-3xl p-8 hover-lift" style={{ animationDelay: '0.1s' }}>
                        <div className="step-number w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg">
                            2
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">Cline Builds</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Watch Cline plan, code, and test your app autonomously. See every decision in real-time.
                        </p>
                    </div>

                    {/* Step 3 */}
                    <div className="step-card glass-card rounded-3xl p-8 hover-lift" style={{ animationDelay: '0.2s' }}>
                        <div className="step-number w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold mb-6 shadow-lg">
                            3
                        </div>
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">You Ship</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Preview instantly. Download source code. Deploy anywhere. Full ownership.
                        </p>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div className="max-w-6xl mx-auto px-8 py-16">
                <div className="grid md:grid-cols-2 gap-6">
                    <div className="feature-card glass-card rounded-2xl p-6 flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 text-lg mb-2">Instant Results</h4>
                            <p className="text-gray-600">Cline turns ideas into apps in under a minute.</p>
                        </div>
                    </div>

                    <div className="feature-card glass-card rounded-2xl p-6 flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 text-lg mb-2">100% Isolated</h4>
                            <p className="text-gray-600">Each build runs in a secure Docker container.</p>
                        </div>
                    </div>

                    <div className="feature-card glass-card rounded-2xl p-6 flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-emerald-600 flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 text-lg mb-2">Modern Stack</h4>
                            <p className="text-gray-600">React, Vite, and best practices baked in.</p>
                        </div>
                    </div>

                    <div className="feature-card glass-card rounded-2xl p-6 flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-400 to-amber-600 flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-800 text-lg mb-2">Your Code</h4>
                            <p className="text-gray-600">Full source control. Own it, modify it, build on it.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
