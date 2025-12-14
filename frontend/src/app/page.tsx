'use client';

import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import Hero from '../components/Hero';
import Cockpit from '../components/Cockpit';
import HistorySidebar from '../components/HistorySidebar';

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
    setLogs(['Initializing Squadron details...', `Target: ${userPrompt}`]);
    setMissionId('pending'); // Temporary state

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
        // Strip ANSI codes if needed, but simple pure text for now
        // React handles basic text fine, but ANSI might look like garbage.
        // We will assume backend sends raw text or we clean it.
        // For 'squadron' aesthetic, raw text is kind of okay if simple, but better clean.
        // I'll leave as is for "Hacker" aesthetic, or use a library later.
        setLogs(prev => [...prev.slice(-999), msg]);
      });

      socketRef.current.on('status', (msg: string) => {
        setLogs(prev => [...prev, `[STATUS] ${msg}`]);
      });

    } catch (err: any) {
      setLogs(prev => [...prev, `[ERROR] ${err.message}`]);
      // Keep missionId as pending or set to error state? 
      // If failed, maybe reset?
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
    <div className="flex min-h-screen bg-[var(--background)] font-sans text-[var(--foreground)]">
      <HistorySidebar />
      <main className="flex-1 flex flex-col relative w-full">
        <header className="p-4 border-b bg-[var(--card)] flex justify-between items-center sticky top-0 z-10"
          style={{ borderColor: 'var(--border)' }}>
          <div className="font-bold text-xl tracking-tighter" style={{ color: 'var(--accent)' }}>Squadron</div>
          {missionId && (
            <button onClick={resetMission}
              className="text-xs px-3 py-1 rounded border hover:bg-gray-50 transition-colors"
              style={{ borderColor: 'var(--border)', color: 'var(--foreground)' }}>
              New Mission
            </button>
          )}
        </header>

        <div className="flex-1 overflow-auto">
          {!missionId ? (
            <Hero onStart={startMission} />
          ) : (
            <Cockpit logs={logs} previewPort={previewPort} />
          )}
        </div>
      </main>
    </div>
  );
}
