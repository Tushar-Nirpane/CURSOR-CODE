export type AgentRole =
  | 'receptionist'
  | 'backend_api'
  | 'frontend_func'
  | 'cybersecurity'
  | 'privacy_data'
  | 'performance'
  | 'integration_edge'
  | 'reporting_officer';

export type AgentStatus = 'idle' | 'assigned' | 'testing' | 'submitting' | 'done' | 'failed';

export interface AgentConfig {
  id: AgentRole;
  name: string;
  shortLabel: string;
  title: string;
  specialty: string;
  color: string; // Hex color for crewmate body
  darkColor: string; // Dark shade for outline/shadow
  visorColor: string;
  tag: string; // e.g. "DECIMAL", "ELOCDNAL", "REVIVE", etc.
  hat?: 'fedora' | 'headset' | 'goggles' | 'shield' | 'lock' | 'cap' | 'tie' | 'none';
  position: { x: number; y: number }; // percentage inside cafeteria
  facing: 'left' | 'right';
  description: string;
}

export interface BugFinding {
  id: string;
  agentRole: AgentRole;
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  impact: string;
  suggestedFix: string;
  codeSnippet?: string;
}

export interface AgentReport {
  agentRole: AgentRole;
  status: AgentStatus;
  progress: number; // 0 to 100
  scenariosTested: number;
  bugsFound: number;
  severityScore: number; // 0 to 100%
  findings: BugFinding[];
  logs: string[];
}

export interface RecommendationCard {
  id: string;
  category: 'Bug Fix' | 'Security & Privacy' | 'Performance & Remediation';
  title: string;
  summary: string;
  priority: 'High' | 'Medium' | 'Low';
  details: string;
}

export interface TestSessionState {
  status: 'idle' | 'dispatching' | 'testing' | 'consolidating' | 'completed' | 'failed';
  url: string;
  expectedBehavior: string;
  startedAt?: number;
  completedAt?: number;
  totalProgress: number; // 0 to 100
  overallHealthScore: number;
  totalBugs: number;
  totalScenarios: number;
  simulateFailure: boolean;
  speedMultiplier: number; // 1 or 2
  activeInspectorAgent?: AgentRole;
}

export interface OfficerChatMessage {
  id: string;
  sender: 'user' | 'officer';
  text: string;
  timestamp: string;
  suggestedActions?: string[];
}
