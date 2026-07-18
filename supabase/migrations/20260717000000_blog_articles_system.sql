-- ============================================================
-- Blog Articles System
-- Run this in Supabase SQL Editor to set up the blog system.
-- ============================================================

-- 1. Create articles table (skip if already exists)
-- ============================================================
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL DEFAULT '',
  content TEXT NOT NULL DEFAULT '',
  cover_image TEXT NOT NULL DEFAULT '',
  image_url TEXT NOT NULL DEFAULT '',
  category TEXT NOT NULL DEFAULT 'General',
  author TEXT NOT NULL DEFAULT '',
  author_name TEXT NOT NULL DEFAULT '',
  read_time INTEGER,
  reading_time TEXT NOT NULL DEFAULT '5 min read',
  featured BOOLEAN NOT NULL DEFAULT false,
  status TEXT NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  read_count INTEGER NOT NULL DEFAULT 0,
  pinterest_posted BOOLEAN NOT NULL DEFAULT false,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT[] DEFAULT '{}',
  canonical_url TEXT,
  og_image TEXT
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles (slug);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles (status);
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles (category);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles (published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_featured ON articles (featured) WHERE featured = true;

-- 2. Auto-update updated_at on row changes
-- ============================================================
CREATE OR REPLACE FUNCTION update_articles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS articles_updated_at_trigger ON articles;
CREATE TRIGGER articles_updated_at_trigger
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_articles_updated_at();

-- 3. RPC: increment_read_count (called from useArticle.ts)
-- ============================================================
CREATE OR REPLACE FUNCTION increment_read_count(article_slug TEXT)
RETURNS VOID AS $$
BEGIN
  UPDATE articles
  SET read_count = read_count + 1
  WHERE slug = article_slug;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 4. Enable Row Level Security
-- ============================================================
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- Public can read published articles
DROP POLICY IF EXISTS "Public can read published articles" ON articles;
CREATE POLICY "Public can read published articles"
  ON articles
  FOR SELECT
  TO anon
  USING (status = 'published');

-- Authenticated users (admins) can do everything
DROP POLICY IF EXISTS "Authenticated can manage articles" ON articles;
CREATE POLICY "Authenticated can manage articles"
  ON articles
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Anon can also read published articles (for the public blog)
DROP POLICY IF EXISTS "Anon can read published articles" ON articles;
CREATE POLICY "Anon can read published articles"
  ON articles
  FOR SELECT
  TO anon
  USING (status = 'published');

-- 5. Fix reading_time column if it exists as INTEGER (from prior table creation)
-- ============================================================
DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'articles' AND column_name = 'reading_time' AND data_type = 'integer'
  ) THEN
    ALTER TABLE articles
      ALTER COLUMN reading_time TYPE TEXT
      USING CASE
        WHEN reading_time IS NULL THEN '5 min read'
        ELSE reading_time || ' min read'
      END;
  END IF;
END $$;

