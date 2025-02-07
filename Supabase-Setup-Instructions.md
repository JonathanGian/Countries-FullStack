# Supabase Setup Instructions

## Creating a Supabase Project

1. Go to [Supabase Dashboard](https://app.supabase.com)
2. Sign in or create a new account
3. Click "New Project"
4. Fill in the project details:
   - Add a project name
   - Set a secure database password
   - Choose your region (pick the one closest to your users)
   - Choose the pricing plan (Free tier is sufficient for testing)
5. Click "Create new project" and wait for deployment (usually takes 1-2 minutes)

## Creating Test Table Using SQL Editor

1. In your project dashboard, go to the "SQL Editor" in the left sidebar
2. Click "New Query"
3. Copy and paste the following SQL to create the test table:

   ```sql
   -- Create the test table
   CREATE TABLE test (
     id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
     created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
     name TEXT NOT NULL,
     description TEXT,
     is_active BOOLEAN DEFAULT TRUE
   );

   -- Insert test data
   INSERT INTO test (name, description)
   VALUES
     ('Test Item 1', 'This is the first test item'),
     ('Test Item 2', 'This is the second test item'),
     ('Test Item 3', 'This is the third test item');

   -- Enable Row Level Security (RLS)
   ALTER TABLE test ENABLE ROW LEVEL SECURITY;

   -- Create RLS policy
   CREATE POLICY "Enable read access for all users"
   ON test
   FOR SELECT
   USING (true);
   ```

4. Click "Run" or press Ctrl+Enter (Cmd+Enter on Mac) to execute the query

## Verifying the Setup

1. Go to "Table Editor" in the left sidebar
2. You should see your `test` table listed
3. Click on the table to view the inserted records
4. Try some example queries in the SQL Editor:

   ```sql
   -- Select all records
   SELECT * FROM test;

   -- Select active records
   SELECT * FROM test WHERE is_active = true;

   -- Select records with custom conditions
   SELECT name, description
   FROM test
   WHERE name LIKE 'Test%'
   ORDER BY created_at DESC;
   ```

## Getting Connection Details

Your connection details can be found under Project Settings → API:

- Project URL
- Project API Key (anon public key)
- JWT Secret (if needed)

Remember to never commit these values directly to your repository. Use environment variables instead.

## Next Steps

- Set up more complex RLS policies as needed
- Create additional tables for your specific use case
- Set up authentication if required
- Configure real-time subscriptions if needed

## Troubleshooting

If you encounter any issues:

1. Check the SQL Editor for any error messages
2. Verify RLS policies are correctly set up
3. Ensure your API keys are properly configured
4. Check the Supabase logs in the Dashboard
