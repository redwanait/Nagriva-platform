-- Create career_applications table for storing career/job application submissions

CREATE TABLE IF NOT EXISTS career_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  country TEXT,
  desired_position TEXT NOT NULL,
  portfolio_url TEXT,
  linkedin_url TEXT,
  about TEXT,
  cv_file_url TEXT,
  cv_file_name TEXT,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE career_applications ENABLE ROW LEVEL SECURITY;

-- Allow anonymous and authenticated users to insert career applications
CREATE POLICY "Allow insert for anonymous and authenticated users"
  ON career_applications
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Allow only admins to view and manage all applications
CREATE POLICY "Allow admin full access"
  ON career_applications
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );
