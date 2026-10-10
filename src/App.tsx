import React, { useState, useEffect, useRef } from 'react';
import confetti from 'canvas-confetti';
import { Header } from './components/Header';
import { OfficeEnvironment } from './components/OfficeEnvironment';
import { ActivityPanel } from './components/ActivityPanel';
import { ControlPanel } from './components/ControlPanel';
import { AgentReport, AgentStatus } from './types/qa';
import { AGENT_CONFIGS, MOCK_FINDINGS, PRESET_TARGETS } from './utils/mockData';
import { sound } from './utils/sound';

interface ActivityLogItem {
  id: string;
  timestamp: string;
  agentLabel: string;
  agentColor: string;
  message: string;
  type: 'info' | 'warn' | 'error' | 'success';
}

const INITIAL_REPORTS: Record<string, AgentReport> = {
  backend_api: {
    agentRole: 'backend_api',
    status: 'idle',
    progress: 0,
    scenariosTested: 0,
    bugsFound: 0,
    severityScore: 0,
    findings: [],
    logs: []
  },
  frontend_func: {
    agentRole: 'frontend_func',
    status: 'idle',
    progress: 0,
    scenariosTested: 0,
    bugsFound: 0,
    severityScore: 0,
    findings: [],
    logs: []
  },
  cybersecurity: {
    agentRole: 'cybersecurity',
    status: 'idle',
    progress: 0,
    scenariosTested: 0,
    bugsFound: 0,
    severityScore: 0,
    findings: [],
    logs: []
  },
  privacy_data: {
    agentRole: 'privacy_data',
    status: 'idle',
    progress: 0,
    scenariosTested: 0,
    bugsFound: 0,
    severityScore: 0,
    findings: [],
    logs: []
  },
  performance: {
    agentRole: 'performance',
    status: 'idle',
    progress: 0,
    scenariosTested: 0,
    bugsFound: 0,
    severityScore: 0,
    findings: [],
    logs: []
  },
  integration_edge: {
    agentRole: 'integration_edge',
    status: 'idle',
    progress: 0,
    scenariosTested: 0,
    bugsFound: 0,
    severityScore: 0,
    findings: [],
    logs: []
  }
};

