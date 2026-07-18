export type ChangelogCategory =
  | 'All'
  | 'New'
  | 'Improved'
  | 'Fixed'
  | 'Security'
  | 'Breaking Change';

export interface ChangelogEntry {
  id: string;
  version: string;
  title: string;
  date: string;
  category: Exclude<ChangelogCategory, 'All'>;
  summary: string;
  details: string[];
}

export type UpcomingStatus = 'In Progress' | 'Planned' | 'Research';

export interface UpcomingFeature {
  title: string;
  description: string;
  status: UpcomingStatus;
  icon: string;
}

export type IdeaStatus = 'Released' | 'In Progress' | 'Under Review';

export interface CommunityIdea {
  id: string;
  title: string;
  description: string;
  status: IdeaStatus;
  votes: number;
}

export interface CommunityStat {
  label: string;
  value: number;
}

export interface Achievement {
  title: string;
  source: string;
}

export const filterCategories: ChangelogCategory[] = [
  'All',
  'New',
  'Improved',
  'Fixed',
  'Security',
  'Breaking Change',
];

export const changelogEntries: ChangelogEntry[] = [
  {
    id: '1',
    version: '1.0.0',
    title: 'Public Platform Launch',
    date: 'July 2026',
    category: 'New',
    summary:
      'Nagriva is officially live. Deploy AI Employees, build Knowledge Bases, manage conversations, and automate your business — all from one platform.',
    details: [
      'AI Employees — Create and manage autonomous AI agents for support, sales, and operations',
      'Knowledge Base — Upload documents, URLs, and text to train your AI on your business data',
      'Conversations — Real-time chat interface with AI Employees and full conversation history',
      'Dashboard — Unified analytics, employee management, and settings in one place',
      'Integrations — Connect Slack, HubSpot, WhatsApp, and more',
      'Billing — Flexible subscription plans with usage-based pricing',
      'Notifications — Real-time alerts for conversations, system events, and billing',
      'Authentication — Secure sign-up, sign-in, password recovery, and session management',
    ],
  },
  {
    id: '2',
    version: '0.9.0',
    title: 'Dashboard Improvements',
    date: 'June 2026',
    category: 'Improved',
    summary:
      'A major overhaul of the dashboard experience with better analytics, faster loading times, and a completely redesigned onboarding flow.',
    details: [
      'Redesigned analytics dashboard with real-time metrics and trend charts',
      'New onboarding wizard for first-time users',
      'Dashboard page load time reduced by 40%',
      'Simplified navigation with collapsible sidebar',
      'Improved data visualization across all charts',
      'Better mobile responsiveness on dashboard pages',
    ],
  },
  {
    id: '3',
    version: '0.8.0',
    title: 'Security Update',
    date: 'May 2026',
    category: 'Security',
    summary:
      'Critical security improvements including stronger authentication, enhanced session management, and tighter permission controls.',
    details: [
      'Upgraded authentication system with enhanced token validation',
      'Improved session management with automatic expiry and refresh',
      'Stronger role-based permissions for admin and client dashboards',
      'Added rate limiting to all API endpoints',
    ],
  },
  {
    id: '4',
    version: '0.7.0',
    title: 'Bug Fix Release',
    date: 'April 2026',
    category: 'Fixed',
    summary:
      'Stability-focused release addressing navigation issues, performance bottlenecks, and responsive layout problems.',
    details: [
      'Fixed navigation menu not closing on mobile after link click',
      'Resolved performance degradation when loading large conversation histories',
      'Fixed responsive layout issues on tablets and small laptops',
      'Corrected timezone handling in analytics date ranges',
      'Fixed email validation not accepting valid international domains',
    ],
  },
  {
    id: '5',
    version: '0.6.0',
    title: 'Knowledge Base Enhancements',
    date: 'March 2026',
    category: 'New',
    summary:
      'Expanded Knowledge Base capabilities with new file types, improved search, and better AI retrieval accuracy.',
    details: [
      'Support for PDF, DOCX, and TXT file uploads',
      'URL scraping for automatic knowledge extraction',
      'Improved RAG retrieval with better relevance scoring',
      'Knowledge processing speed increased by 3x',
      'Better error handling for unsupported file formats',
    ],
  },
  {
    id: '6',
    version: '0.5.0',
    title: 'Integrations Launch',
    date: 'February 2026',
    category: 'New',
    summary:
      'First wave of third-party integrations including Slack, HubSpot, and webhooks for custom workflows.',
    details: [
      'Slack integration — Deploy AI Employees directly in Slack channels',
      'HubSpot integration — Sync contacts and conversation data with your CRM',
      'Webhook support — Receive real-time event notifications for custom workflows',
      'Unified integration settings page',
    ],
  },
];

