import { AgentConfig, AgentReport, RecommendationCard, BugFinding } from '../types/qa';

export const AGENT_CONFIGS: Record<string, AgentConfig> = {
  receptionist: {
    id: 'receptionist',
    name: 'Clerk Celeste',
    shortLabel: 'CLERK',
    title: 'Intake Receptionist',
    specialty: 'Requirement Extraction & Workflow Dispatch',
    color: '#f43f5e', // Vibrant Pink / Rose
    darkColor: '#be123c',
    visorColor: '#34d399',
    tag: 'INTAKE',
    hat: 'headset',
    position: { x: 18, y: 35 },
    facing: 'right',
    description: 'Validates target URLs, breaks down test specs, and broadcasts task matrices to the specialist team.'
  },
  backend_api: {
    id: 'backend_api',
    name: 'Spec-01: API',
    shortLabel: 'API',
    title: 'Backend & API Tester',
    specialty: 'REST/GraphQL Endpoints, Schema & Payloads',
    color: '#4d7c0f', // Olive/Forest Green like reference image
    darkColor: '#365314',
    visorColor: '#34d399',
    tag: 'DECIMAL',
    hat: 'explorer', // Brown explorer slouch hat with laptop!
    position: { x: 34, y: 46 },
    facing: 'right',
    description: 'Fuzzes input payloads, verifies HTTP response status codes, and audits rate-limiting thresholds.'
  },
  frontend_func: {
    id: 'frontend_func',
    name: 'Spec-02: Functional',
    shortLabel: 'FUNCTIONAL',
    title: 'Frontend & Functional Tester',
    specialty: 'User Journeys, DOM State & Cross-Browser UI',
    color: '#ec4899', // Pink robot with glowing green shield emblem
    darkColor: '#be185d',
    visorColor: '#34d399',
    tag: 'ELOCDNAL',
    hat: 'shield',
    position: { x: 44, y: 34 },
    facing: 'right',
    description: 'Simulates user clickstreams, checks form validation cues, and detects unhandled JS exceptions.'
  },
  cybersecurity: {
    id: 'cybersecurity',
    name: 'Spec-03: Security',
    shortLabel: 'SECURITY',
    title: 'Cybersecurity Tester',
    specialty: 'XSS, CSRF, Header Audits & Auth Bypass',
    color: '#334155', // Charcoal Grey with dark fedora & notepad
    darkColor: '#1e293b',
    visorColor: '#34d399',
    tag: 'REVIVE',
    hat: 'fedora',
    position: { x: 57, y: 34 },
    facing: 'left',
    description: 'Probes CSP violations, cookie security flags, SQLi vectors, and sensitive endpoint exposures.'
  },
  privacy_data: {
    id: 'privacy_data',
    name: 'Spec-04: Privacy',
    shortLabel: 'PRIVACY',
    title: 'Privacy & Data Integrity Tester',
    specialty: 'GDPR, Tracker Leaks & LocalStorage PII',
    color: '#eab308', // Yellow/Gold robot at table
    darkColor: '#a16207',
    visorColor: '#34d399',
    tag: 'REIME',
    hat: 'lock',
    position: { x: 67, y: 46 },
    facing: 'left',
    description: 'Inspects third-party telemetry beacons, unmasked PII storage, and cookie consent enforcement.'
  },
  performance: {
    id: 'performance',
    name: 'Spec-05: Performance',
    shortLabel: 'PERFORMANCE',
    title: 'Performance & Resilience Tester',
    specialty: 'Lighthouse, Core Web Vitals & Spike Load',
    color: '#e2e8f0', // Crisp White/Slate Suit with mint CRT screen
    darkColor: '#94a3b8',
    visorColor: '#34d399',
    tag: 'REWP',
    hat: 'none',
    position: { x: 62, y: 64 },
    facing: 'left',
    description: 'Measures LCP, CLS, TTFB under throttled networks, and benchmarks server stress limits.'
  },
  integration_edge: {
    id: 'integration_edge',
    name: 'Spec-06: Integration',
    shortLabel: 'INTEGRATION',
    title: 'Full-Stack Integration & Edge-Case Tester',
    specialty: 'Race Conditions, Payment Webhooks & Offline Sync',
    color: '#dc2626', // Red robot with headphones & gauge
    darkColor: '#991b1b',
    visorColor: '#34d399',
    tag: 'SYNAPSE',
    hat: 'headset',
    position: { x: 39, y: 64 },
    facing: 'right',
    description: 'Tests asynchronous event queues, idempotency keys, boundary values, and intermittent disconnects.'
  },
  reporting_officer: {
    id: 'reporting_officer',
    name: 'Chief Inspector Vance',
    shortLabel: 'OFFICER',
    title: 'Reporting Officer',
    specialty: 'Consolidated Findings, Fix Verification & AI Dialogue',
    color: '#1e293b', // Dark Charcoal Detective with fedora & notepad
    darkColor: '#0f172a',
    visorColor: '#34d399',
    tag: 'COMMAND',
    hat: 'fedora',
    position: { x: 84, y: 42 },
    facing: 'left',
    description: 'Collates all six telemetry streams into an executive summary, prioritizes remediation, and answers questions.'
  }
};

