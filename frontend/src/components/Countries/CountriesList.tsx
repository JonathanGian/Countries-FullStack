import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { fetchAllCountries, selectAllCountries } from "../../store/slices/countriesSlice";
import { Box, Card, CardContent, CardMedia, CircularProgress, Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const CountriesList = () => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectAllCountries);


  useEffect(() => {
    dispatch(fetchAllCountries());
  }, [dispatch]);

  return (
    <Box sx={{ p: 3 }}>
    <Typography variant="h3" gutterBottom>
      Country List
    </Typography>
    {/* Show loading if no data */}
    {countries.length === 0 ? (
      <Box display="flex" justifyContent="center" alignItems="center" height="50vh">
        <CircularProgress />
      </Box>
    ) : (
      <Grid container spacing={3}>
        
        {countries.map((country, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
            <Link to={`/country/${country.name.common}`} style={{ textDecoration: 'none', color: 'inherit' }}>

            <Card  sx={{ maxWidth: 345, boxShadow: 3 }} >
              <CardMedia
                component="img"
                height="180"
                image={country.flags?.svg || "https://via.placeholder.com/180"}
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
                  <strong>Currency: </strong>
                {country.currencies
                      ? Object.entries(country.currencies)
                          .map(([code, currency]) => `${currency.name} (${code})`)
                          .join(", ")
                      : "N/A"}
                </Typography>
              </CardContent>
            </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    )}
  </Box>
  );
};

export default CountriesList;