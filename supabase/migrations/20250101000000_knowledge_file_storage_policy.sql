-- Storage INSERT policy for knowledge-file bucket
-- Allows authenticated users to upload files into the knowledge-file bucket

-- First, ensure the bucket exists (idempotent)
INSERT INTO storage.buckets (id, name, public)
VALUES ('knowledge-file', 'knowledge-file', true)
ON CONFLICT (id) DO NOTHING;

-- Drop any existing INSERT policies on this bucket to avoid conflicts
DO $$
BEGIN
  -- Drop policies by name if they exist
  IF EXISTS (
    SELECT 1 FROM pg_policies
    WHERE tablename = 'objects'
    AND policyname = 'knowledge-file-insert-authenticated'
  ) THEN
    DROP POLICY "knowledge-file-insert-authenticated" ON storage.objects;
  END IF;
END $$;

-- Create the INSERT policy
CREATE POLICY "knowledge-file-insert-authenticated"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'knowledge-file'
  );
