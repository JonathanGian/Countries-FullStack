import { Box } from "@mui/material";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { TestData } from "./components/TestData";

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ p: 3 }}>
        {/* Basic navigation */}
        <Box sx={{ mb: 3 }}>
          <Link to="/" style={{ marginRight: "1rem" }}>
            Home
          </Link>
          <Link to="/test">Test Data</Link>
        </Box>

        {/* Routes */}
        <Routes>
          <Route
            path="/"
            element={
              <Box>
                <h1>Welcome to the Home Page</h1>
                <p>Use the navigation above to explore the app</p>
              </Box>
            }
          />
          <Route path="/test" element={<TestData />} />
        </Routes>
      </Box>
    </BrowserRouter>
  );
}

export default App;
