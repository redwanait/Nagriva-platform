export type KnowledgeType = 'file';

export type KnowledgeStatus = 'processed' | 'processing' | 'failed';

export interface KnowledgeItem {
  id: string;
  owner_id: string;
  employee_id: string;
  client_id: string | null;
  name: string;
  file_url: string | null;
  file_type: string | null;
  file_size: number | null;
  status: KnowledgeStatus;
  chunk_count: number | null;
  knowledge_type: KnowledgeType;
  content: string | null;
  source_url: string | null;
  faq_question: string | null;
  faq_answer: string | null;
  processed_at: string | null;
  embedding_status: string | null;
  indexed: boolean | null;
  created_at: string;
}

export const ALLOWED_FILE_TYPES = ['pdf', 'docx', 'txt'] as const;

export const MAX_FILE_SIZE_MB = 50;

export const STORAGE_BUCKET = 'knowledge-file';

export const STORAGE_PATH_PREFIX = 'ai-employees';