-- 6. Seed: 9 blog posts migrated from blogData.ts
-- ============================================================
INSERT INTO articles (title, slug, excerpt, content, cover_image, category, author_name, author, published_at, reading_time, featured, status, seo_title, seo_description, seo_keywords)
VALUES
  (
    'How AI Employees Are Reshaping Customer Support in 2026',
    'ai-employees-reshaping-customer-support',
    'Explore how autonomous AI Employees are transforming the customer support landscape — reducing response times by 90% while improving satisfaction scores across industries.',
    '<h2>The End of Traditional Support</h2><p>Customer support is undergoing its biggest transformation since the invention of the call center. AI Employees — autonomous, intelligent agents trained on your company''s knowledge — are redefining what''s possible.</p><h2>90% Faster Response Times</h2><p>Across 500+ deployments, Nagriva AI Employees handle initial customer queries in under 3 seconds, compared to the industry average of 42 seconds for human agents. But speed isn''t the story — accuracy is.</p><h2>Quality Over Speed</h2><p>AI Employees don''t just answer faster — they answer better. By drawing from your entire knowledge base, they deliver consistent, accurate responses every time. No bad days, no training gaps, no hold music.</p><h2>What This Means for Your Team</h2><p>The result isn''t replacement — it''s elevation. Human agents focus on complex, high-value interactions while AI handles the repetitive queries that cause burnout. Teams become more productive, more satisfied, and more effective.</p>',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80',
    'AI',
    'Sarah Chen',
    'sarah',
    '2026-07-10T00:00:00Z',
    '8 min read',
    true,
    'published',
    'How AI Employees Are Reshaping Customer Support in 2026 | Nagriva',
    'Learn how autonomous AI Employees are transforming customer support — reducing response times by 90% while improving satisfaction.',
    ARRAY['AI', 'Customer Support', 'Automation', 'AI Employees']
  ),
  (
    'The Complete Guide to Building Your First AI-Powered Workflow',
    'building-first-ai-workflow',
    'A step-by-step guide to creating automated workflows with AI Employees — from onboarding to deployment, with real-world examples and best practices.',
    '<h2>Why AI Workflows Matter</h2><p>Most teams start with a single AI Employee handling one task. But the real power comes when you chain these employees into automated workflows that span your entire business process.</p><h2>Step 1: Map Your Current Process</h2><p>Before deploying AI, document every step in your current workflow. Identify handoffs, bottlenecks, and repetitive tasks. These are your first automation candidates.</p><h2>Step 2: Start Small</h2><p>Pick one high-volume, low-complexity task. Customer support triage, appointment scheduling, or lead qualification are ideal starting points.</p><h2>Step 3: Connect and Scale</h2><p>Once your first AI Employee is live, connect it to the next process in the chain. Build incrementally, measure results, and expand.</p>',
    'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&q=80',
    'Automation',
    'Marcus Williams',
    'marcus',
    '2026-07-05T00:00:00Z',
    '12 min read',
    false,
    'published',
    'Building Your First AI-Powered Workflow | Nagriva Guide',
    'Step-by-step guide to creating automated workflows with AI Employees for maximum productivity.',
    ARRAY['Automation', 'Productivity', 'Getting Started', 'AI Workflow']
  ),
  (
    '5 Ways AI Can Supercharge Your Marketing Strategy',
    'ai-marketing-strategy',
    'From personalized campaigns to predictive analytics — discover how AI Employees can 10x your marketing output without expanding your team.',
    '<h2>Marketing''s New AI Backbone</h2><p>The marketing teams seeing 10x output aren''t hiring 10x more people. They''re deploying AI Employees to handle the heavy lifting of content creation, distribution, and analytics.</p><h2>1. Personalized Campaigns at Scale</h2><p>AI Employees can generate thousands of personalized email variants, landing pages, and social posts — each tailored to specific audience segments.</p><h2>2. Predictive Lead Scoring</h2><p>Instead of guessing which leads are hot, AI analyzes engagement patterns and scores leads in real time, so your sales team focuses on the right prospects.</p><h2>3. Content Repurposing</h2><p>Turn one blog post into 20 pieces of content: social posts, email sequences, video scripts, infographics. AI handles the transformation while you maintain brand voice.</p>',
    'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&q=80',
    'Marketing',
    'Elena Rodriguez',
    'elena',
    '2026-06-28T00:00:00Z',
    '6 min read',
    false,
    'published',
    'AI Marketing Strategy: 5 Ways to 10x Your Output | Nagriva',
    'Discover how AI Employees can transform your marketing strategy with personalized campaigns and predictive analytics.',
    ARRAY['Marketing', 'AI', 'Growth', 'Content Marketing']
  ),
  (
    'Introducing Nagriva API v1: Build with Our AI Platform',
    'nagriva-api-v1-launch',
    'We''re excited to launch the Nagriva API. Programmatically create AI Employees, manage Knowledge Bases, send messages, and build custom integrations.',
    '<h2>API-First, Developer-Friendly</h2><p>Nagriva API v1 gives you full programmatic access to every feature of our AI Employee platform. Build custom integrations, automate employee management, and embed AI into any workflow.</p><h2>Key Endpoints</h2><p><strong>Employees:</strong> Create, update, and manage AI Employees via <code>/v1/employees</code>. Configure knowledge bases, set response parameters, and monitor performance.</p><p><strong>Messages:</strong> Send messages to any AI Employee via <code>/v1/messages</code> and receive structured responses.</p><p><strong>Knowledge:</strong> Upload documents, manage knowledge bases, and control what your AI Employees know.</p><h2>Getting Started</h2><p>Generate your API key in the Nagriva dashboard under Settings → API. All requests use standard Bearer token authentication.</p>',
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80',
    'Product',
    'James O''Brien',
    'james',
    '2026-07-14T00:00:00Z',
    '5 min read',
    false,
    'published',
    'Nagriva API v1 Launch: Build with Our AI Platform | Nagriva',
    'Launch of the Nagriva API — programmatically create AI Employees and build custom integrations.',
    ARRAY['Product', 'API', 'Engineering', 'Developer']
  ),
  (
    'Understanding RAG: How AI Employees Use Your Knowledge Base',
    'understanding-rag-knowledge-base',
    'A deep dive into Retrieval-Augmented Generation and how Nagriva uses it to make your AI Employees experts on your business, products, and policies.',
    '<h2>What is RAG?</h2><p>Retrieval-Augmented Generation (RAG) is the technology that makes AI Employees genuinely useful for businesses. Instead of relying solely on general knowledge, RAG lets your AI retrieve and reference your specific documents, policies, and data.</p><h2>How Nagriva Implements RAG</h2><p>When a customer asks a question, Nagriva''s AI Employee searches your knowledge base for the most relevant information, then generates a response grounded in that context. No hallucinations, no guessing — just accurate answers from your actual data.</p><h2>The Knowledge Pipeline</h2><p>Your documents are chunked, embedded, and indexed into a vector database. When a query arrives, semantic search finds the closest matches, which are then injected into the AI''s context window for response generation.</p><h2>Why This Matters</h2><p>RAG is the difference between a generic chatbot and an AI Employee that actually knows your business. It''s what makes Nagriva deployments successful across industries.</p>',
    'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80',
    'Engineering',
    'Priya Sharma',
    'priya',
    '2026-06-20T00:00:00Z',
    '10 min read',
    false,
    'published',
    'Understanding RAG: How AI Uses Your Knowledge Base | Nagriva',
    'Deep dive into Retrieval-Augmented Generation and how Nagriva makes your AI Employees domain experts.',
    ARRAY['AI', 'Engineering', 'Technology', 'RAG', 'Knowledge Base']
  ),
  (
    'Nagriva Raises Series A to Accelerate AI Employee Platform',
    'nagriva-series-a',
    'We''re thrilled to announce our Series A funding round. This investment will fuel product development, expand our team, and accelerate customer growth globally.',
    '<h2>A Major Milestone</h2><p>Today we''re announcing our Series A funding round, led by top-tier investors who share our vision of AI Employees as the future of work. This is a milestone for our team, our customers, and the AI Employee category.</p><h2>What We''ll Build</h2><p>This investment accelerates three key areas: deeper AI capabilities, expanded integrations, and enterprise-grade security features. Our roadmap for the next 18 months is ambitious — and now fully funded.</p><h2>Gratitude</h2><p>None of this would be possible without our early customers who believed in the AI Employee vision before it was mainstream. Thank you for building with us.</p>',
    'https://images.unsplash.com/photo-1559136555-9303baea8ebd?w=800&q=80',
    'News',
    'Marcus Williams',
    'marcus',
    '2026-07-01T00:00:00Z',
    '3 min read',
    false,
    'published',
    'Nagriva Raises Series A Funding | Nagriva News',
    'Nagriva announces Series A funding to accelerate AI Employee platform development.',
    ARRAY['News', 'Startups', 'AI', 'Funding']
  ),
  (
    'Automating Sales Outreach: From Lead to Close with AI',
    'automating-sales-outreach',
    'Learn how AI Employees can qualify leads, personalize outreach, schedule meetings, and follow up — turning your sales pipeline into an automated engine.',
    '<h2>The Sales Automation Playbook</h2><p>Your sales team spends 60% of their time on non-selling activities: research, data entry, follow-ups, scheduling. AI Employees can automate all of it.</p><h2>Lead Qualification</h2><p>AI Employees engage inbound leads instantly, ask qualifying questions, and score prospects based on your criteria — so your sales team only talks to qualified buyers.</p><h2>Personalized Outreach at Scale</h2><p>Instead of generic email blasts, AI generates personalized messages based on each prospect''s industry, role, and engagement history.</p><h2>Automated Follow-Up</h2><p>AI Employees handle the follow-up cadence that humans consistently forget. Day 3 check-in, Day 7 case study share, Day 14 re-engagement — all automated, all personalized.</p>',
    'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    'Automation',
    'Elena Rodriguez',
    'elena',
    '2026-06-15T00:00:00Z',
    '7 min read',
    false,
    'published',
    'Automating Sales Outreach with AI | Nagriva Blog',
    'Learn how AI Employees automate lead qualification, personalized outreach, and follow-ups.',
    ARRAY['Automation', 'Business', 'Sales', 'Lead Generation']
  ),
  (
    'Best Practices for Training AI on Your Company Data',
    'training-ai-company-data',
    'Ensure your AI Employees deliver accurate, brand-aligned responses by following these data preparation and knowledge base optimization best practices.',
    '<h2>Garbage In, Garbage Out</h2><p>The quality of your AI Employee''s responses depends entirely on the quality of its training data. Here''s how to prepare your knowledge base for success.</p><h2>1. Audit Your Content</h2><p>Before uploading, review your documents. Remove outdated information, correct errors, and consolidate duplicate content. Your AI should only reference current, accurate information.</p><h2>2. Structure for Retrieval</h2><p>Organize documents by topic, not by date. Use clear headings, consistent formatting, and descriptive titles. This helps the RAG system find the right information.</p><h2>3. Define Your Voice</h2><p>Create a style guide that specifies tone, terminology, and response patterns. Upload examples of ideal responses to train your AI on your brand voice.</p>',
    'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&q=80',
    'AI',
    'Sarah Chen',
    'sarah',
    '2026-06-10T00:00:00Z',
    '9 min read',
    false,
    'published',
    'Best Practices for Training AI on Company Data | Nagriva',
    'Guide to preparing your knowledge base for AI Employees — data audit, structure, and brand voice.',
    ARRAY['AI', 'Productivity', 'Getting Started', 'Knowledge Base']
  ),
  (
    'The ROI of AI Employees: A Data-Driven Analysis',
    'roi-ai-employees',
    'We analyzed data from 500+ Nagriva customers. Here''s how AI Employees impact response times, cost savings, and customer satisfaction across industries.',
    '<h2>500 Deployments, One Clear Pattern</h2><p>We analyzed anonymized performance data from over 500 Nagriva deployments across 12 industries. The results are consistent: AI Employees deliver measurable ROI within 30 days.</p><h2>Response Time: 91% Reduction</h2><p>Average initial response time dropped from 42 seconds to 3.7 seconds. For support teams handling 1,000+ daily queries, this translates to hours of saved customer wait time every single day.</p><h2>Cost Per Resolution: 67% Lower</h2><p>When accounting for AI Employee costs versus human agent costs, the average cost per resolution dropped by 67%. This includes the full cost of the AI platform, knowledge base maintenance, and human oversight.</p><h2>Customer Satisfaction: 23% Higher</h2><p>CSAT scores increased by an average of 23 points. Customers report higher satisfaction with AI-assisted support due to faster response times and consistent accuracy.</p>',
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80',
    'Business',
    'Marcus Williams',
    'marcus',
    '2026-06-05T00:00:00Z',
    '11 min read',
    false,
    'published',
    'The ROI of AI Employees: Data-Driven Analysis | Nagriva',
    'Data from 500+ deployments showing 91% faster response times and 67% lower costs with AI Employees.',
    ARRAY['Business', 'AI', 'Growth', 'ROI', 'Data Analysis']
  )
ON CONFLICT (slug) DO NOTHING;

-- ============================================================
-- Done! Steps after running:
-- 1. Verify in Supabase Dashboard → Table Editor → articles
-- 2. Test the public blog at #/blog
-- 3. Test article pages at #/blog/{slug}
-- 4. Test admin panel at #/admin/blog
-- ============================================================
