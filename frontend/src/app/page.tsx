'use client';

import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import Hero from '../components/Hero';
import Cockpit from '../components/Cockpit';
import HistorySidebar from '../components/HistorySidebar';
import { Rocket, Zap } from 'lucide-react';

export default function Home() {
  const [missionId, setMissionId] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [previewPort, setPreviewPort] = useState<string | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const startMission = async (userPrompt: string) => {
    setLogs(['🚀 Initializing mission...', `🎯 ${userPrompt}`, '⚡ Starting Cline...']);
    setMissionId('pending');

    try {
      const res = await fetch('http://localhost:3001/mission', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userPrompt })
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || 'Failed to start mission');
      }

      const data = await res.json();
      setMissionId(data.missionId);
      setPreviewPort(data.port);

      // Save to history
      const historyItem = { id: data.missionId, prompt: userPrompt, date: new Date().toISOString() };
      const saved = localStorage.getItem('mission_history');
      const history = saved ? JSON.parse(saved) : [];
      history.push(historyItem);
      localStorage.setItem('mission_history', JSON.stringify(history));
      window.dispatchEvent(new Event('mission_history_update'));

      // Connect socket
      if (socketRef.current) socketRef.current.disconnect();

      socketRef.current = io('http://localhost:3001');
      socketRef.current.emit('join-mission', data.missionId);

      socketRef.current.on('log', (msg: string) => {
        setLogs(prev => [...prev.slice(-999), msg]);
      });

      socketRef.current.on('status', (msg: string) => {
        setLogs(prev => [...prev, `✨ ${msg}`]);
      });

    } catch (err: any) {
      setLogs(prev => [...prev, `❌ ERROR: ${err.message}`]);
      if (missionId === 'pending') setMissionId(null);
    }
  };

  const resetMission = () => {
    setMissionId(null);
    setLogs([]);
    setPreviewPort(null);
    if (socketRef.current) socketRef.current.disconnect();
  };

  return (
    <div className="flex min-h-screen">
      <HistorySidebar />
      <main className="flex-1 flex flex-col relative w-full overflow-auto">
        {/* Header */}
        <header className="glass-card border-b border-orange-100 sticky top-0 z-10 shadow-lg">
          <div className="p-6 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center shadow-lg">
                <Rocket className="text-white" size={24} />
              </div>
              <div>
                <h1 className="font-extrabold text-2xl gradient-text">Squadron</h1>
                <p className="text-xs text-gray-600">Powered by Cline</p>
              </div>
            </div>
            {missionId && (
              <button
                onClick={resetMission}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white rounded-xl font-bold text-sm hover-lift shadow-lg transition-all"
              >
                <Zap size={16} />
                New Build
              </button>
            )}
          </div>
        </header>

        <div className="flex-1">
          {!missionId ? (
            <Hero onStart={startMission} />
          ) : (
            <Cockpit logs={logs} previewPort={previewPort} />
          )}
        </div>

        {/* Footer */}
        <footer className="glass-card border-t border-orange-100 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
                </svg>
                <div className="text-left">
                  <div className="text-sm font-bold text-gray-800">Built using Cline</div>
                  <div className="text-xs text-gray-600">Autonomous AI coding assistant</div>
                </div>
              </div>
              <div className="flex gap-4">
                <a
                  href="https://cline.bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-orange-600 hover:text-orange-700 transition-colors"
                >
                  Try Cline →
                </a>
                <a
                  href="https://github.com/cline/cline"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