export const upcomingFeatures: UpcomingFeature[] = [
  {
    title: 'Voice AI',
    description: 'Enable AI Employees to handle voice calls with natural language processing.',
    status: 'Research',
    icon: 'mic',
  },
  {
    title: 'WhatsApp Integration',
    description: 'Deploy AI Employees directly in WhatsApp for instant customer support.',
    status: 'In Progress',
    icon: 'message-circle',
  },
  {
    title: 'Workflow Automation',
    description: 'Build custom workflows with triggers, conditions, and automated actions.',
    status: 'In Progress',
    icon: 'workflow',
  },
  {
    title: 'Marketplace',
    description: 'Discover and install pre-built AI Employee templates and integrations.',
    status: 'Planned',
    icon: 'store',
  },
  {
    title: 'Public API',
    description: 'Full REST API with comprehensive documentation for custom integrations.',
    status: 'Planned',
    icon: 'code',
  },
  {
    title: 'Team Collaboration',
    description: 'Invite team members, assign roles, and manage access together.',
    status: 'In Progress',
    icon: 'users',
  },
];

export const communityIdeas: CommunityIdea[] = [
  {
    id: 'r1',
    title: 'Dashboard Notifications',
    description: 'Real-time notification center with customizable alerts and preferences.',
    status: 'Released',
    votes: 47,
  },
  {
    id: 'r2',
    title: 'Knowledge Base Search',
    description: 'Full-text search across all knowledge base documents with filters.',
    status: 'Released',
    votes: 39,
  },
  {
    id: 'r3',
    title: 'Improved AI Employee Training',
    description: 'Better tools for training and fine-tuning AI Employee responses.',
    status: 'Released',
    votes: 52,
  },
  {
    id: 'r4',
    title: 'Performance Improvements',
    description: 'Faster page loads, optimized queries, and reduced memory usage.',
    status: 'Released',
    votes: 34,
  },
  {
    id: 'r5',
    title: 'Advanced Analytics',
    description: 'Deep insights with custom reports, trend analysis, and data exports.',
    status: 'Released',
    votes: 41,
  },
  {
    id: 'ip1',
    title: 'WhatsApp Integration',
    description: 'Connect AI Employees to WhatsApp for omnichannel customer support.',
    status: 'In Progress',
    votes: 68,
  },
  {
    id: 'ip2',
    title: 'Voice AI',
    description: 'Voice-based AI interactions for phone support and hands-free use.',
    status: 'In Progress',
    votes: 55,
  },
  {
    id: 'ip3',
    title: 'Workflow Automation',
    description: 'Visual workflow builder for automating business processes.',
    status: 'In Progress',
    votes: 43,
  },
  {
    id: 'ip4',
    title: 'Public API Improvements',
    description: 'Extended API endpoints with better documentation and SDKs.',
    status: 'In Progress',
    votes: 38,
  },
  {
    id: 'ip5',
    title: 'Team Collaboration',
    description: 'Multi-user workspace with roles, permissions, and shared resources.',
    status: 'In Progress',
    votes: 51,
  },
  {
    id: 'ur1',
    title: 'Telegram Integration',
    description: 'Deploy AI Employees in Telegram channels and groups.',
    status: 'Under Review',
    votes: 29,
  },
  {
    id: 'ur2',
    title: 'AI Marketplace',
    description: 'A marketplace for sharing and discovering AI Employee templates.',
    status: 'Under Review',
    votes: 33,
  },
  {
    id: 'ur3',
    title: 'Multi-language AI Employees',
    description: 'Support for 50+ languages with automatic language detection.',
    status: 'Under Review',
    votes: 44,
  },
  {
    id: 'ur4',
    title: 'Custom AI Templates',
    description: 'Create and share custom AI Employee templates with the community.',
    status: 'Under Review',
    votes: 27,
  },
  {
    id: 'ur5',
    title: 'Advanced Team Permissions',
    description: 'Granular role-based access control with custom permission sets.',
    status: 'Under Review',
    votes: 31,
  },
];

export const communityStats: CommunityStat[] = [
  { label: 'Ideas Submitted', value: 184 },
  { label: 'Released', value: 42 },
  { label: 'In Progress', value: 16 },
  { label: 'Under Review', value: 58 },
];

export const achievements: Achievement[] = [
  { title: 'Faster Dashboard Loading', source: 'Requested by users' },
  { title: 'Better Knowledge Base', source: 'Community request' },
  { title: 'Improved Notifications', source: 'Requested by customers' },
];

export const featureCategories = [
  'Feature Request',
  'Improvement',
  'Bug Report',
  'Integration',
  'Other',
];
