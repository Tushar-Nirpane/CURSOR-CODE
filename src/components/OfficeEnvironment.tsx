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
  const seatPositions: Record<string, { x: string; y: string; rotation: number; monitorPos: { x: number; y: number } }> = {
    backend_api: { x: '35%', y: '48%', rotation: 0, monitorPos: { x: 38, y: 50 } },
    frontend_func: { x: '42%', y: '33%', rotation: 0, monitorPos: { x: 44, y: 39 } },
    cybersecurity: { x: '58%', y: '33%', rotation: 0, monitorPos: { x: 56, y: 39 } },
    privacy_data: { x: '65%', y: '48%', rotation: 0, monitorPos: { x: 62, y: 50 } },
    performance: { x: '58%', y: '68%', rotation: 0, monitorPos: { x: 56, y: 64 } },
    integration_edge: { x: '42%', y: '68%', rotation: 0, monitorPos: { x: 44, y: 64 } }
  };

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border-2 border-slate-700/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] bg-[#7d8b96] select-none">
      {/* Top Space Wall with Door, Vents & Tactical Board (Matching Frame 001) */}
      <div className="relative w-full h-24 bg-[#39424e] border-b-4 border-[#252c35] flex items-center justify-between px-6 z-10">
        {/* Left Wall Vent */}
        <div className="flex items-center gap-1.5 opacity-70">
          <div className="w-12 h-6 bg-[#252c35] rounded-sm flex flex-col justify-around p-1 border border-[#4b5563]">
            <div className="h-0.5 bg-[#64748b]" />
            <div className="h-0.5 bg-[#64748b]" />
            <div className="h-0.5 bg-[#64748b]" />
          </div>
        </div>

        {/* Tactical Schematic Chalkboard on Wall (Seen in Reference Frame 001!) */}
        <div className="w-48 h-16 bg-[#16382b] border-4 border-[#4b5563] rounded shadow-lg p-1.5 flex flex-col justify-between relative overflow-hidden">
          <div className="flex items-center justify-between text-[8px] font-mono text-emerald-400">
            <span>SPACESHIP_SECTOR_07</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
          {/* Schematic SVG Map */}
          <svg viewBox="0 0 100 40" className="w-full h-8 opacity-80 stroke-emerald-300 fill-none">
            <rect x="5" y="5" width="25" height="20" strokeWidth="1" strokeDasharray="2,2" />
            <rect x="35" y="8" width="30" height="24" strokeWidth="1.5" />
            <rect x="70" y="5" width="25" height="20" strokeWidth="1" strokeDasharray="2,2" />
            <circle cx="50" cy="20" r="6" stroke="#38bdf8" strokeWidth="1" />
            <line x1="30" y1="15" x2="35" y2="15" strokeWidth="1" />
            <line x1="65" y1="15" x2="70" y2="15" strokeWidth="1" />
          </svg>
          <div className="text-[7px] font-mono text-emerald-500 truncate">
            CREWMATE AI WORKFLOW: SYNCHRONIZED
          </div>
        </div>

        {/* Center Top Door Shutter (Frame 001) */}
        <div className="w-32 h-20 bg-[#252c35] border-x-4 border-t-4 border-[#1e242c] rounded-t flex flex-col justify-end p-1">
          <div className="space-y-1 mb-1">
            <div className="h-1 bg-[#475569] rounded-sm" />
            <div className="h-1 bg-[#475569] rounded-sm" />
            <div className="h-1 bg-[#475569] rounded-sm" />
          </div>
          <div className="w-full h-2 bg-amber-500/80 rounded-sm flex items-center justify-center">
            <span className="text-[6px] font-bold text-black font-mono">SEC-DOOR</span>
          </div>
        </div>

        {/* Right Corner Vending Machine (Seen in Reference Frame 001!) */}
        <div className="w-16 h-20 bg-[#476072] border-2 border-[#1e242c] rounded-md shadow-md p-1 flex flex-col justify-between">
          <div className="w-full h-10 bg-[#1e293b] rounded border border-[#334155] p-1 flex flex-wrap gap-1 content-start">
            <div className="w-2.5 h-3 bg-red-500 rounded-sm" />
            <div className="w-2.5 h-3 bg-cyan-400 rounded-sm" />
            <div className="w-2.5 h-3 bg-amber-400 rounded-sm" />
            <div className="w-2.5 h-3 bg-emerald-400 rounded-sm" />
          </div>
          <div className="flex items-center justify-between text-[7px] font-mono text-slate-300">
            <span>DRINKS</span>
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Cafeteria Floor Area (Diamond Pattern Spaceship Floor) */}
      <div className="relative w-full h-[640px] sm:h-[720px] lg:h-[760px] spaceship-floor overflow-hidden">
        {/* Subtle Room Lighting & Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35 pointer-events-none" />

        {/* Ambient Floor Shadow under Central Table */}
        <div className="absolute top-[55%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[420px] h-[340px] sm:h-[420px] bg-black/35 rounded-full blur-xl pointer-events-none" />

        {/* ----------------- CENTRAL CIRCULAR CAFETERIA TABLE ----------------- */}
        <div className="absolute top-[54%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-[320px] sm:w-[380px] h-[320px] sm:h-[380px] pointer-events-none z-10">
          {/* Main Blue Table Outer Border & Bevel (Matches Reference Frame 001) */}
          <div className="w-full h-full rounded-full bg-gradient-to-b from-[#336ea8] to-[#1e4875] border-[10px] border-[#18395c] shadow-[0_15px_35px_rgba(0,0,0,0.6)] relative flex items-center justify-center">
            {/* Table Surface Inner Groove Ring */}
            <div className="w-[86%] h-[86%] rounded-full border-2 border-[#4b89c7]/40 flex items-center justify-center relative">
              {/* Central Holographic / Console Plate (Seen in Reference Frame 001!) */}
              <div className="w-28 h-20 rounded-xl bg-[#1e293b] border-2 border-[#38bdf8]/80 shadow-[0_0_20px_rgba(56,189,248,0.4)] flex flex-col items-center justify-center p-2 relative overflow-hidden">
                <div className="absolute inset-0 bg-cyan-500/10 animate-pulse" />
                <div className="text-[8px] font-mono font-bold text-cyan-300 tracking-wider mb-0.5">
                  COORDINATION
                </div>
                <div className="text-xs font-black tracking-widest text-white font-among uppercase drop-shadow">
                  CAFETERIA
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-pink-500 via-cyan-400 to-emerald-400 rounded-full mt-1" />
              </div>

              {/* Table Clutter: Keyboards, Coffee Cups, Documents (Reference Frame 001) */}
              {/* Cup 1 */}
              <div className="absolute top-6 left-12 w-3.5 h-3.5 rounded-full bg-slate-100 border border-slate-400 shadow-sm flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-amber-900" />
              </div>
              {/* Cup 2 */}
              <div className="absolute bottom-8 right-14 w-3.5 h-3.5 rounded-full bg-slate-100 border border-slate-400 shadow-sm flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-amber-900" />
              </div>
              {/* Document Stack */}
              <div className="absolute top-8 right-16 w-5 h-7 bg-slate-100 border border-slate-300 rounded-sm shadow rotate-12 flex flex-col p-0.5 gap-0.5">
                <div className="w-full h-0.5 bg-slate-400" />
                <div className="w-3/4 h-0.5 bg-slate-400" />
                <div className="w-full h-0.5 bg-cyan-500" />
              </div>
              {/* Paper Stack 2 */}
              <div className="absolute bottom-10 left-16 w-6 h-8 bg-slate-100 border border-slate-300 rounded-sm shadow -rotate-6 flex flex-col p-0.5 gap-0.5">
                <div className="w-full h-0.5 bg-slate-400" />
                <div className="w-4/5 h-0.5 bg-slate-400" />
                <div className="w-1/2 h-0.5 bg-slate-400" />
              </div>
            </div>

            {/* 6 Computer Monitors mounted around table (Reference Frame 001) */}
            {/* Monitor 1 - Backend API (Left) */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-10 bg-slate-900 border-2 border-slate-600 rounded shadow-md flex items-center justify-center p-0.5">
              <div className="w-full h-full bg-cyan-950 rounded border border-cyan-500/50 flex flex-col p-0.5">
                <div className="w-full h-0.5 bg-cyan-400 animate-pulse" />
                <div className="w-2/3 h-0.5 bg-emerald-400 mt-0.5" />
              </div>
            </div>
            {/* Monitor 2 - Functional (Top-Left) */}
            <div className="absolute left-10 top-2 w-9 h-7 bg-slate-900 border-2 border-slate-600 rounded shadow-md flex items-center justify-center p-0.5 rotate-12">
              <div className="w-full h-full bg-red-950/80 rounded border border-red-500/50 p-0.5">
                <div className="w-full h-0.5 bg-red-400" />
              </div>
            </div>
            {/* Monitor 3 - Security (Top-Right) */}
            <div className="absolute right-10 top-2 w-9 h-7 bg-slate-900 border-2 border-slate-600 rounded shadow-md flex items-center justify-center p-0.5 -rotate-12">
              <div className="w-full h-full bg-slate-950 rounded border border-slate-400/50 p-0.5">
                <div className="w-full h-0.5 bg-slate-300" />
              </div>
            </div>
            {/* Monitor 4 - Privacy (Right) */}
            <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-10 bg-slate-900 border-2 border-slate-600 rounded shadow-md flex items-center justify-center p-0.5">
              <div className="w-full h-full bg-cyan-950 rounded border border-cyan-400/50 p-0.5">
                <div className="w-full h-0.5 bg-cyan-300" />
              </div>
            </div>
            {/* Monitor 5 - Performance (Bottom-Right) */}
            <div className="absolute right-10 bottom-2 w-9 h-7 bg-slate-900 border-2 border-slate-600 rounded shadow-md flex items-center justify-center p-0.5 rotate-12">
              <div className="w-full h-full bg-emerald-950 rounded border border-emerald-400/50 p-0.5">
                <div className="w-full h-0.5 bg-emerald-400" />
              </div>
            </div>
            {/* Monitor 6 - Integration (Bottom-Left) */}
            <div className="absolute left-10 bottom-2 w-9 h-7 bg-slate-900 border-2 border-slate-600 rounded shadow-md flex items-center justify-center p-0.5 -rotate-12">
              <div className="w-full h-full bg-purple-950 rounded border border-purple-400/50 p-0.5">
                <div className="w-full h-0.5 bg-purple-400" />
              </div>
            </div>
          </div>
        </div>

        {/* ----------------- 6 SPECIALIST CREWMATES AROUND TABLE ----------------- */}
        {specialistKeys.map((key) => {
          const config = AGENT_CONFIGS[key];
          const rep = reports[key];
          const pos = seatPositions[key];
          if (!config || !rep || !pos) return null;

          const isWorking = sessionStatus === 'testing' || rep.status === 'testing';

          return (
            <div
              key={key}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              style={{
                left: pos.x,
                top: pos.y
              }}
            >
              <Crewmate
                config={config}
                status={rep.status}
                progress={rep.progress}
                isWorking={isWorking}
                scale={0.94}
                showBadge={true}
              />
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
