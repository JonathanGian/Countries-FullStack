# Authentication Setup Instructions

## 1. Create Protected Data Table

Run this SQL in your Supabase SQL Editor:

```sql

-- Create the protected data table
CREATE TABLE protected_data (
id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
name TEXT NOT NULL,
description TEXT,
is_active BOOLEAN DEFAULT true,
user_id UUID NOT NULL REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE protected_data ENABLE ROW LEVEL SECURITY;

-- Create policy for reading data
CREATE POLICY "Users can read own data"
ON protected_data
FOR SELECT
USING (auth.uid() = user_id);

-- Create policy for inserting data
CREATE POLICY "Users can insert own data"
ON protected_data
FOR INSERT
WITH CHECK (
auth.uid() IS NOT NULL AND
(
user_id IS NULL OR
user_id = auth.uid()
)
);

-- Create trigger to automatically set user_id
CREATE OR REPLACE FUNCTION set_user_id()
RETURNS TRIGGER AS $$
BEGIN
NEW.user_id := auth.uid();
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
DROP TRIGGER IF EXISTS set_user_id_trigger ON protected_data;
CREATE TRIGGER set_user_id_trigger
BEFORE INSERT ON protected_data
FOR EACH ROW
EXECUTE FUNCTION set_user_id();

```

## 2. Configure Authentication Provider

1. Go to Google Cloud Console (https://console.cloud.google.com)

   - Create a new project or select existing one
   - Go to "APIs & Services" > "Credentials"
   - Click "Create Credentials" > "OAuth client ID"
   - Select "Web application"
   - Configure the authorized origins and redirect URIs

2. Go to Authentication → Providers in your Supabase Dashboard
3. Enable Google authentication
4. Configure OAuth credentials:

   - Get Client ID and Client Secret from Google Cloud Console
   - Set up authorized origins and redirect URIs:

     ```
     Authorized JavaScript origins:
     http://localhost:5180

     Authorized redirect URIs:
     https://xijwjqpanhrlswoqgnas.supabase.co/auth/v1/callback
     ```

   - Add your development URL (e.g., http://localhost:5180)

## 3. Install Required Dependencies

```bash
npm install @supabase/supabase-js @supabase/auth-ui-react @supabase/auth-ui-shared
```

## 4. Set Up Environment Variables

Create a `.env` file in your frontend directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 5. Create Supabase Client

Create `src/config/supabase.ts`:

```typescript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

## 6. Set Up Authentication Context

Create `src/context/AuthContext.tsx`:

```typescript
import { Session, User } from "@supabase/supabase-js";
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../config/supabase";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const value = {
    session,
    user,
    loading,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
```

## 7. Create Login Component

Create `src/components/Auth/Login.tsx`:

```typescript
import { Box, Paper, Typography } from "@mui/material";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "../../config/supabase";

export const Login = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        p: 3,
      }}
    >
      <Paper elevation={3} sx={{ p: 4, maxWidth: 400, width: "100%" }}>
        <Typography variant="h5" gutterBottom textAlign="center">
          Welcome
        </Typography>
        <Auth
          supabaseClient={supabase}
          appearance={{
            theme: ThemeSupa,
            variables: {
              default: {
                colors: {
                  brand: "#1976d2",
                  brandAccent: "#1565c0",
                },
              },
            },
          }}
          providers={["google"]}
          socialLayout="horizontal"
          view="sign_in"
        />
      </Paper>
    </Box>
  );
};
```

## 8. Create Protected Route Component

Create `src/components/Auth/ProtectedRoute.tsx`:

```typescript
import { Box, CircularProgress } from "@mui/material";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};
```

## 8.5 Create Auth Redirect Component

Create `src/components/Auth/AuthRedirect.tsx`:

```typescript
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export const AuthRedirect = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/protected");
    }
  }, [user, navigate]);

  return null;
};
```

This component handles automatic redirection after successful authentication.

## 9. Update App Component

Wrap your app with AuthProvider and set up protected routes:

```typescript:Authentication-Setup-Instructions.md
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Box>
          <Navigation />
          <Box sx={{ p: 3 }}>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/test" element={<TestData />} />
              <Route
                path="/protected"
                element={
                  <ProtectedRoute>
                    <ProtectedTestData />
                  </ProtectedRoute>
                }
              />
              {/* Other routes... */}
            </Routes>
          </Box>
        </Box>
      </BrowserRouter>
    </AuthProvider>
  );
}
```

## 10. Testing Authentication

1. Start your application
2. Click the Login button
3. Sign in with Google
4. You should be redirected to the protected route
5. Try accessing protected data - it should now work with RLS policies

## Troubleshooting

If you encounter issues:

1. Check browser console for errors
2. Verify environment variables are correct
3. Ensure Google OAuth is properly configured in Supabase
4. Verify RLS policies are correctly set up
5. Check if user is properly authenticated using browser dev tools
6. For RLS issues:
   - Check that policies are correctly created in Supabase
   - Verify user_id is being set correctly in the trigger
   - Test policies directly in Supabase SQL editor

## Security Notes

1. Never commit your `.env` file to version control
2. Keep your Supabase credentials secure
3. Regularly rotate your OAuth credentials if needed
4. Use appropriate RLS policies to protect your data
5. Store sensitive files (like client_secret\*.json) outside of source control
6. Use .gitignore to exclude sensitive files:
   ```
   # .gitignore
   .env
   .env.local
   *.secret.json
   client_secret*.json
   ```

## Environment Variables Setup

### Frontend (.env)

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Backend (.env)

```env
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

Remember to replace the placeholder values with your actual Supabase credentials.
