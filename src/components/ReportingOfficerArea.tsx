import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileSpreadsheet, 
  Send, 
  Bot, 
  User, 
  Maximize2, 
  Minimize2, 
  CheckCircle, 
  AlertTriangle, 
  XCircle, 
  Sparkles, 
  ChevronRight,
  TrendingUp,
  SlidersHorizontal,
  Layers
} from 'lucide-react';
import { Crewmate } from './Crewmate';
import { AGENT_CONFIGS, RECOMMENDATIONS, INITIAL_OFFICER_CHAT, MOCK_FINDINGS } from '../utils/mockData';
import { AgentReport, OfficerChatMessage } from '../types/qa';
import { sound } from '../utils/sound';

interface ReportingOfficerAreaProps {
  reports: Record<string, AgentReport>;
  sessionStatus: 'idle' | 'dispatching' | 'testing' | 'consolidating' | 'completed' | 'failed';
  totalBugs: number;
  totalScenarios: number;
  overallHealthScore: number;
  targetUrl: string;
}

export const ReportingOfficerArea: React.FC<ReportingOfficerAreaProps> = ({
  reports,
  sessionStatus,
  totalBugs,
  totalScenarios,
  overallHealthScore,
  targetUrl
}) => {
  const [activeTab, setActiveTab] = useState<'matrix' | 'recommendations' | 'chat'>('matrix');
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedAgentDetail, setSelectedAgentDetail] = useState<string | null>(null);

  // Follow-up Chat State
  const [chatMessages, setChatMessages] = useState<OfficerChatMessage[]>(INITIAL_OFFICER_CHAT);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const officerConfig = AGENT_CONFIGS.reporting_officer;
  const isReady = sessionStatus === 'completed' || sessionStatus === 'failed';
  const isConsolidating = sessionStatus === 'consolidating';

  // Handle follow-up question to Reporting Officer
  const handleSendMessage = (textToSend?: string) => {
    const query = (textToSend || inputMessage).trim();
    if (!query) return;

    sound.playClick();
    const userMsg: OfficerChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: 'Just now'
    };

    setChatMessages((prev) => [...prev, userMsg]);
    setInputMessage('');
    setIsTyping(true);

    // AI Officer contextual response generator
    setTimeout(() => {
      let reply = '';
      const qLower = query.toLowerCase();

      if (qLower.includes('highest') || qLower.includes('critical') || qLower.includes('worst')) {
        reply = `Chief Vance reporting: The highest severity finding is SEC-301 (CORS wildcard origin reflection) alongside API-102 (missing idempotency keys). These allow session leakage and double charges during network retries. I advise blocking production rollout until patches are applied.`;
      } else if (qLower.includes('cors') || qLower.includes('security')) {
        reply = `Security Analysis: The server reflects arbitrary incoming \`Origin\` headers while keeping \`Access-Control-Allow-Credentials: true\`. To remediate, define an explicit array of trusted domain origins in your Express/Fastify CORS configuration rather than mirroring \`req.headers.origin\`.`;
      } else if (qLower.includes('double') || qLower.includes('billing') || qLower.includes('api')) {
        reply = `API Resilience Diagnosis: Duplicate POST /orders requests triggered 2 unique order IDs within 180ms. Fix: Require an \`Idempotency-Key\` HTTP header generated per client transaction, cached in Redis with a 60-second atomic lock.`;
      } else if (qLower.includes('recommend') || qLower.includes('summary') || qLower.includes('fix')) {
        reply = `Executive Remediation Order: 1) Deploy Redis idempotency lock on checkout. 2) Remove unencrypted credit card fields from localStorage. 3) Switch 4.2MB hero assets to responsive AVIF format to restore mobile LCP below 2.5s.`;
      } else {
        reply = `Telemetry Insight: All 6 testing squads completed their sweeps on ${targetUrl || 'target'}. Total scenarios verified: ${totalScenarios}, with ${totalBugs} issues recorded. Let me know if you would like me to unpack logs for any specific agent.`;
      }

      const officerReply: OfficerChatMessage = {
        id: `off-${Date.now()}`,
        sender: 'officer',
        text: reply,
        timestamp: 'Just now'
      };

      setChatMessages((prev) => [...prev, officerReply]);
      setIsTyping(false);
    }, 650);
  };

  const agentKeys = [
    'backend_api',
    'frontend_func',
    'cybersecurity',
    'privacy_data',
    'performance',
    'integration_edge'
  ];

  return (
    <div className="relative flex flex-col items-end select-none w-full max-w-2xl">
      {/* Area Label Tag */}
      <div className="flex items-center gap-1.5 mb-1 px-2 py-0.5 rounded bg-slate-900/90 border border-slate-700 text-[10px] font-bold tracking-wider text-slate-300 font-among shadow-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
        CHIEF REPORTING OFFICER & COMMAND TERMINAL
      </div>

      <div className="flex items-start gap-3 w-full justify-end">
        {/* The Smart Display Monitor (Matches frame 008, 009, 010!) */}
        <div
          className={`transition-all duration-300 rounded-xl border relative shadow-2xl backdrop-blur-md overflow-hidden ${
            isExpanded
              ? 'fixed inset-4 sm:inset-10 z-50 bg-slate-950/98 border-cyan-500/60 shadow-[0_0_50px_rgba(6,182,212,0.3)] flex flex-col'
              : 'w-full bg-slate-950/90 border-slate-700/80 hover:border-cyan-500/50 flex flex-col'
          }`}
        >
          {/* Monitor Top Frame & Header Tabs (Frame 009 style) */}
          <div className="bg-slate-900/95 border-b border-slate-800 px-3 py-2 flex items-center justify-between">
            {/* Monitor Window Buttons */}
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="text-[11px] font-mono text-slate-400 font-semibold ml-2">
                SYS://REPORTING_MATRIX_V4
              </span>
            </div>

            {/* Navigation Tabs (NAME, ATTNGS, REPORTS as in Frame 009) */}
            <div className="flex items-center bg-slate-950/80 rounded-lg p-0.5 border border-slate-800">
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('matrix');
                }}
                className={`px-3 py-1 rounded-md text-[11px] font-bold font-among transition-colors ${
                  activeTab === 'matrix'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                REPORTS
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('recommendations');
                }}
                className={`px-3 py-1 rounded-md text-[11px] font-bold font-among transition-colors ${
                  activeTab === 'recommendations'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                AI RECOMMENDATIONS
              </button>
              <button
                onClick={() => {
                  sound.playClick();
                  setActiveTab('chat');
                }}
                className={`px-3 py-1 rounded-md text-[11px] font-bold font-among transition-colors flex items-center gap-1 ${
                  activeTab === 'chat'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Bot className="w-3 h-3" />
                <span>OFFICER Q&A</span>
              </button>
            </div>

            {/* Expand / Minimize Toggle */}
            <button
              onClick={() => {
                sound.playClick();
                setIsExpanded(!isExpanded);
              }}
              className="p-1 rounded text-slate-400 hover:text-slate-100 hover:bg-slate-800/80 transition-colors"
              title={isExpanded ? 'Collapse' : 'Expand Terminal'}
            >
              {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
          </div>

          {/* Monitor Screen Body */}
          <div className="p-3 text-slate-200 flex-1 overflow-y-auto">
            {!isReady && !isConsolidating ? (
              // Idle Screen State
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 shadow-inner">
                  <FileSpreadsheet className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-300 font-among">
                    REPORTING OFFICER STANDING BY
                  </h4>
                  <p className="text-xs text-slate-500 max-w-sm mt-1">
                    Waiting for intake reception to dispatch test vectors. Reports will automatically stream here when tests finish.
                  </p>
                </div>
              </div>
            ) : isConsolidating ? (
              // Consolidating animation state
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 rounded-full border-2 border-cyan-400 border-t-transparent animate-spin flex items-center justify-center" />
                <h4 className="text-sm font-bold text-cyan-300 font-among animate-pulse">
                  CONSOLIDATING MULTI-AGENT TELEMETRY...
                </h4>
                <p className="text-xs text-slate-400">
                  Collating API benchmarks, security probes, and functional traces.
                </p>
              </div>
            ) : (
              // Active Consolidated Report Screen
              <div>
                {/* TAB 1: REPORTS MATRIX (Matches Reference Frame 009 & 010!) */}
                {activeTab === 'matrix' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
                      {/* Left 2 Cols: Main Specialist Table */}
                      <div className="lg:col-span-2 space-y-1.5">
                        {/* Table Header */}
                        <div className="grid grid-cols-12 gap-1 px-2 py-1 text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800">
                          <span className="col-span-4">AGENT NAME</span>
                          <span className="col-span-2 text-center">TAG</span>
                          <span className="col-span-2 text-center">BUGS</span>
                          <span className="col-span-2 text-center">SCENARIOS</span>
                          <span className="col-span-2 text-right">SEVERITY</span>
                        </div>

                        {/* Agent Rows */}
                        {agentKeys.map((key) => {
                          const config = AGENT_CONFIGS[key];
                          const rep = reports[key];
                          if (!config || !rep) return null;

                          return (
                            <div
                              key={key}
                              onClick={() => {
                                sound.playClick();
                                setSelectedAgentDetail(selectedAgentDetail === key ? null : key);
                              }}
                              className={`grid grid-cols-12 gap-1 items-center px-2 py-1.5 rounded-lg border cursor-pointer transition-all ${
                                selectedAgentDetail === key
                                  ? 'bg-slate-900 border-cyan-500/60 shadow-md'
                                  : 'bg-slate-900/50 hover:bg-slate-900 border-slate-800/80 hover:border-slate-700'
                              }`}
                            >
                              {/* Crewmate mini icon & Name */}
                              <div className="col-span-4 flex items-center gap-2">
                                <span
                                  className="w-3 h-3 rounded-full shrink-0 border border-black/40 shadow-sm"
                                  style={{ backgroundColor: config.color }}
                                />
                                <div className="truncate">
                                  <div className="text-xs font-bold text-slate-200 font-among truncate">
                                    {config.shortLabel}
                                  </div>
                                  <div className="text-[9px] text-slate-400 truncate font-mono">
                                    {config.title.split('&')[0]}
                                  </div>
                                </div>
                              </div>

                              {/* TAG Badge (DECIMAL, ELOCDNAL, REVIVE, etc.) */}
                              <div className="col-span-2 flex justify-center">
                                <span className="px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-emerald-950/80 border border-emerald-500/40 text-emerald-400">
                                  {config.tag}
                                </span>
                              </div>

                              {/* BUG Count */}
                              <div className="col-span-2 text-center font-mono text-xs font-bold text-amber-400">
                                {rep.bugsFound}
                              </div>

                              {/* SCENARIOS Tested */}
                              <div className="col-span-2 text-center font-mono text-xs text-slate-300">
                                {rep.scenariosTested}
                              </div>

                              {/* SEVERITY Bar (as in Frame 009) */}
                              <div className="col-span-2 flex items-center justify-end gap-1.5">
                                <span
                                  className={`text-[10px] font-mono font-bold ${
                                    rep.severityScore > 60
                                      ? 'text-rose-400'
                                      : rep.severityScore > 20
                                      ? 'text-amber-400'
                                      : 'text-emerald-400'
                                  }`}
                                >
                                  {rep.severityScore}%
                                </span>
                                <div className="w-10 h-2 bg-slate-800 rounded-sm overflow-hidden flex">
                                  <div
                                    className={`h-full ${
                                      rep.severityScore > 60
                                        ? 'bg-rose-500'
                                        : rep.severityScore > 20
                                        ? 'bg-amber-500'
                                        : 'bg-emerald-500'
                                    }`}
                                    style={{ width: `${Math.min(100, Math.max(8, rep.severityScore))}%` }}
                                  />
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {/* Right Col: Error-Analysis Widget (Matches Frame 009!) */}
                      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-3 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between pb-1.5 mb-2 border-b border-slate-800">
                            <span className="text-xs font-bold text-slate-300 font-mono flex items-center gap-1.5">
                              <TrendingUp className="w-3.5 h-3.5 text-cyan-400" />
                              Error-analysis
                            </span>
                            <span className="text-[10px] font-mono text-cyan-400">0.24 / 100</span>
                          </div>

                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-0.5">
                                <span>Critical Bug Density</span>
                                <span className="text-rose-400 font-bold">HIGH</span>
                              </div>
                              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div className="w-[68%] h-full bg-rose-500 rounded-full" />
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-0.5">
                                <span>Security Compliance</span>
                                <span className="text-amber-400 font-bold">WARN</span>
                              </div>
                              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div className="w-[45%] h-full bg-amber-500 rounded-full" />
                              </div>
                            </div>

                            <div>
                              <div className="flex justify-between text-[10px] font-mono text-slate-400 mb-0.5">
                                <span>Resilience & Uptime</span>
                                <span className="text-emerald-400 font-bold">98.4%</span>
                              </div>
                              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                                <div className="w-[94%] h-full bg-emerald-500 rounded-full" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Overall Health Score Card */}
                        <div className="mt-3 p-2 bg-slate-950/70 border border-slate-800/80 rounded-lg flex items-center justify-between">
                          <div>
                            <div className="text-[9px] uppercase tracking-wider text-slate-400 font-mono">
                              System Health
                            </div>
                            <div className="text-base font-bold font-among text-emerald-400">
                              {overallHealthScore} / 100
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-[9px] uppercase tracking-wider text-slate-400 font-mono">
                              Total Flaws
                            </div>
                            <div className="text-base font-bold font-among text-rose-400">
                              {totalBugs} Issues
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Drill-Down Inspector Modal / Drawer if row clicked */}
                    <AnimatePresence>
                      {selectedAgentDetail && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="p-3 bg-slate-900 border border-cyan-500/40 rounded-xl space-y-2"
                        >
                          <div className="flex items-center justify-between pb-1 border-b border-slate-800">
                            <span className="text-xs font-bold text-cyan-300 font-among flex items-center gap-1.5">
                              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                              Deep Findings: {AGENT_CONFIGS[selectedAgentDetail]?.title}
                            </span>
                            <button
                              onClick={() => setSelectedAgentDetail(null)}
                              className="text-[10px] text-slate-400 hover:text-white px-1.5 py-0.5 bg-slate-800 rounded"
                            >
                              Close ✕
                            </button>
                          </div>

                          <div className="space-y-1.5 max-h-48 overflow-y-auto">
                            {(MOCK_FINDINGS[selectedAgentDetail] || []).length > 0 ? (
                              MOCK_FINDINGS[selectedAgentDetail].map((finding) => (
                                <div
                                  key={finding.id}
                                  className="p-2 bg-slate-950/80 border border-slate-800 rounded-lg space-y-1 text-left"
                                >
                                  <div className="flex items-center justify-between">
                                    <span className="text-xs font-bold text-slate-200">
                                      {finding.title}
                                    </span>
                                    <span
                                      className={`text-[9px] font-mono px-1.5 py-0.5 rounded uppercase font-bold ${
                                        finding.severity === 'critical'
                                          ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                          : finding.severity === 'high'
                                          ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                          : 'bg-blue-950 text-blue-300 border border-blue-800'
                                      }`}
                                    >
                                      {finding.severity}
                                    </span>
                                  </div>
                                  <p className="text-[11px] text-slate-400">{finding.description}</p>
                                  <div className="text-[10px] text-cyan-400/90 font-mono">
                                    Fix: {finding.suggestedFix}
                                  </div>
                                  {finding.codeSnippet && (
                                    <pre className="p-1.5 bg-slate-900 border border-slate-800 rounded text-[9px] text-emerald-300 font-mono overflow-x-auto">
                                      {finding.codeSnippet}
                                    </pre>
                                  )}
                                </div>
                              ))
                            ) : (
                              <p className="text-xs text-slate-400">No critical anomalies recorded.</p>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}

                {/* TAB 2: AI RECOMMENDATIONS (Frame 009 bottom cards!) */}
                {activeTab === 'recommendations' && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {RECOMMENDATIONS.map((rec) => (
                        <div
                          key={rec.id}
                          className="bg-slate-900/90 border border-slate-700/80 hover:border-cyan-500/50 rounded-xl p-3 flex flex-col justify-between space-y-2 transition-all shadow-md text-left"
                        >
                          <div>
                            <div className="flex items-center justify-between mb-1.5">
                              <span className="text-[9px] font-mono font-bold text-cyan-400 uppercase tracking-wider px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800">
                                {rec.category}
                              </span>
                              <span
                                className={`text-[9px] font-mono font-bold px-1.5 py-0.5 rounded uppercase ${
                                  rec.priority === 'High'
                                    ? 'bg-rose-950 text-rose-400 border border-rose-800'
                                    : 'bg-amber-950 text-amber-400 border border-amber-800'
                                }`}
                              >
                                {rec.priority}
                              </span>
                            </div>
                            <h5 className="text-xs font-bold text-slate-100 font-among">
                              {rec.title}
                            </h5>
                            <p className="text-[11px] text-slate-400 mt-1">{rec.summary}</p>
                          </div>
                          <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-300 font-mono bg-slate-950/60 p-1.5 rounded">
                            {rec.details}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* TAB 3: OFFICER Q&A INTERFACE */}
                {activeTab === 'chat' && (
                  <div className="flex flex-col h-80 sm:h-96 text-left">
                    {/* Chat Messages Log */}
                    <div className="flex-1 overflow-y-auto space-y-2.5 pr-1 mb-2">
                      {chatMessages.map((msg) => (
                        <div
                          key={msg.id}
                          className={`flex items-start gap-2.5 ${
                            msg.sender === 'user' ? 'flex-row-reverse' : ''
                          }`}
                        >
                          <div
                            className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-xs ${
                              msg.sender === 'user'
                                ? 'bg-cyan-600 text-white'
                                : 'bg-slate-800 text-slate-300 border border-slate-700'
                            }`}
                          >
                            {msg.sender === 'user' ? (
                              <User className="w-3.5 h-3.5" />
                            ) : (
                              <Bot className="w-3.5 h-3.5 text-cyan-400" />
                            )}
                          </div>
                          <div
                            className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                              msg.sender === 'user'
                                ? 'bg-cyan-600 text-white shadow-sm'
                                : 'bg-slate-900 border border-slate-800 text-slate-200 shadow-sm'
                            }`}
                          >
                            <p>{msg.text}</p>
                            {msg.suggestedActions && (
                              <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex flex-wrap gap-1.5">
                                {msg.suggestedActions.map((action, i) => (
                                  <button
                                    key={i}
                                    onClick={() => handleSendMessage(action)}
                                    className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 hover:bg-cyan-900/60 border border-slate-700 hover:border-cyan-500/50 text-cyan-300 transition-colors"
                                  >
                                    {action}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex items-center gap-2 text-xs text-slate-400 font-mono animate-pulse">
                          <Bot className="w-3.5 h-3.5 text-cyan-400" />
                          <span>Chief Inspector Vance is formulating response...</span>
                        </div>
                      )}
                    </div>

                    {/* Chat Input Box */}
                    <div className="flex items-center gap-2 pt-2 border-t border-slate-800">
                      <input
                        type="text"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') handleSendMessage();
                        }}
                        placeholder="Ask Chief Vance about flaws, curl snippets, or fix steps..."
                        className="flex-1 bg-slate-900 border border-slate-700 focus:border-cyan-400 rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 outline-none font-mono"
                      />
                      <button
                        onClick={() => handleSendMessage()}
                        disabled={!inputMessage.trim()}
                        className="p-2 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white disabled:opacity-40 transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Monitor Hardware Base with Red & Green buttons (Frame 008, 009) */}
          <div className="bg-slate-900/90 border-t border-slate-800 px-3 py-1.5 flex items-center justify-between text-[10px] font-mono text-slate-500">
            <div className="flex items-center gap-2">
              <span className="w-4 h-1.5 rounded-full bg-rose-500 shadow-[0_0_6px_rgba(244,63,94,0.6)]" />
              <span className="w-4 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
              <span>TERMINAL READY</span>
            </div>
            <span>STATION ID: 08-REP</span>
          </div>
        </div>

        {/* Reporting Officer Vance Crewmate standing beside display! */}
        <div className="shrink-0 flex flex-col items-center">
          <Crewmate
            config={officerConfig}
            status={sessionStatus === 'consolidating' ? 'submitting' : isReady ? 'done' : 'idle'}
            isWorking={sessionStatus === 'consolidating'}
            scale={1.05}
            showBadge={true}
          />
        </div>
      </div>
    </div>
  );
};
