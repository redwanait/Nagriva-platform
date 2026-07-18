-- Create contributor_applications table for storing contributor application submissions

CREATE TABLE IF NOT EXISTS contributor_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  linkedin TEXT NOT NULL,
  website TEXT,
  country TEXT NOT NULL,
  job_title TEXT NOT NULL,
  company TEXT,
  topics TEXT NOT NULL,
  bio TEXT NOT NULL,
  motivation TEXT NOT NULL,
  experience TEXT NOT NULL,
  portfolio TEXT,
  article_idea TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE contributor_applications ENABLE ROW LEVEL SECURITY;

-- Allow anonymous and authenticated users to insert contributor applications
CREATE POLICY "Allow insert for anonymous and authenticated users"
  ON contributor_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
