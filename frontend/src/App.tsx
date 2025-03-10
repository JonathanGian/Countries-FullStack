import { Box } from "@mui/material";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { TestData } from "./components/TestData";
import { AuthProvider } from "./context/AuthContext";
import { ProtectedRoute } from "./components/Auth/ProtectedRoute";
import { Navigation } from "./components/Navigation";
import { Login } from "./components/Auth/Login";
import ProtectedTestData from "./components/ProtectedTestData";
import { AuthRedirect } from "./components/Auth/AuthRedirect";
import CountriesList from "./components/Countries/CountriesList";
import CountryDetail from "./components/Countries/CountryDetail";
import WeatherInfo from "./components/Weather/WeatherInfo";
import Favorites from "./components/Favorites/Favorites";

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
              <Route path="/country/all" element={<CountriesList />} />
              <Route path="/country/:name" element={<CountryDetail />} />
              <Route path="/weather/:capital" element={<WeatherInfo city="Austin, TX" />} />
              <Route
                path="/protected"
                element={
                  <ProtectedRoute>
                   <ProtectedTestData/>
                   
                    </ProtectedRoute>
                  }
              />
              <Route
                path="/favorites"
                element={
                  <ProtectedRoute>
                    <Favorites />
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
