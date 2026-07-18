CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  source TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  subscribed_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow insert for anonymous and authenticated users" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow admin read" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Allow admin update" ON newsletter_subscribers;

CREATE POLICY "Allow insert for anonymous and authenticated users"
  ON newsletter_subscribers
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Allow admin read"
  ON newsletter_subscribers
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow admin update"
  ON newsletter_subscribers
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);
