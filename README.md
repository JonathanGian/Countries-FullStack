[![Quality gate](https://sonarcloud.io/api/project_badges/quality_gate?project=JonathanGian_Countries-FullStack)](https://sonarcloud.io/summary/new_code?id=JonathanGian_Countries-FullStack)
[![Lines of Code](https://sonarcloud.io/api/project_badges/measure?project=JonathanGian_Countries-FullStack&metric=ncloc)](https://sonarcloud.io/summary/new_code?id=JonathanGian_Countries-FullStack)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=JonathanGian_Countries-FullStack&metric=security_rating)](https://sonarcloud.io/summary/new_code?id=JonathanGian_Countries-FullStack)
[![Reliability Rating](https://sonarcloud.io/api/project_badges/measure?project=JonathanGian_Countries-FullStack&metric=reliability_rating)](https://sonarcloud.io/summary/new_code?id=JonathanGian_Countries-FullStack)
[![Vulnerabilities](https://sonarcloud.io/api/project_badges/measure?project=JonathanGian_Countries-FullStack&metric=vulnerabilities)](https://sonarcloud.io/summary/new_code?id=JonathanGian_Countries-FullStack)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=JonathanGian_Countries-FullStack&metric=sqale_rating)](https://sonarcloud.io/summary/new_code?id=JonathanGian_Countries-FullStack)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=JonathanGian_Countries-FullStack&metric=sqale_index)](https://sonarcloud.io/summary/new_code?id=JonathanGian_Countries-FullStack)

### Note

You will need a [Supabase](https://supabase.com/) account, [Open Weather](https://openweathermap.org/) account, [Rest Countries](https://restcountries.com/) account and a [Google Cloud](https://console.cloud.google.com/) account for this project.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Installation](#installation)
3. [Available Commands](#available-commands)
4. [Enviroment Setup](#environment-setup)
5. [Tech Stack](#tech-stack)
6. [Setting up Supabase](#supabase-setup-instructions)
   - [Creating Project ](#creating-a-supabase-project)
   - [Create Test Table](#creating-test-table-using-sql-editor)
   - [Create Favorites Table](#create-the-favorites-table)
   - [Create Reviews Table](#creating-reviews-table)
7. [Authors](#authors)

# Countries Fullstack

A full-stack application with NestJS backend and React frontend.

## Project Structure

```shell
project-root/
├── backend/   # NestJS application
└── frontend/  # React application
```

## Prerequisites

- Node.js (v18 or higher recommended)
- npm (comes with Node.js)

## Installation

1. Clone the repository:

```bash
git clone https://github.com/JonathanGian/Countries-FullStack.git
cd Countries_Fullstack
npm install
```

2. Install all dependencies (both frontend and backend):

```bash
npm run install:all
```

## Development

Start both frontend and backend development servers:

```bash
npm run dev
```

The applications will be available at:

- Frontend: <http://localhost:5180>
- Backend: <http://localhost:3000>

### Available Commands

- `npm run dev` - Start both frontend and backend in development mode
- `npm run dev:frontend` - Start only the frontend
- `npm run dev:backend` - Start only the backend
- `npm run install:all` - Install dependencies for both projects
- `npm run install:frontend` - Install frontend dependencies
- `npm run install:backend` - Install backend dependencies
- `npm run build` - Build both projects
- `npm run build:frontend` - Build frontend only
- `npm run build:backend` - Build backend only

## Environment Setup

1. Create a `.env` file in the frontend directory:
<!-- shell just for highlighting the text propperly. Do not run these in your terminal -->
```sh
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_ANON_KEY=Supabase_Anon_key
VITE_OPENWEATHER_API_KEY=YOUR_OPEN_API_KEY
```

2. Create a `.env` file in the backend directory:

```sh
SUPABASE_URL=Your_supabase_URL
SUPABASE_ANON_KEY=Your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
```

## Tech Stack

- **Frontend:**
  - React
  - TypeScript
  - Vite
- **Backend:**
  - NestJS
  - TypeScript
  - Supabase

## Supabase Setup Instructions

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

## Troubleshooting

If you encounter any issues:

1. Check the SQL Editor for any error messages
2. Verify RLS policies are correctly set up
3. Ensure your API keys are properly configured
4. Check the Supabase logs in the Dashboard

## Create the Favorites Table

Run the following SQL in your Supabase SQL Editor to create the favorites table with proper Row Level Security (RLS):

```sql
-- Create the favorites table
CREATE TABLE country_favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  country_name TEXT NOT NULL,
  country_code TEXT NOT NULL,
  country_flag TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE country_favorites ENABLE ROW LEVEL SECURITY;

-- Create policy for reading data
CREATE POLICY "Users can read own favorites"
ON country_favorites
FOR SELECT
USING (auth.uid() = user_id);

-- Create policy for inserting data
CREATE POLICY "Users can insert own favorites"
ON country_favorites
FOR INSERT
WITH CHECK (
  auth.uid() IS NOT NULL AND
  user_id = auth.uid()
);

-- Create policy for deleting data
CREATE POLICY "Users can delete own favorites"
ON country_favorites
FOR DELETE
USING (auth.uid() = user_id);

-- Create trigger to automatically set user_id
CREATE OR REPLACE FUNCTION set_favorite_user_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.user_id := auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
DROP TRIGGER IF EXISTS set_favorite_user_id_trigger ON country_favorites;
CREATE TRIGGER set_favorite_user_id_trigger
BEFORE INSERT ON country_favorites
FOR EACH ROW
EXECUTE FUNCTION set_favorite_user_id();
```

This setup ensures that:

- Each favorite is linked to a user
- Users can only see, add, and delete their own favorites
- The user_id is automatically set when a favorite is created

# Creating Reviews Table

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

## Authors

Author: [Jonathan Gian](https://github.com/JonathanGian)
Guide and Teacher: [Martin Holland](https://github.com/martin-holland)