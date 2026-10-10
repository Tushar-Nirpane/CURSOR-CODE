import React from 'react';
import { Terminal, Shield, Cpu, Play, CheckCircle, Bug, Sparkles } from 'lucide-react';

interface ActivityLogItem {
  id: string;
  timestamp: string;
  agentLabel: string;
  agentColor: string;
  message: string;
  type: 'info' | 'warn' | 'error' | 'success';
}

interface ActivityPanelProps {
  logs: ActivityLogItem[];
  sessionStatus: string;
}

export const ActivityPanel: React.FC<ActivityPanelProps> = ({ logs, sessionStatus }) => {
  return (
    <div className="w-full bg-slate-950/90 border border-slate-800 rounded-xl overflow-hidden shadow-xl flex flex-col text-left">
      {/* Panel Header */}
      <div className="bg-slate-900/90 border-b border-slate-800 px-3 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-xs font-bold text-slate-200 font-among">
            LIVE CREWMATE TELEMETRY STREAM
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-slate-400">
            {logs.length} entries
          </span>
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </div>

      {/* Log Entries List */}
      <div className="p-2.5 h-36 sm:h-44 overflow-y-auto space-y-1.5 font-mono text-[11px] selection:bg-cyan-500 selection:text-black">
        {logs.length === 0 ? (
          <div className="h-full flex items-center justify-center text-slate-500 text-xs">
            Awaiting task dispatch. Telemetry stream will initialize upon session start.
          </div>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className="flex items-start gap-2 py-0.5 hover:bg-slate-900/60 px-1 rounded transition-colors"
            >
              <span className="text-slate-500 shrink-0 text-[10px]">{log.timestamp}</span>
              <span
                className="px-1 rounded text-[9px] font-bold shrink-0 uppercase border border-black/30"
                style={{
                  backgroundColor: `${log.agentColor}22`,
                  color: log.agentColor,
                  borderColor: `${log.agentColor}66`
                }}
              >
                {log.agentLabel}
              </span>
              <span
                className={`truncate ${
                  log.type === 'error'
                    ? 'text-rose-400 font-semibold'
                    : log.type === 'warn'
                    ? 'text-amber-300'
                    : log.type === 'success'
                    ? 'text-emerald-300 font-semibold'
                    : 'text-slate-300'
                }`}
              >
                {log.message}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
