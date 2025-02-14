import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TestData } from "./components/TestData";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { Navigation } from "./components/Navigation";
import { Login } from "./components/Auth/Login";
import ProtectedTestData from "./components/ProtectedTestData";
import { AuthRedirect } from "./components/Auth/AuthRedirect";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Box>
          <Navigation />
          <Box sx={{ p: 3 }}>
            <Routes>
              <Route path="/login" element={
                <>
                <AuthRedirect/>
                <Login/>
                </>
              } />
              <Route path="/test" element={<TestData />} />
              <Route
                path="/protected"
                element={
                  <ProtectedRoute>
                   <ProtectedTestData/>
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

export default App;
