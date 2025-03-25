import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { supabase } from "../config/supabase"; 

const SignUp: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handleSignUp = async () => {
    setError(null);
    setMessage("");
    // Call Supabase auth signUp with email and password
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) {
      setError(error.message);
    } else {
      // Optionally, inform the user to check their email for a confirmation link
      setMessage("Registration successful! Please check your email for confirmation.");
    }
  };

  return (
    <Box sx={{ maxWidth: 400, mx: "auto", mt: 4, p: 2, boxShadow: 3, borderRadius: 2 }}>
      <Typography variant="h4" gutterBottom>
        Create an Account
      </Typography>
      <TextField
        label="Email"
        variant="outlined"
        fullWidth
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Password"
        variant="outlined"
        type="password"
        fullWidth
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        sx={{ mb: 2 }}
      />
      {error && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}
      {message && (
        <Typography variant="body2" color="primary" sx={{ mb: 2 }}>
          {message}
        </Typography>
      )}
      <Button variant="contained" onClick={handleSignUp} fullWidth>
        Sign Up
      </Button>
    </Box>
  );
};

export default SignUp;