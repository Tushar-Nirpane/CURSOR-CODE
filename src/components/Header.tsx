import React from 'react';
import { Volume2, VolumeX, RotateCcw, Zap, AlertCircle, ShieldCheck, Activity } from 'lucide-react';
import { sound } from '../utils/sound';

interface HeaderProps {
  totalProgress: number;
  completedTasks: number;
  totalTasks: number;
  speedMultiplier: number;
  onToggleSpeed: () => void;
  onReset: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  sessionStatus: string;
}

export const Header: React.FC<HeaderProps> = ({
  totalProgress,
  completedTasks,
  totalTasks,
  speedMultiplier,
  onToggleSpeed,
  onReset,
  isMuted,
  onToggleMute,
  sessionStatus
}) => {
  return (
    <header className="relative z-40 w-full bg-slate-950/90 border-b border-slate-800/80 px-4 py-2.5 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 shadow-lg">
      {/* Left: Among Us Total Tasks Completed Bar */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold tracking-wider uppercase text-emerald-400 font-mono-code flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              TOTAL TASKS COMPLETED
            </span>
            <span className="text-xs font-mono text-slate-300 font-semibold">
              [{completedTasks} / {totalTasks}]
            </span>
          </div>

          {/* Among Us Classic Green Segmented Bar */}
          <div className="w-56 sm:w-72 h-5 bg-slate-900 border-2 border-slate-600 rounded-sm p-0.5 relative overflow-hidden shadow-inner">
            {/* Background Grid Segments */}
            <div className="absolute inset-0 flex divide-x divide-slate-800/70 pointer-events-none">
              <div className="flex-1" />
              <div className="flex-1" />
              <div className="flex-1" />
              <div className="flex-1" />
              <div className="flex-1" />
              <div className="flex-1" />
            </div>

            {/* Glowing Green Progress Fill */}
            <div
              className="h-full bg-gradient-to-r from-emerald-500 via-green-400 to-emerald-300 transition-all duration-300 relative rounded-none shadow-[0_0_12px_rgba(52,211,153,0.7)]"
              style={{ width: `${Math.min(100, Math.max(0, totalProgress))}%` }}
            >
              {totalProgress > 0 && (
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Center: Title & DEMO MODE Badge */}
      <div className="flex items-center gap-2.5 sm:gap-3 mx-auto order-first sm:order-none w-full sm:w-auto justify-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-cyan-950/80 border border-cyan-500/40 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-sm sm:text-base font-extrabold tracking-wide uppercase font-among text-white drop-shadow-md">
              Autonomous AI QA Engineer
            </h1>
            <p className="text-[10px] text-slate-400 tracking-wider font-mono-code">
              Spaceship HQ • Cafeteria Agent Cluster
            </p>
          </div>
        </div>

        {/* DEMO MODE Badge (Crucial requirement: clearly labeled) */}
        <div className="px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/40 flex items-center gap-1.5 shadow-[0_0_10px_rgba(245,158,11,0.2)]">
          <AlertCircle className="w-3 h-3 text-amber-400" />
          <span className="text-[10px] font-bold tracking-widest text-amber-300 font-mono-code uppercase">
            DEMO MODE
          </span>
        </div>
      </div>

      {/* Right: Controls & Ping HUD */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Reference Video Ping Indicator */}
        <div className="hidden md:flex items-center gap-1 px-2.5 py-1 bg-slate-900/80 border border-slate-700/60 rounded text-slate-300 font-mono text-xs">
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>Ping:</span>
          <span className="text-emerald-400 font-semibold">24ms</span>
        </div>

        {/* Speed Multiplier Button */}
        <button
          onClick={() => {
            sound.playClick();
            onToggleSpeed();
          }}
          className={`flex items-center gap-1 px-2.5 py-1 text-xs font-mono font-semibold rounded border transition-colors ${
            speedMultiplier === 2
              ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_10px_rgba(6,182,212,0.3)]'
              : 'bg-slate-900 border-slate-700 text-slate-400 hover:text-slate-200'
          }`}
          title="Toggle Simulation Speed"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>{speedMultiplier}x Speed</span>
        </button>

        {/* Sound Toggle */}
        <button
          onClick={() => {
            sound.playClick();
            onToggleMute();
          }}
          className={`p-1.5 rounded border transition-colors ${
            isMuted
              ? 'bg-slate-900 border-slate-800 text-slate-500'
              : 'bg-slate-900 border-slate-700 text-cyan-400 hover:border-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.2)]'
          }`}
          title={isMuted ? 'Unmute SFX' : 'Mute SFX'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Reset Session Button (Emergency Meeting Style) */}
        <button
          onClick={() => {
            sound.playMeetingAlert();
            onReset();
          }}
          className="flex items-center gap-1.5 px-3 py-1 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/50 hover:border-rose-400 rounded text-xs font-bold font-among transition-all duration-200 shadow-[0_0_12px_rgba(244,63,94,0.25)] active:scale-95"
          title="Reset QA Session"
        >
          <RotateCcw className="w-3.5 h-3.5 text-rose-400" />
          <span>RESET</span>
        </button>
      </div>
    </header>
  );
};
