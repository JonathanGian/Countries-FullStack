import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { CountryFavorite } from "../../types/favorite";
import { useAppSelector } from "../../store/hooks";
import { selectAllCountries } from "../../store/slices/countriesSlice";
import { favoritesApi } from "../../api/services/favorites";
import { Alert, CircularProgress, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import CountryDetail from "../Countries/CountryDetail";

const Favorites = () => {
  const { user } = useAuth();
  const [loading, setloading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<CountryFavorite[]>([]);
  const allCountries = useAppSelector(selectAllCountries);

  useEffect(() => {
    if (!user) return;

    const fetchFavorites = async () => {
      setloading(true);
      setError(null);
      try {
        const data = await favoritesApi.getFavorites();
        setFavorites(data);
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setError("Failed to load favorites, please try again later.");
      } finally {
        setloading(false);
      }
    };

    fetchFavorites();
  }, [user]);

  const convertToCountry = (favorite: CountryFavorite) => {
    const fullCountry = allCountries.find(
      (country) => country.name.common === favorite.country_name,
    );
  

    if (fullCountry) {
      return fullCountry;
    }
    return {
      name: {
        common: favorite.country_name,
        official: favorite.country_name,
      },
      cca3: favorite.country_code,
      flags: {
        png: favorite.country_flag,
        svg: favorite.country_flag,
      },
      region: "Favorite",
      subregion: "Favorite",
      population: 0,
      capital: [],
      currencies: {
        FAV: {
          name: "Favorite Currency",
          symbol: "♥️",
        },
      },
      languages: {
        FAV: "Favorite Language",
      },
    };
  };

  if (!user) {
    return (
      <Typography variant="h4" component="h1" gutterBottom>
        Please log in to see your favorites
      </Typography>
    );
  }

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

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        My Favorite Countries
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {favorites.length === 0 ? (
        <Alert severity="info">
          You have no favorite countries yet. Add some to your favorites list!
        </Alert>
      ) : (
        <Grid container spacing={3}>
     {favorites.map((favorite) => {
        // const country = convertToCountry(favorite);
        return (
          <Grid item xs={12} sm={6} md={4} key={favorite.id}>
            <CountryDetail country={convertToCountry(favorite)} />
          </Grid>
        );
      })}
        </Grid>
      )}
    </Box>
  );
};

export default Favorites;
