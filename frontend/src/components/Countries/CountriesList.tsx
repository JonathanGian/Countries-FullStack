import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, CardMedia, CircularProgress, Grid, Typography, Button, CardActions } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchAllCountries, selectAllCountries } from "../../store/slices/countriesSlice";
import FavoriteButton from "../Favorites/FavoriteButton";

const CountriesList = () => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectAllCountries);

  useEffect(() => {
    if (!countries || countries.length === 0) {
      dispatch(fetchAllCountries());
    }
  }, [countries, dispatch]);

  if (countries.length === 0) {
    return <CircularProgress />;
  }

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h3" gutterBottom>
        Explore Countries
      </Typography>

      <Grid container spacing={4}>
        {countries.map((country) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={country.cca3}>
            <Card sx={{ height: "100%", boxShadow: 2 }}>
              <CardMedia
                component="img"
                height="160"
                image={country.flags?.svg || "https://via.placeholder.com/300"}
                alt={`Flag of ${country.name.common}`}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {country.name.common}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Population:</strong> {country.population.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Region:</strong> {country.region}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Currency:</strong>{" "}
                  {country.currencies
                    ? Object.entries(country.currencies)
                        .map(([code, currency]) => `${currency.name} (${code})`)
                        .join(", ")
                    : "N/A"}
                </Typography>
              </CardContent>
              <CardActions sx={{ mt: "auto", justifyContent: "space-between" }}>
                <Button size="small" component={Link} to={`/country/${country.name.common}`}>
                  View Details
                </Button>
                <FavoriteButton country={country} />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CountriesList;