import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  selectCountriesLoading,
  selectCountriesError,
  selectAllCountries,
  fetchAllCountries,
} from "../../store/slices/countriesSlice";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { fetchWeatherByCity } from "../../store/slices/weatherSlice";
import WeatherInfo from "../Weather/WeatherInfo"
import { Country } from "../../types/country";
import FavoriteButton from "../Favorites/FavoriteButton";
import { Link, useParams } from "react-router-dom";
interface CountryDetailProps {
  country?: Country;
}
const CountryDetail = ({country: propCountry} : CountryDetailProps) => {
  const loading = useAppSelector(selectCountriesLoading);
  const error = useAppSelector(selectCountriesError);
  const dispatch = useAppDispatch();
 
const { name } = useParams();
const countries = useAppSelector(selectAllCountries);

useEffect(() => {
  if (countries.length === 0) {
    dispatch(fetchAllCountries());
  }
}, [countries, dispatch]);

const country = propCountry || countries.find(
  (c) => c.name.common.toLowerCase() === name?.toLowerCase()
);
const capital = country?.capital?.[0] || "";

useEffect(() => {
  if (capital && capital !== "N/A" && capital !== "Favorite") {
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

  return (
    <Box sx={{
      p: 3,
      height: "90vh",
      }}>

      <Button component={Link} to="/country/all" variant="outlined" sx={{ mb: 2 }}>
        Back to Countries List
      </Button>
      <Card sx={{
        maxWidth: 600,
        margin: "auto",
        boxShadow: 3,
        maxHeight: "90vh",
       }}>
        <CardMedia
          component="img"
          height="300"
          image={country.flags?.svg || "https://via.placeholder.com/300"}
          alt={`Flag of ${country.name.common}`}
        />
        <CardContent>

          <Typography variant="h5" gutterBottom>
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
            <strong>Subregion:</strong> {country.subregion || "N/A"}
          </Typography>

          <WeatherInfo city={capital} />
        </CardContent>
        <CardActions sx={{ mt: "auto", justifyContent: "flex-end" }}>
          <FavoriteButton country={country}/>
        </CardActions>
      </Card>
    </Box>
  );
};

export default CountryDetail;
