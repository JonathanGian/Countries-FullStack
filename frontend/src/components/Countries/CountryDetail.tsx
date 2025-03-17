import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectCountriesLoading,
  selectCountriesError,
  selectAllCountries,
  fetchAllCountries,
  selectSelectedCountry,
} from "../../store/slices/countriesSlice";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { fetchWeatherByCity } from "../../store/slices/weatherSlice";
import WeatherInfo from "../Weather/WeatherInfo";
import { Country } from "../../types/country";
import FavoriteButton from "../Favorites/FavoriteButton";
import { Link, useParams } from "react-router-dom";
import Reviews from "../Reviews";
import { LocationCity, Payments, People, Public } from "@mui/icons-material";
interface CountryDetailProps {
  country?: Country;
}
const CountryDetail = ({ country: propCountry }: CountryDetailProps) => {
  const loading = useAppSelector(selectCountriesLoading);
  const error = useAppSelector(selectCountriesError);
  const dispatch = useAppDispatch();

  const { name } = useParams();
  const countries = useAppSelector(selectAllCountries);
  const selectedCountry = useAppSelector(selectSelectedCountry);
  console.log("SELECT", selectedCountry?.capital);

  console.log("CountryDetail");
  useEffect(() => {
    if (countries.length === 0) {
      dispatch(fetchAllCountries());
    }
  }, [countries, dispatch]);

  const country =
    propCountry ||
    countries.find((c) => c.name.common.toLowerCase() === name?.toLowerCase());
  const getCurrencies = () => {
    if (!country) return "N/A";

    return Object.values(country.currencies || {})
      .map((currency) => `${currency.name} (${currency.symbol})`)
      .join(", ");
  };

  const capital = country?.capital?.[0] || "";

  useEffect(() => {
    if (capital) {
      dispatch(fetchWeatherByCity(capital));
    }
  }, [capital, dispatch]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography variant="h6">Error: {error}</Typography>;
  }

  if (!country) {
    return <Typography variant="h6">Country not found</Typography>;
  }
/* Hit when you go through Favorites */
  return (
    
    <Box sx={{ p: 3, height: "100vh" }}>
    sdasd
      <Button
        component={Link}
        to="/countries/all"
        variant="outlined"
        sx={{ mb: 2 }}
        color="primary"
      >
        Back to Countries Liste
      </Button>
      <Grid container spacing={2} >
        {/* Left Column: Country Card */}
        <Grid
          role="list"
          
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Card
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              boxShadow: 3,
            }}
          >
            <CardMedia
              component="img"
              height="250"
              image={country.flags?.svg || "https://via.placeholder.com/300"}
              alt={`Flag of ${country.name.common}`}
              sx={{ objectFit: "cover", borderRadius: "20px 20px 0 0" }}
            />
            <CardContent sx={{ flexGrow: 1 }}>
              <Typography component="div" variant="h5" gutterBottom>
                {country.name.common}
              </Typography>
              {/* Capital */}
              {country.capital && (
                <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
                  <LocationCity color="action" fontSize="small" />
                  <Typography variant="body2" color="text.secondary">
                    {country.capital[0]}
                  </Typography>
                </Box>
              )}
              {/* Population */}
              <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
                <People color="action" fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  {country.population.toLocaleString()}
                </Typography>
              </Box>
              {/* Region/Subregion */}
              <Box sx={{ display: "flex", gap: 1, alignItems: "center", mb: 1 }}>
                <Public color="action" fontSize="small" />
                <Typography variant="body2" color="text.secondary">
                  {country.region}
                  {country.subregion && ` (${country.subregion})`}
                </Typography>
              </Box>
              {/* Currencies */}
              <Box sx={{ display: "flex", gap: 1,  }}>
                <Payments color="action" fontSize="small" />
                <Typography variant="body2" color="text.secondary" noWrap>
                  {getCurrencies()}
                </Typography>
              </Box>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end" }}>
              <FavoriteButton country={country} />
            </CardActions>
          </Card>
        </Grid>
  
        {/* Right Column: Weather Info and Reviews */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <WeatherInfo city={capital} />
          </Paper>
          <Paper elevation={3} sx={{ p: 2, overflowY: "auto" }}>
            <Reviews countryCode={country.cca3} countryName={country.name.common} />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CountryDetail;
