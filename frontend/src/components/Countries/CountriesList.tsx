import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Box, Card, CardContent, CardMedia, CircularProgress, Grid, Typography, Button, CardActions, TextField } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { fetchAllCountries, selectAllCountries, setSelectedCountry } from "../../store/slices/countriesSlice";
import FavoriteButton from "../Favorites/FavoriteButton";

const CountriesList = () => {
  const dispatch = useAppDispatch();
  const countries = useAppSelector(selectAllCountries);
  const [filter, setFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const countriesPerPage = 8;

  const filteredCountries = countries.filter((country) =>
    country.name.common.toLowerCase().includes(filter.toLowerCase())
  );

  const indexOfLastCountry = currentPage * countriesPerPage;
  const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
  const currentCountries = filteredCountries.slice(indexOfFirstCountry, indexOfLastCountry);

  const totalPages = Math.ceil(filteredCountries.length / countriesPerPage);
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  useEffect(() => {
    if (countries.length === 0)  {
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
      <Box sx={{ mb: 2 }}>
        <TextField
          label="Filter by country name"
          variant="outlined"
          fullWidth
          value={filter}
          onChange={(e) => {
            setFilter(e.target.value);
            setCurrentPage(1);
          }}
        />
      </Box>

      <Grid container spacing={4}>
        {currentCountries.map((country) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={country.cca3}>
            <Card
            role="list"
            sx={{ height: "100%", boxShadow: 2 }}>
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

                <Button size="small" component={Link} to={`/countries/${country.name.common}`} onClick={() => dispatch(setSelectedCountry(country))}>
                  View Details
                </Button>
                <FavoriteButton country={country} />
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </Button>
        <Typography sx={{ mx: 2, alignSelf: "center" }}>
          Page {currentPage} of {totalPages}
        </Typography>
        <Button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default CountriesList;