export const PRESET_TARGETS = [
  {
    url: 'https://shopflow-enterprise.io/checkout',
    name: 'E-Commerce Storefront',
    behavior: 'Users should be able to apply promo codes, choose express shipping, and complete Stripe checkout without double-charging.'
  },
  {
    url: 'https://auth.cloudvault.net/workspace',
    name: 'SaaS Multi-tenant Portal',
    behavior: 'Session cookies must be HttpOnly and SameSite=Strict; team member invitation link must validate RBAC roles before granting access.'
  },
  {
    url: 'https://apex-banking.dev/transfer',
    name: 'FinTech Wire Transfer',
    behavior: 'High-value funds transfers must enforce 2FA verification step and prevent replay requests under flaky network conditions.'
  }
];

export const MOCK_FINDINGS: Record<string, BugFinding[]> = {
  backend_api: [
    {
      id: 'API-101',
      agentRole: 'backend_api',
      title: '500 Internal Error on Unescaped Unicode in /api/v2/cart',
      description: 'Payload with emoji/special glyphs causes unhandled JSON parse crash in backend upstream gateway.',
      severity: 'high',
      impact: 'Blocks checkout for international buyers with multi-byte names.',
      suggestedFix: 'Enforce UTF-8 byte boundary normalization before dispatching to legacy payment serializer.',
      codeSnippet: 'app.use(express.json({ verify: (req, res, buf) => { Buffer.isUtf8(buf) } }));'
    },
    {
      id: 'API-102',
      agentRole: 'backend_api',
      title: 'Missing Idempotency-Key validation on POST /orders',
      description: 'Duplicate network submissions within 300ms trigger multiple order numbers.',
      severity: 'critical',
      impact: 'Causes double billing when users tap checkout button repeatedly on 3G connections.',
      suggestedFix: 'Implement Redis distributed lock keyed on Idempotency-Key header for 60 seconds.',
      codeSnippet: 'const lock = await redis.set(`idemp:${key}`, 1, "NX", "EX", 60);'
    }
  ],
  frontend_func: [
    {
      id: 'UI-201',
      agentRole: 'frontend_func',
      title: 'Promo Code Modal trapped in infinite re-render on iOS Safari',
      description: 'ResizeObserver loop triggers "Maximum update depth exceeded" during keyboard slide-up.',
      severity: 'medium',
      impact: 'Mobile users cannot dismiss modal or submit discount coupons.',
      suggestedFix: 'Debounce window resize listener and memoize modal bounds calculation.'
    },
    {
      id: 'UI-202',
      agentRole: 'frontend_func',
      title: 'Submit button remains disabled after resolving form validation errors',
      description: 'State machine fails to trigger validity check when field is autofilled by browser.',
      severity: 'high',
      impact: 'Autofill users get stuck on payment step.',
      suggestedFix: 'Add animationstart event listener to detect browser autofill injection.'
    }
  ],
  cybersecurity: [
    {
      id: 'SEC-301',
      agentRole: 'cybersecurity',
      title: 'CORS Wildcard (*) with Access-Control-Allow-Credentials: true',
      description: 'Origin header reflection allows malicious cross-origin scripts to read authenticated session data.',
      severity: 'critical',
      impact: 'Account takeover risk via malicious third-party site embedding an iframe.',
      suggestedFix: 'Whitelist exact trusted domains in CORS middleware instead of reflecting arbitrary Origin headers.'
    },
    {
      id: 'SEC-302',
      agentRole: 'cybersecurity',
      title: 'Missing Content-Security-Policy (CSP) header on main document',
      description: 'Absence of CSP exposes DOM to untrusted script injection.',
      severity: 'medium',
      impact: 'Increases blast radius if any third-party script gets compromised.',
      suggestedFix: "Set default-src 'self'; script-src 'self' 'nonce-...'; object-src 'none';"
    }
  ],
  privacy_data: [
    {
      id: 'PRV-401',
      agentRole: 'privacy_data',
      title: 'Credit card expiration date logged in plain text in localStorage',
      description: 'Form persistence helper saves card_exp and customer_phone directly into unencrypted browser storage.',
      severity: 'high',
      impact: 'Violates PCI-DSS SAQ A-EP and GDPR Article 32 requirements.',
      suggestedFix: 'Filter out payment and PII fields from local storage persistence whitelist.'
    }
  ],
  performance: [
    {
      id: 'PERF-501',
      agentRole: 'performance',
      title: 'LCP Exceeds 4.8s due to unoptimized 4.2MB Hero Banner',
      description: 'PNG image served at 3840x2160 without modern WebP/AVIF formatting or responsive srcsets.',
      severity: 'medium',
      impact: 'High bounce rate on cellular devices, penalizes Google search SEO ranking.',
      suggestedFix: 'Serve responsive AVIF with widths 640w, 1024w, 1920w with priority fetchpriority="high".'
    },
    {
      id: 'PERF-502',
      agentRole: 'performance',
      title: 'Main thread blocked for 680ms by unchunked analytics bundle',
      description: 'Heavy tracking bundle evaluates immediately during critical DOM parsing.',
      severity: 'low',
      impact: 'Laggy interaction to next paint (INP) score above 320ms.',
      suggestedFix: 'Load third-party analytics via Web Worker or defer with requestIdleCallback.'
    }
  ],
  integration_edge: [
    {
      id: 'INT-601',
      agentRole: 'integration_edge',
      title: 'Webhook race condition between Stripe charge.succeeded and order.created',
      description: 'When webhook arrives before order DB insert finishes, payment status remains pending forever.',
      severity: 'high',
      impact: 'Customer pays money but does not receive order confirmation email or product fulfillment.',
      suggestedFix: 'Buffer webhooks in SQS/BullMQ with exponential backoff retry when order ID is not found.'
    }
  ]
};

