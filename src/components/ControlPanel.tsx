import React from 'react';
import { Play, RotateCcw, ShieldAlert, Zap, Globe, Sparkles } from 'lucide-react';
import { PRESET_TARGETS } from '../utils/mockData';
import { sound } from '../utils/sound';

interface ControlPanelProps {
  sessionStatus: 'idle' | 'dispatching' | 'testing' | 'consolidating' | 'completed' | 'failed';
  simulateFailure: boolean;
  speedMultiplier: number;
  onToggleFailure: () => void;
  onToggleSpeed: () => void;
  onStartTest: () => void;
  onReset: () => void;
  onSelectPreset: (url: string, behavior: string) => void;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  sessionStatus,
  simulateFailure,
  speedMultiplier,
  onToggleFailure,
  onToggleSpeed,
  onStartTest,
  onReset,
  onSelectPreset
}) => {
  const isRunning = sessionStatus === 'dispatching' || sessionStatus === 'testing' || sessionStatus === 'consolidating';

  return (
    <div className="w-full bg-slate-950/90 border border-slate-800 rounded-xl p-3 shadow-xl flex flex-wrap items-center justify-between gap-3 text-left">
      {/* Left: Quick Target Selector */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[11px] font-mono text-slate-400 font-semibold flex items-center gap-1">
          <Globe className="w-3.5 h-3.5 text-cyan-400" />
          <span>Quick Targets:</span>
        </span>
        <div className="flex items-center gap-1.5 flex-wrap">
          {PRESET_TARGETS.map((target, idx) => (
            <button
              key={idx}
              disabled={isRunning}
              onClick={() => {
                sound.playClick();
                onSelectPreset(target.url, target.behavior);
              }}
              className="text-[10px] font-mono px-2 py-1 rounded bg-slate-900 border border-slate-700/80 hover:border-cyan-500/60 hover:text-cyan-300 text-slate-300 transition-colors disabled:opacity-50"
            >
              {target.name}
            </button>
          ))}
        </div>
      </div>

      {/* Right: Controls & Failure Mode Toggle */}
      <div className="flex items-center gap-2 flex-wrap">
        {/* Failure Simulation Switch */}
        <button
          onClick={() => {
            sound.playClick();
            onToggleFailure();
          }}
          disabled={isRunning}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-[11px] font-mono border transition-all ${
            simulateFailure
              ? 'bg-rose-950/60 border-rose-500/60 text-rose-300 shadow-[0_0_10px_rgba(244,63,94,0.3)]'
              : 'bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-300'
          } disabled:opacity-50`}
          title="Inject critical bug and security vulnerability into simulation"
        >
          <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
          <span>Simulate Vulnerabilities: {simulateFailure ? 'ON' : 'OFF'}</span>
        </button>

        {/* Speed Toggle */}
        <button
          onClick={() => {
            sound.playClick();
            onToggleSpeed();
          }}
          className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-mono bg-slate-900 border border-slate-800 text-cyan-400 hover:border-cyan-500 transition-colors"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>{speedMultiplier}x Speed</span>
        </button>

        {/* Reset */}
        <button
          onClick={() => {
            sound.playMeetingAlert();
            onReset();
          }}
          className="flex items-center gap-1 px-2.5 py-1 rounded text-[11px] font-bold font-among bg-rose-600/20 text-rose-300 border border-rose-500/40 hover:bg-rose-600/30 transition-colors"
        >
          <RotateCcw className="w-3 h-3" />
          <span>RESET</span>
        </button>
      </div>
    </div>
  );
};
