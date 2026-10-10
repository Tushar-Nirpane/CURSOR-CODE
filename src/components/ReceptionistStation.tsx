import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Sparkles, Globe, FileText, CheckCircle2, RefreshCw } from 'lucide-react';
import { Crewmate } from './Crewmate';
import { AGENT_CONFIGS, PRESET_TARGETS } from '../utils/mockData';
import { sound } from '../utils/sound';
import { AgentStatus } from '../types/qa';

interface ReceptionistStationProps {
  url: string;
  expectedBehavior: string;
  onUrlChange: (url: string) => void;
  onBehaviorChange: (text: string) => void;
  onStartTest: () => void;
  sessionStatus: 'idle' | 'dispatching' | 'testing' | 'consolidating' | 'completed' | 'failed';
  receptionistStatus: AgentStatus;
}

export const ReceptionistStation: React.FC<ReceptionistStationProps> = ({
  url,
  expectedBehavior,
  onUrlChange,
  onBehaviorChange,
  onStartTest,
  sessionStatus,
  receptionistStatus
}) => {
  const [showPresets, setShowPresets] = useState(false);
  const isBusy = sessionStatus !== 'idle';
  const clerkConfig = AGENT_CONFIGS.receptionist;

  const handlePresetSelect = (preset: typeof PRESET_TARGETS[0]) => {
    sound.playClick();
    onUrlChange(preset.url);
    onBehaviorChange(preset.behavior);
    setShowPresets(false);
  };

  return (
    <div className="relative flex flex-col items-start select-none">
      {/* Station Title Tag */}
      <div className="flex items-center gap-1.5 mb-1 px-2 py-0.5 rounded bg-slate-900/90 border border-pink-500/40 text-[10px] font-bold tracking-wider text-pink-300 font-among shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-pink-400 animate-ping" />
        RECEPTION & INTAKE STATION
      </div>

      {/* Reception Desk & Crewmate Container */}
      <div className="relative flex items-center">
        {/* Receptionist Crewmate */}
        <div className="relative z-20">
          <Crewmate
            config={clerkConfig}
            status={receptionistStatus}
            isWorking={sessionStatus === 'dispatching' || sessionStatus === 'testing'}
            scale={0.92}
            showBadge={true}
          />
        </div>

        {/* Desk Furniture */}
        <div className="w-28 h-12 bg-slate-800 border-2 border-slate-700 rounded-lg shadow-xl -ml-5 z-10 flex flex-col justify-between p-1.5 relative overflow-hidden">
          {/* Desk Surface Highlights */}
          <div className="w-full h-1 bg-slate-600 rounded-sm opacity-60" />

          {/* Holographic Terminal Base */}
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            </div>
            {/* Keyboard & Paper stack */}
            <div className="w-7 h-4 bg-slate-900 border border-slate-600 rounded-sm flex items-center justify-center">
              <span className="text-[7px] text-cyan-400 font-mono">⌘</span>
            </div>
          </div>
        </div>
      </div>

      {/* Holographic Intake HUD Window (Matches frame_002 holographic panel!) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className={`mt-2 w-80 sm:w-96 rounded-xl p-3.5 border transition-all duration-300 z-30 ${
          isBusy
            ? 'bg-slate-950/90 border-cyan-500/40 shadow-[0_0_25px_rgba(6,182,212,0.2)]'
            : 'bg-slate-950/85 border-slate-700 hover:border-cyan-500/60 shadow-2xl backdrop-blur-md'
        }`}
      >
        {/* Header Ribbon */}
        <div className="flex items-center justify-between mb-2 pb-1.5 border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-xs font-bold text-cyan-300 tracking-wider font-among">
              INTAKE CONSOLE // URL INGESTION
            </span>
          </div>

          {/* Quick Presets Toggle */}
          {!isBusy && (
            <button
              onClick={() => {
                sound.playClick();
                setShowPresets(!showPresets);
              }}
              className="text-[10px] font-mono text-cyan-400 hover:text-cyan-200 flex items-center gap-1 px-2 py-0.5 rounded bg-cyan-950/60 border border-cyan-800 transition-colors"
            >
              <Sparkles className="w-2.5 h-2.5" />
              <span>Presets</span>
            </button>
          )}
        </div>

        {/* Quick Presets Dropdown */}
        <AnimatePresence>
          {showPresets && !isBusy && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="mb-2.5 overflow-hidden border border-cyan-500/30 rounded-lg bg-slate-900/95 p-2 space-y-1 text-left"
            >
              <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">
                Select Test Target:
              </p>
              {PRESET_TARGETS.map((target, idx) => (
                <button
                  key={idx}
                  onClick={() => handlePresetSelect(target)}
                  className="w-full text-left p-1.5 rounded hover:bg-cyan-950/70 border border-transparent hover:border-cyan-600/50 flex flex-col transition-colors group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-200 group-hover:text-cyan-300">
                      {target.name}
                    </span>
                    <span className="text-[9px] text-cyan-400 font-mono">Select →</span>
                  </div>
                  <span className="text-[10px] text-slate-400 truncate font-mono">
                    {target.url}
                  </span>
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Target URL Input */}
        <div className="space-y-1.5 mb-2.5 text-left">
          <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Target Website URL</span>
          </label>
          <div className="relative">
            <input
              type="url"
              disabled={isBusy}
              value={url}
              onChange={(e) => onUrlChange(e.target.value)}
              placeholder="https://example.com"
              className="w-full bg-slate-900/90 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 font-mono outline-none transition-all disabled:opacity-60 disabled:cursor-not-allowed"
            />
          </div>
        </div>

        {/* Expected Behavior / Test Requirements Input */}
        <div className="space-y-1.5 mb-3 text-left">
          <label className="text-[11px] font-semibold text-slate-300 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            <span>Expected Behavior & Scope</span>
          </label>
          <textarea
            disabled={isBusy}
            rows={2}
            value={expectedBehavior}
            onChange={(e) => onBehaviorChange(e.target.value)}
            placeholder="Describe features to test (e.g., checkout flow, promo codes, mobile layout...)"
            className="w-full bg-slate-900/90 border border-slate-700 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 rounded-lg px-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 outline-none transition-all resize-none disabled:opacity-60 disabled:cursor-not-allowed"
          />
        </div>

        {/* Action Button / Active State */}
        <div className="flex items-center gap-2">
          {sessionStatus === 'idle' ? (
            <button
              onClick={() => {
                sound.playDispatch();
                onStartTest();
              }}
              disabled={!url.trim()}
              className="flex-1 flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold font-among text-xs uppercase tracking-wider transition-all duration-200 shadow-[0_0_15px_rgba(6,182,212,0.4)] hover:shadow-[0_0_20px_rgba(6,182,212,0.6)] disabled:opacity-40 disabled:cursor-not-allowed active:scale-[0.98]"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Dispatch QA Agents</span>
            </button>
          ) : sessionStatus === 'dispatching' ? (
            <div className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-pink-950/60 border border-pink-500/50 text-pink-300 text-xs font-mono font-semibold animate-pulse">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-pink-400" />
              <span>Transmitting tasks to specialists...</span>
            </div>
          ) : sessionStatus === 'testing' ? (
            <div className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-cyan-950/60 border border-cyan-500/50 text-cyan-300 text-xs font-mono font-semibold">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-cyan-400" />
              <span>Testing in progress...</span>
            </div>
          ) : sessionStatus === 'consolidating' ? (
            <div className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-amber-950/60 border border-amber-500/50 text-amber-300 text-xs font-mono font-semibold animate-pulse">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-400" />
              <span>Dispatching reports to Officer Vance...</span>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-lg bg-emerald-950/60 border border-emerald-500/50 text-emerald-300 text-xs font-mono font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Session Delivered to Reporting Screen</span>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