export const RECOMMENDATIONS: RecommendationCard[] = [
  {
    id: 'REC-01',
    category: 'Bug Fix',
    title: 'Patch Idempotency Lock & Unicode Handler',
    summary: 'Prevent double-billing on rapid clicks and handle multi-byte Unicode in payload parsers.',
    priority: 'High',
    details: 'Inject a Redis distributed lock middleware on /orders and wrap JSON parsing in safe buffer boundary guards.'
  },
  {
    id: 'REC-02',
    category: 'Security & Privacy',
    title: 'Harden CORS Whitelist & Purge LocalStorage PII',
    summary: 'Eliminate CORS origin reflection and remove card data caching in client browser storage.',
    priority: 'High',
    details: 'Configure strict origin array in CORS header options and exclude sensitive fields from the client form draft reducer.'
  },
  {
    id: 'REC-03',
    category: 'Performance & Remediation',
    title: 'Image Compression & Webhook Queue Buffering',
    summary: 'Cut LCP by 65% with AVIF picture elements and add retry backoff for asynchronous billing webhooks.',
    priority: 'Medium',
    details: 'Implement automated Sharp image pipeline on CDN and route Stripe webhooks through an idempotent retry queue.'
  }
];

export const INITIAL_OFFICER_CHAT = [
  {
    id: 'msg-1',
    sender: 'officer' as const,
    text: "Greetings, Captain. Chief Inspector Vance here. I've consolidated telemetry from all 6 testing agents into this central terminal. Feel free to inspect individual agent matrices or ask me for root-cause diagnoses.",
    timestamp: 'Just now',
    suggestedActions: [
      'What is the highest severity bug?',
      'Can you explain the double-billing risk?',
      'How do we fix the CORS security issue?',
      'Summarize executive recommendations'
    ]
  }
];
