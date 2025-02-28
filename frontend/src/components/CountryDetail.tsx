import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchAllCountries, selectAllCountries, selectCountriesLoading, selectCountriesError } from "../store/slices/countriesSlice";
import { Box, Card, CardContent, CardMedia, CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";

const CountryDetail = () => {
    const { name } = useParams<{ name: string }>();
    const dispatch = useAppDispatch();
    const countries = useAppSelector(selectAllCountries);
    const loading = useAppSelector(selectCountriesLoading);
    const error = useAppSelector(selectCountriesError);

    useEffect(() => {
        if (countries.length === 0) {
            dispatch(fetchAllCountries());
        }
    }, [countries, dispatch]);

    if (loading) {
        return <CircularProgress />;
    }

    if (error) {
        return <Typography variant="h6">Error: {error}</Typography>;
    }

    const country = countries.find(
        (country) => country.name.common.toLowerCase() === name?.toLowerCase()
    );
    console.log(country)
    

    if (!country) {
        return <Typography variant="h6">Country not found</Typography>;
    }

    return (
        <Box sx={{ p: 3 }}>
            <Card sx={{ maxWidth: 600, margin: "auto", boxShadow: 3 }}>
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
                </CardContent>
            </Card>
        </Box>
    );
};

export default CountryDetail;