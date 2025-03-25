# Setting up the Reviews table in Supabase:

## Description

Copy these statements into your Supabase Project SQL editor and hit run.

```sql
-- Create the reviews table
CREATE TABLE reviews (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  country_id UUID NOT NULL REFERENCES countries(id),  -- References the seeded countries table
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  user_id UUID NOT NULL REFERENCES auth.users(id)
);

-- Enable Row-Level Security on the reviews table
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Allow anyone to read reviews
CREATE POLICY "Public read reviews" ON reviews
FOR SELECT
USING (true);

-- Allow authenticated users to insert reviews with their own user_id
CREATE POLICY "Users can insert own reviews" ON reviews
FOR INSERT
WITH CHECK (
  auth.uid() IS NOT NULL AND user_id = auth.uid()
);

-- Allow users to delete their own reviews
CREATE POLICY "Users can delete own reviews" ON reviews
FOR DELETE
USING (auth.uid() = user_id);

-- Create a trigger function to automatically set the user_id on insert
CREATE OR REPLACE FUNCTION set_review_user_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.user_id := auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Attach the trigger function to the reviews table
DROP TRIGGER IF EXISTS set_review_user_id_trigger ON reviews;
CREATE TRIGGER set_review_user_id_trigger
BEFORE INSERT ON reviews
FOR EACH ROW
EXECUTE FUNCTION set_review_user_id();

```