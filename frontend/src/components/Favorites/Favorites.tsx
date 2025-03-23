import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { CountryFavorite } from "../../types/favorite";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchAllCountries,
  selectAllCountries,
} from "../../store/slices/countriesSlice";

import { Alert, CircularProgress, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

import CountryCard from "../Countries/CountryCard";
import {
  fetchFavorites,
  selectAllFavorites,
} from "../../store/slices/favoritesSlice";

const Favorites = () => {
  const { user } = useAuth();
  const error = useAppSelector((state) => state.favorites.error);
  const loading = useAppSelector((state) => state.favorites.loading);
  const favorites = useAppSelector(selectAllFavorites);
  const allCountries = useAppSelector(selectAllCountries);
  const dispatch = useAppDispatch();
console.log("Favorites", favorites);
  useEffect(() => {
    if (allCountries.length === 0) {
      dispatch(fetchAllCountries());
    }
  }, [allCountries, dispatch]);

   useEffect(() => {
    if (!user) return;
    if (favorites.length === 0) {
      dispatch(fetchFavorites());
    }
    
  }, [user,favorites, dispatch]);
 
  console.log("API favorites", favorites);
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
                <CountryCard country={convertToCountry(favorite)} />
              </Grid>
            );
          })}
        </Grid>
      )}
    </Box>
  );
};

export default Favorites;
