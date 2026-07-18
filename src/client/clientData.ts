/* ── Types ── */

export type ClientSection =
  | 'dashboard'
  | 'ai-employees'
  | 'ai-employees/new'
  | 'ai-employees/manage'
  | 'conversations'
  | 'knowledge-base'
  | 'integrations'
  | 'usage'
  | 'billing'
  | 'settings'
  | 'help-center';

export interface AIEmployee {
  id: string;
  name: string;
  status: 'online' | 'offline';
  website: string;
  whatsappStatus: 'connected' | 'disconnected';
  lastActivity: string;
  avatarColor: string;
}

export interface Conversation {
  id: string;
  customer: string;
  customerInitials: string;
  aiEmployee: string;
  date: string;
  status: 'active' | 'resolved' | 'pending';
  messagePreview: string;
}

export interface StatCard {
  label: string;
  value: string;
  changeType?: 'up' | 'down';
  change?: string;
}

export interface EmployeePageEmployee {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'paused' | 'training' | 'offline';
  created_at: string;
  conversationCount: number;
  website: string | null;
  avatarColor: string;
}

export interface ClientConversation {
  id: string;
  visitor_name: string;
  visitor_email?: string;
  visitor_phone?: string;
  ai_employee_name: string;
  ai_employee_id?: string;
  last_message: string;
  status: 'active' | 'resolved' | 'pending';
  message_count: number;
  updated_at: string;
  client_id?: string;
}

export interface Message {
  id: string;
  conversation_id: string;
  role: 'visitor' | 'employee';
  content: string;
  created_at: string;
}

export interface UsageData {
  messagesUsed: number;
  messagesLimit: number;
  storageUsed: number;
  storageLimit: number;
  currentPlan: string;
  renewalDate: string;
  apiRequests: number;
  apiLimit: number;
}
