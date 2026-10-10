import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Crewmate } from './Crewmate';
import { ReceptionistStation } from './ReceptionistStation';
import { ReportingOfficerArea } from './ReportingOfficerArea';
import { AGENT_CONFIGS } from '../utils/mockData';
import { AgentReport, AgentStatus } from '../types/qa';
import { sound } from '../utils/sound';

interface OfficeEnvironmentProps {
  url: string;
  expectedBehavior: string;
  onUrlChange: (url: string) => void;
  onBehaviorChange: (text: string) => void;
  onStartTest: () => void;
  sessionStatus: 'idle' | 'dispatching' | 'testing' | 'consolidating' | 'completed' | 'failed';
  receptionistStatus: AgentStatus;
  reports: Record<string, AgentReport>;
  totalBugs: number;
  totalScenarios: number;
  overallHealthScore: number;
}

export const OfficeEnvironment: React.FC<OfficeEnvironmentProps> = ({
  url,
  expectedBehavior,
  onUrlChange,
  onBehaviorChange,
  onStartTest,
  sessionStatus,
  receptionistStatus,
  reports,
  totalBugs,
  totalScenarios,
  overallHealthScore
}) => {
  // Specialist crewmates placed around the central circular cafeteria table
  const specialistKeys = [
    'backend_api',
    'frontend_func',
    'cybersecurity',
    'privacy_data',
    'performance',
    'integration_edge'
  ];

  // Fixed seat positions around table (relative % coordinates in cafeteria room)
  // Table center is at ~ (50%, 54%)
  // Specialist robot seat positions around the Central Command circular table (matching reference image!)
  const seatPositions: Record<string, { x: string; y: string; rotation: number; stoolType: 'stool' | 'chair' }> = {
    backend_api: { x: '35%', y: '36%', rotation: 0, stoolType: 'stool' },      // Top-Left: Green robot with brown hat & laptop
    cybersecurity: { x: '61%', y: '36%', rotation: 0, stoolType: 'stool' },    // Top-Right: Charcoal detective with fedora & notepad
    frontend_func: { x: '29%', y: '52%', rotation: 0, stoolType: 'stool' },    // Mid-Left: Pink robot with shield emblem
    integration_edge: { x: '71%', y: '52%', rotation: 0, stoolType: 'stool' }, // Mid-Right: Red robot with headphones
    performance: { x: '65%', y: '71%', rotation: 0, stoolType: 'chair' },      // Bottom-Right: White suit robot on swivel chair
    privacy_data: { x: '49%', y: '74%', rotation: 0, stoolType: 'stool' }       // Bottom: Yellow robot
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border-2 border-slate-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-[#1e2730] select-none">
      {/* Top Space Wall with Door, Security Wall Monitors & Vending Machine (Matching Reference Image!) */}
      <div className="relative w-full h-24 bg-[#232d38] border-b-4 border-[#161e27] flex items-center justify-between px-6 z-10">
        {/* Left Sci-Fi Bulkhead Door (seen on left of reference image) */}
        <div className="flex items-center gap-3">
          <div className="w-24 h-20 bg-[#171f28] border-2 border-[#384858] rounded-t-lg flex flex-col justify-between p-1.5 shadow-inner">
            <div className="flex justify-between items-center px-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[7px] font-mono text-emerald-400 tracking-wider">AIRLOCK_01</span>
            </div>
            <div className="space-y-1">
              <div className="h-1 bg-[#2a3848] rounded" />
              <div className="h-1 bg-[#2a3848] rounded" />
            </div>
            <div className="w-full h-1.5 bg-emerald-500/70 rounded-full" />
          </div>
        </div>

        {/* Center Wall Tactical Display: "SECURITY" (Directly matches top wall monitor in Reference Image!) */}
        <div className="flex items-center gap-6">
          <div className="w-48 h-18 bg-[#0b1715] border-2 border-[#10b981]/50 rounded-lg p-2 shadow-[0_0_15px_rgba(16,185,129,0.25)] flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <span className="text-emerald-400 text-xs font-bold">✓</span>
                <span className="text-[10px] font-black tracking-widest text-emerald-300 font-mono">SECURITY</span>
              </div>
              <span className="text-[8px] font-mono text-emerald-500 animate-pulse">ACTIVE_MONITOR</span>
            </div>
            {/* Holographic Radar / Waveform */}
            <div className="w-full h-3 flex items-center gap-0.5 opacity-80">
              <div className="w-1.5 h-2 bg-emerald-400 rounded-xs animate-pulse" />
              <div className="w-1.5 h-3 bg-emerald-400 rounded-xs" />
              <div className="w-1.5 h-1.5 bg-emerald-400 rounded-xs" />
              <div className="w-1.5 h-3 bg-cyan-400 rounded-xs animate-pulse" />
              <div className="w-1.5 h-2 bg-emerald-400 rounded-xs" />
              <div className="w-1.5 h-3.5 bg-emerald-400 rounded-xs" />
              <div className="flex-1 h-0.5 bg-emerald-800 ml-1" />
            </div>
            {/* Progress Bar */}
            <div className="w-full h-1.5 bg-emerald-950 rounded-full overflow-hidden border border-emerald-500/40">
              <div className="w-[85%] h-full bg-gradient-to-r from-emerald-500 to-cyan-400 rounded-full shadow-[0_0_6px_#10b981]" />
            </div>
          </div>
        </div>

        {/* Right Corner Vending Machine (Seen in top-right of Reference Image!) */}
        <div className="w-18 h-21 bg-[#2e3b48] border-2 border-[#19222c] rounded-md shadow-lg p-1.5 flex flex-col justify-between">
          <div className="w-full h-11 bg-[#0f172a] rounded border border-[#334155] p-1 flex flex-wrap gap-1 content-start shadow-inner">
            <div className="w-2.5 h-3 bg-red-500 rounded-xs shadow-xs" />
            <div className="w-2.5 h-3 bg-cyan-400 rounded-xs shadow-xs" />
            <div className="w-2.5 h-3 bg-amber-400 rounded-xs shadow-xs" />
            <div className="w-2.5 h-3 bg-emerald-400 rounded-xs shadow-xs" />
            <div className="w-2.5 h-3 bg-purple-400 rounded-xs shadow-xs" />
            <div className="w-2.5 h-3 bg-pink-400 rounded-xs shadow-xs" />
          </div>
          <div className="flex items-center justify-between text-[7px] font-mono text-slate-300">
            <span className="font-bold tracking-wider">SNACKS</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Spaceship Command Floor */}
      <div className="relative w-full h-[640px] sm:h-[720px] lg:h-[760px] bg-[#1a232c] overflow-hidden">
        {/* Sci-Fi Floor Grid & Perspective Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(#2b3a4a_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/50 pointer-events-none" />

        {/* Ambient Floor Glow under Central Command */}
        <div className="absolute top-[54%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[420px] sm:w-[500px] h-[420px] sm:h-[500px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* ----------------- CENTRAL COMMAND CIRCULAR HOLOGRAPHIC TABLE ----------------- */}
        <div className="absolute top-[54%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[410px] h-[340px] sm:h-[410px] z-10">
          {/* Main Outer Console Bevel (Dark Sci-Fi Metallic Border) */}
          <div className="w-full h-full rounded-full bg-[#18232d] border-[12px] border-[#10171e] shadow-[0_25px_60px_rgba(0,0,0,0.85)] relative flex items-center justify-center">
            
            {/* Holographic Glowing Surface (Matches Reference Image!) */}
            <div className="w-[88%] h-[88%] rounded-full bg-gradient-to-b from-[#092928] via-[#051f1f] to-[#041617] border-2 border-[#14b8a6]/60 shadow-[inset_0_0_35px_rgba(20,184,166,0.35),0_0_20px_rgba(20,184,166,0.25)] flex items-center justify-center relative overflow-hidden">
              
              {/* Concentric Holographic Rings */}
              <div className="absolute inset-4 rounded-full border border-cyan-400/25 border-dashed animate-[spin_60s_linear_infinite]" />
              <div className="absolute inset-12 rounded-full border border-[#2dd4bf]/30" />
              <div className="absolute inset-20 rounded-full border border-cyan-400/20 border-dotted" />

              {/* Holographic Radar Grid Crosshairs */}
              <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
                <div className="w-full h-[1px] bg-cyan-400" />
                <div className="absolute h-full w-[1px] bg-cyan-400" />
              </div>

              {/* Central Glowing Title: "CENTRAL COMMAND" */}
              <div className="relative flex flex-col items-center justify-center z-10">
                <motion.div
                  animate={{
                    opacity: [0.9, 1, 0.9],
                    scale: [1, 1.02, 1]
                  }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="text-xs sm:text-sm font-black tracking-[0.25em] text-[#5eead4] font-mono uppercase drop-shadow-[0_0_12px_#14b8a6]"
                >
                  CENTRAL COMMAND
                </motion.div>
                <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-[#2dd4bf] to-transparent mt-1" />
              </div>

              {/* ----------------- FLOATING HOLOGRAPHIC DOCUMENTS & FOLDERS (Reference Image!) ----------------- */}
              {/* Document 1 (Top Left) */}
              <motion.div
                animate={{ y: [0, -6, 0], rotate: [8, 12, 8] }}
                transition={{ repeat: Infinity, duration: 3.2, ease: 'easeInOut' }}
                className="absolute top-10 left-12 w-7 h-9 bg-white/90 rounded-sm border border-cyan-300 shadow-[0_4px_10px_rgba(6,182,212,0.4)] p-1 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black text-emerald-500 leading-none">✓</span>
                  <div className="w-2.5 h-0.5 bg-slate-300 rounded" />
                </div>
                <div className="space-y-0.5">
                  <div className="w-full h-0.5 bg-slate-400" />
                  <div className="w-3/4 h-0.5 bg-slate-400" />
                  <div className="w-full h-0.5 bg-cyan-500" />
                </div>
              </motion.div>

              {/* Document 2 (Top Right) */}
              <motion.div
                animate={{ y: [0, -5, 0], rotate: [-6, -10, -6] }}
                transition={{ repeat: Infinity, duration: 2.8, ease: 'easeInOut', delay: 0.5 }}
                className="absolute top-12 right-14 w-7 h-9 bg-white/90 rounded-sm border border-cyan-300 shadow-[0_4px_10px_rgba(6,182,212,0.4)] p-1 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black text-emerald-500 leading-none">✓</span>
                  <div className="w-2.5 h-0.5 bg-slate-300 rounded" />
                </div>
                <div className="space-y-0.5">
                  <div className="w-full h-0.5 bg-slate-400" />
                  <div className="w-2/3 h-0.5 bg-slate-400" />
                  <div className="w-4/5 h-0.5 bg-cyan-500" />
                </div>
              </motion.div>

              {/* Golden Folder 1 (Top Center-Right) */}
              <motion.div
                animate={{ y: [0, -4, 0], rotate: [-4, 0, -4] }}
                transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut', delay: 0.8 }}
                className="absolute top-16 right-28 w-6 h-5 bg-amber-400 rounded-xs border border-amber-500 shadow-md flex items-center justify-center"
              >
                <div className="w-4 h-3 bg-amber-200/80 rounded-xs border border-amber-300" />
              </motion.div>

              {/* Document 3 (Bottom Left) */}
              <motion.div
                animate={{ y: [0, -7, 0], rotate: [-12, -8, -12] }}
                transition={{ repeat: Infinity, duration: 3.6, ease: 'easeInOut', delay: 1 }}
                className="absolute bottom-12 left-16 w-7 h-9 bg-white/90 rounded-sm border border-cyan-300 shadow-[0_4px_10px_rgba(6,182,212,0.4)] p-1 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[9px] font-black text-emerald-500 leading-none">✓</span>
                  <div className="w-2.5 h-0.5 bg-slate-300 rounded" />
                </div>
                <div className="space-y-0.5">
                  <div className="w-full h-0.5 bg-slate-400" />
                  <div className="w-4/5 h-0.5 bg-slate-400" />
                </div>
              </motion.div>

              {/* Golden Folder 2 (Bottom Right) */}
              <motion.div
                animate={{ y: [0, -5, 0], rotate: [6, 2, 6] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut', delay: 1.2 }}
                className="absolute bottom-16 right-18 w-6 h-5 bg-amber-400 rounded-xs border border-amber-500 shadow-md flex items-center justify-center"
              >
                <div className="w-4 h-3 bg-amber-200/80 rounded-xs border border-amber-300" />
              </motion.div>
            </div>

            {/* Holographic Curved Display Screens standing on the desk rim (Reference Image!) */}
            {/* Screen 1 (Left - Pink robot) */}
            <div className="absolute -left-2 top-1/2 -translate-y-1/2 w-9 h-11 bg-cyan-950/70 border border-cyan-400/80 rounded-md backdrop-blur-xs p-1 shadow-[0_0_10px_rgba(6,182,212,0.4)] rotate-6">
              <div className="w-full h-0.5 bg-cyan-400 animate-pulse mb-1" />
              <div className="w-2/3 h-0.5 bg-emerald-400 mb-1" />
              <div className="w-full h-3 border border-cyan-500/40 rounded-xs bg-cyan-900/30" />
            </div>

            {/* Screen 2 (Right - Red robot) */}
            <div className="absolute -right-2 top-1/2 -translate-y-1/2 w-9 h-11 bg-cyan-950/70 border border-cyan-400/80 rounded-md backdrop-blur-xs p-1 shadow-[0_0_10px_rgba(6,182,212,0.4)] -rotate-6">
              <div className="w-full h-0.5 bg-cyan-400 animate-pulse mb-1" />
              <div className="w-3/4 h-0.5 bg-emerald-400 mb-1" />
              <div className="w-full h-3 border border-cyan-500/40 rounded-xs bg-cyan-900/30" />
            </div>
          </div>
        </div>

        {/* ----------------- 6 SPECIALIST ROBOTS SEATED AROUND TABLE ----------------- */}
        {specialistKeys.map((key) => {
          const config = AGENT_CONFIGS[key];
          const rep = reports[key];
          const pos = seatPositions[key];
          if (!config || !rep || !pos) return null;

          const isWorking = sessionStatus === 'testing' || rep.status === 'testing';

          return (
            <div
              key={key}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center"
              style={{
                left: pos.x,
                top: pos.y
              }}
            >
              {/* Specialist Character */}
              <Crewmate
                config={config}
                status={rep.status}
                progress={rep.progress}
                isWorking={isWorking}
                scale={0.96}
                showBadge={true}
              />

              {/* Seating Furniture under character (Office Swivel Chair for Performance, Stools for others) */}
              {pos.stoolType === 'chair' ? (
                <div className="w-9 h-7 bg-[#1e293b] border-2 border-[#0f172a] rounded-md shadow-md -mt-3 relative z-10 flex flex-col items-center justify-end">
                  <div className="w-4 h-1 bg-[#3b82f6] rounded-xs mb-0.5" />
                  <div className="w-1.5 h-2 bg-[#0f172a]" />
                  <div className="w-6 h-1 bg-[#0f172a] rounded-full" />
                </div>
              ) : (
                <div className="w-8 h-3.5 bg-[#18232d] border border-[#0f172a] rounded-full shadow-md -mt-2 relative z-10" />
              )}
            </div>
          );
        })}

        {/* ----------------- RECEPTIONIST STATION (LEFT SIDE) ----------------- */}
        <div className="absolute top-4 left-4 sm:left-6 z-30">
          <ReceptionistStation
            url={url}
            expectedBehavior={expectedBehavior}
            onUrlChange={onUrlChange}
            onBehaviorChange={onBehaviorChange}
            onStartTest={onStartTest}
            sessionStatus={sessionStatus}
            receptionistStatus={receptionistStatus}
          />
        </div>

        {/* ----------------- REPORTING OFFICER AREA (RIGHT SIDE) ----------------- */}
        <div className="absolute top-4 right-4 sm:right-6 z-30">
          <ReportingOfficerArea
            reports={reports}
            sessionStatus={sessionStatus}
            totalBugs={totalBugs}
            totalScenarios={totalScenarios}
            overallHealthScore={overallHealthScore}
            targetUrl={url}
          />
        </div>

        {/* ----------------- ANIMATED TASK DISPATCH DATA PARTICLES ----------------- */}
        {/* Packets flying from Receptionist to the 6 specialists during dispatch */}
        <AnimatePresence>
          {sessionStatus === 'dispatching' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none z-35"
            >
              {specialistKeys.map((key, i) => {
                const targetPos = seatPositions[key];
                return (
                  <motion.div
                    key={`packet-${key}`}
                    initial={{ left: '22%', top: '25%', scale: 0.5, opacity: 1 }}
                    animate={{
                      left: targetPos.x,
                      top: targetPos.y,
                      scale: [0.5, 1.2, 0.8],
                      opacity: [1, 1, 0]
                    }}
                    transition={{
                      duration: 1.2,
                      delay: i * 0.15,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    className="absolute w-4 h-4 rounded-full bg-cyan-400 shadow-[0_0_12px_#38bdf8] flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ----------------- ANIMATED REPORT FLYING INDICATORS (FRAME 007!) ----------------- */}
        {/* Flying documents with checkmarks traveling from Specialists to Reporting Officer Vance */}
        <AnimatePresence>
          {sessionStatus === 'consolidating' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 pointer-events-none z-35"
            >
              {specialistKeys.map((key, idx) => {
                const startPos = seatPositions[key];
                return (
                  <motion.div
                    key={`report-doc-${key}`}
                    initial={{
                      left: startPos.x,
                      top: startPos.y,
                      scale: 0.6,
                      opacity: 1
                    }}
                    animate={{
                      left: '84%',
                      top: '25%',
                      scale: [0.6, 1.1, 0.8],
                      opacity: [1, 1, 0.2]
                    }}
                    transition={{
                      duration: 1.4,
                      delay: idx * 0.2,
                      repeat: Infinity,
                      ease: 'easeInOut'
                    }}
                    className="absolute p-1 bg-white border border-slate-300 rounded shadow-[0_0_15px_rgba(56,189,248,0.8)] flex items-center gap-1 text-[8px] font-bold text-slate-800"
                  >
                    <span>📄</span>
                    <span className="text-emerald-600 font-bold">✓</span>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