export function App() {
  const [url, setUrl] = useState(PRESET_TARGETS[0].url);
  const [expectedBehavior, setExpectedBehavior] = useState(PRESET_TARGETS[0].behavior);
  const [sessionStatus, setSessionStatus] = useState<
    'idle' | 'dispatching' | 'testing' | 'consolidating' | 'completed' | 'failed'
  >('idle');
  const [receptionistStatus, setReceptionistStatus] = useState<AgentStatus>('idle');
  const [reports, setReports] = useState<Record<string, AgentReport>>(INITIAL_REPORTS);
  const [speedMultiplier, setSpeedMultiplier] = useState(1);
  const [simulateFailure, setSimulateFailure] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [logs, setLogs] = useState<ActivityLogItem[]>([]);

  // Sound mute sync
  const toggleMute = () => {
    const next = !isMuted;
    setIsMuted(next);
    sound.setEnabled(!next);
  };

  const toggleSpeed = () => {
    setSpeedMultiplier((prev) => (prev === 1 ? 2 : 1));
  };

  const toggleFailure = () => {
    setSimulateFailure((prev) => !prev);
  };

  // Helper to add activity log entry
  const addLog = (
    agentKey: string,
    message: string,
    type: 'info' | 'warn' | 'error' | 'success' = 'info'
  ) => {
    const config = AGENT_CONFIGS[agentKey] || AGENT_CONFIGS.receptionist;
    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0] + '.' + Math.floor(now.getMilliseconds() / 100);

    const newLog: ActivityLogItem = {
      id: `log-${Date.now()}-${Math.random()}`,
      timestamp: timeStr,
      agentLabel: config.shortLabel,
      agentColor: config.color,
      message,
      type
    };

    setLogs((prev) => [newLog, ...prev.slice(0, 45)]);
  };

  // Start Testing Session Flow
  const handleStartTest = () => {
    if (!url.trim() || sessionStatus !== 'idle') return;

    // Reset reports
    setReports(INITIAL_REPORTS);
    setLogs([]);
    setSessionStatus('dispatching');
    setReceptionistStatus('testing');

    addLog('receptionist', `Received target: ${url}`, 'info');
    addLog('receptionist', 'Analyzing requirements matrix & partitioning agent tasks...', 'info');

    // After brief dispatch animation, launch agents
    const dispatchDelay = 1400 / speedMultiplier;
    setTimeout(() => {
      setSessionStatus('testing');
      setReceptionistStatus('done');
      addLog('receptionist', 'Broadcast completed: 6 testing agents activated.', 'success');

      // Initialize all agents to testing
      setReports((prev) => {
        const next = { ...prev };
        Object.keys(next).forEach((k) => {
          next[k] = { ...next[k], status: 'testing', progress: 5 };
        });
        return next;
      });

      launchAgentSimulations();
    }, dispatchDelay);
  };

  // Simulation loop for each agent
  const launchAgentSimulations = () => {
    const specialistKeys = [
      'backend_api',
      'frontend_func',
      'cybersecurity',
      'privacy_data',
      'performance',
      'integration_edge'
    ];

    const agentSteps: Record<string, { interval: number; logMessages: { prog: number; msg: string; type: 'info' | 'warn' | 'error' | 'success' }[] }> = {
      backend_api: {
        interval: 320 / speedMultiplier,
        logMessages: [
          { prog: 25, msg: 'Fuzzing POST /api/cart with malformed UTF-8 characters...', type: 'info' },
          { prog: 60, msg: 'Warning: 500 Internal Server Error detected on unescaped payload!', type: 'warn' },
          { prog: 85, msg: 'Flaw verified: Missing idempotency key allows duplicate order IDs.', type: 'error' }
        ]
      },
      frontend_func: {
        interval: 360 / speedMultiplier,
        logMessages: [
          { prog: 30, msg: 'Simulating mobile checkout view & promo voucher modal...', type: 'info' },
          { prog: 65, msg: 'Detected infinite re-render loop on viewport resize.', type: 'warn' },
          { prog: 90, msg: 'Form autofill fails to enable submit button on Chrome iOS.', type: 'error' }
        ]
      },
      cybersecurity: {
        interval: 400 / speedMultiplier,
        logMessages: [
          { prog: 20, msg: 'Auditing HTTP headers, CSP policy & CORS origin reflection...', type: 'info' },
          { prog: 55, msg: 'Critical: Access-Control-Allow-Origin reflects untrusted origins!', type: 'error' },
          { prog: 85, msg: 'Missing Content-Security-Policy (CSP) headers confirmed.', type: 'warn' }
        ]
      },
      privacy_data: {
        interval: 340 / speedMultiplier,
        logMessages: [
          { prog: 35, msg: 'Inspecting browser storage & third-party tracking beacons...', type: 'info' },
          { prog: 75, msg: 'Privacy leak: Credit card expiry stored in localStorage plain text!', type: 'error' }
        ]
      },
      performance: {
        interval: 380 / speedMultiplier,
        logMessages: [
          { prog: 25, msg: 'Benchmarking Lighthouse metrics on throttled 4G network...', type: 'info' },
          { prog: 60, msg: 'Largest Contentful Paint (LCP) exceeds 4.8s due to unoptimized hero image.', type: 'warn' },
          { prog: 88, msg: 'Main thread blocked for 680ms by third-party analytics script.', type: 'warn' }
        ]
      },
      integration_edge: {
        interval: 420 / speedMultiplier,
        logMessages: [
          { prog: 30, msg: 'Simulating concurrent webhook deliveries & payment callbacks...', type: 'info' },
          { prog: 70, msg: 'Race condition: Stripe webhook arrives prior to database order creation.', type: 'error' }
        ]
      }
    };

    specialistKeys.forEach((key) => {
      let currentProgress = 5;
      const stepData = agentSteps[key];

      const timer = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 12) + 6;

        // Check if milestone log exists
        const milestone = stepData.logMessages.find(
          (m) => currentProgress >= m.prog && currentProgress - 15 < m.prog
        );
        if (milestone) {
          addLog(key, milestone.msg, milestone.type);
        }

        if (currentProgress >= 100) {
          currentProgress = 100;
          clearInterval(timer);

          // Populate realistic findings
          const findings = simulateFailure ? (MOCK_FINDINGS[key] || []) : [];
          const bugCount = findings.length;
          const severity = simulateFailure
            ? key === 'backend_api' || key === 'cybersecurity'
              ? 85
              : key === 'frontend_func' || key === 'integration_edge'
              ? 60
              : 30
            : 0;

          setReports((prev) => ({
            ...prev,
            [key]: {
              ...prev[key],
              status: 'done',
              progress: 100,
              scenariosTested: Math.floor(Math.random() * 15) + 12,
              bugsFound: bugCount,
              severityScore: severity,
              findings
            }
          }));

          addLog(key, `Completed audit suite. Ready for consolidation.`, 'success');
        } else {
          setReports((prev) => ({
            ...prev,
            [key]: {
              ...prev[key],
              progress: currentProgress
            }
          }));
        }
      }, stepData.interval);
    });
  };

  // Watch for all agents finishing
  useEffect(() => {
    if (sessionStatus !== 'testing') return;

    const specialistKeys = [
      'backend_api',
      'frontend_func',
      'cybersecurity',
      'privacy_data',
      'performance',
      'integration_edge'
    ];

    const allFinished = specialistKeys.every((k) => reports[k]?.status === 'done');

    if (allFinished) {
      sound.playMeetingAlert();
      setSessionStatus('consolidating');
      addLog('reporting_officer', 'Transmitting agent dossiers to Chief Vance briefing terminal...', 'info');

      // Frame 007 Consolidation flight duration
      const consolidateDelay = 1800 / speedMultiplier;
      setTimeout(() => {
        setSessionStatus(simulateFailure ? 'completed' : 'completed');
        sound.playComplete();
        addLog('reporting_officer', 'Consolidated QA briefing generated on Smart Display.', 'success');

        // Confetti celebration
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 }
        });
      }, consolidateDelay);
    }
  }, [reports, sessionStatus, speedMultiplier, simulateFailure]);

  // Reset Session
  const handleReset = () => {
    setSessionStatus('idle');
    setReceptionistStatus('idle');
    setReports(INITIAL_REPORTS);
    setLogs([]);
    addLog('receptionist', 'Office session reset. Standing by for new target submission.', 'info');
  };

  // Preset Selection
  const handleSelectPreset = (newUrl: string, newBehavior: string) => {
    setUrl(newUrl);
    setExpectedBehavior(newBehavior);
    if (sessionStatus !== 'idle') {
      handleReset();
    }
  };

  // Compute Overall Totals
  const specialistKeys = [
    'backend_api',
    'frontend_func',
    'cybersecurity',
    'privacy_data',
    'performance',
    'integration_edge'
  ];

  const totalProgress = Math.round(
    specialistKeys.reduce((acc, k) => acc + (reports[k]?.progress || 0), 0) / specialistKeys.length
  );

  const completedTasks = specialistKeys.filter((k) => reports[k]?.status === 'done').length;
  const totalBugs = specialistKeys.reduce((acc, k) => acc + (reports[k]?.bugsFound || 0), 0);
  const totalScenarios = specialistKeys.reduce((acc, k) => acc + (reports[k]?.scenariosTested || 0), 0);
  const overallHealthScore = Math.max(12, 100 - totalBugs * 14);

  return (
    <div className="min-h-screen bg-[#070b12] text-slate-100 flex flex-col justify-between selection:bg-cyan-500 selection:text-black">
      {/* 1. Project Compact Header (Matches Among Us HUD) */}
      <Header
        totalProgress={totalProgress}
        completedTasks={completedTasks}
        totalTasks={specialistKeys.length}
        speedMultiplier={speedMultiplier}
        onToggleSpeed={toggleSpeed}
        onReset={handleReset}
        isMuted={isMuted}
        onToggleMute={toggleMute}
        sessionStatus={sessionStatus}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-[1600px] mx-auto p-3 sm:p-4 md:p-6 space-y-4">
        {/* 2. Central Animated Spaceship Office Cafeteria */}
        <OfficeEnvironment
          url={url}
          expectedBehavior={expectedBehavior}
          onUrlChange={setUrl}
          onBehaviorChange={setExpectedBehavior}
          onStartTest={handleStartTest}
          sessionStatus={sessionStatus}
          receptionistStatus={receptionistStatus}
          reports={reports}
          totalBugs={totalBugs}
          totalScenarios={totalScenarios}
          overallHealthScore={overallHealthScore}
        />

        {/* 3. Lower Control Panel & Live Activity Log Stream */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          <div className="lg:col-span-5 space-y-4">
            <ControlPanel
              sessionStatus={sessionStatus}
              simulateFailure={simulateFailure}
              speedMultiplier={speedMultiplier}
              onToggleFailure={toggleFailure}
              onToggleSpeed={toggleSpeed}
              onStartTest={handleStartTest}
              onReset={handleReset}
              onSelectPreset={handleSelectPreset}
            />

            {/* Quick Agent Reference Card */}
            <div className="bg-slate-950/90 border border-slate-800 rounded-xl p-3 text-left">
              <div className="text-[11px] font-mono font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
                <span>The 8 QA Personnel:</span>
                <span className="text-cyan-400 font-mono">1 Clerk • 6 Testers • 1 Officer</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Object.values(AGENT_CONFIGS).map((agent) => (
                  <div
                    key={agent.id}
                    className="p-1.5 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-center gap-1.5"
                  >
                    <span
                      className="w-2.5 h-2.5 rounded-full shrink-0"
                      style={{ backgroundColor: agent.color }}
                    />
                    <div className="truncate">
                      <div className="text-[11px] font-bold text-slate-200 truncate font-among">
                        {agent.shortLabel}
                      </div>
                      <div className="text-[9px] text-slate-400 truncate font-mono">
                        {agent.title.split(' ')[0]}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <ActivityPanel logs={logs} sessionStatus={sessionStatus} />
          </div>
        </div>
      </main>

      {/* Footer / Demo Disclaimer */}
      <footer className="w-full bg-slate-950/80 border-t border-slate-800/80 py-2 px-4 text-center text-[10px] text-slate-500 font-mono flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 mx-auto sm:mx-0">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span>PHASE 1: FOUNDATION, ENVIRONMENT & VISUAL DIRECTION COMPLETE</span>
        </div>
        <div className="text-amber-400/80 mx-auto sm:mx-0 font-semibold">
          ★ DEMO MODE SIMULATION — REAL BROWSER ENGINE WILL BE CONNECTED IN PHASE 2
        </div>
      </footer>
    </div>
  );
}

export default App;
