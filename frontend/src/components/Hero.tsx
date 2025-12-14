import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero({ onStart }: { onStart: (prompt: string) => void }) {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const prompt = (e.target as any).prompt.value;
        if (prompt) onStart(prompt);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-[40vh] text-center p-8">
            <h1 className="text-5xl font-bold mb-4 tracking-tight" style={{ color: 'var(--foreground)' }}>
                Validate Your Idea, <span className="opacity-80" style={{ color: 'var(--accent)' }}>Not Your Code.</span>
            </h1>
            <form onSubmit={handleSubmit} className="w-full max-w-2xl mt-8 flex gap-2">
                <input
                    name="prompt"
                    type="text"
                    placeholder="Describe your app (e.g. 'A kanban board for squirrels')"
                    className="flex-1 p-4 rounded-lg border border-[var(--border)] bg-[var(--card)] shadow-sm text-[var(--foreground)] focus:outline-none focus:ring-2 focus:ring-[var(--accent)]"
                />
                <button
                    type="submit"
                    className="text-white px-8 py-4 rounded-lg font-medium hover:opacity-90 transition-all flex items-center gap-2"
                    style={{ backgroundColor: 'var(--accent)' }}
                >
                    Build <ArrowRight size={20} />
                </button>
            </form>
        </div>
    );
}
