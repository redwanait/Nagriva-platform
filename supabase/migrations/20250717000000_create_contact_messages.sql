-- Create contact_messages table for storing contact form submissions

CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  business_email TEXT NOT NULL,
  company TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anonymous and authenticated users to insert contact messages
CREATE POLICY "Allow insert for anonymous and authenticated users"
  ON contact_messages
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);
