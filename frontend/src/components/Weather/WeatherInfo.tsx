import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import {
  fetchWeatherByCity,
  selectWeather,
} from "../../store/slices/weatherSlice";
import { Box, CircularProgress, Typography } from "@mui/material";

interface WeatherInfoProps {
  city: string;
}

const WeatherInfo: React.FC<WeatherInfoProps> = ({ city }) => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.weather.loading);
  const error = useAppSelector((state) => state.weather.error);
  const weather = useAppSelector(selectWeather);

console.log("WEATHER:",weather)
  console.log("CITY:",city)
  useEffect(() => {
    if (city && weather.weather.name !== city) {
      dispatch(fetchWeatherByCity(city));
    }
  }, [city, dispatch, weather.weather.name]);
  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
        <CircularProgress />
      </Box>
    );
  }
console.log(error)
  if (error) {
    return <Typography variant="body2">Weather data unavailable for {city}</Typography>;
  }


  if ( !weather.weather.name) {
    return (
      <Typography variant="h6" sx={{ mt: 2, textAlign: "center" }}>
        No weather data available.
      </Typography>
    );
  }
  const humidity = weather.weather.main.humidity;
  const temp = weather.weather.main.temp;
  const description = weather.weather.weather[0].description;
  const weatherIcon = weather.weather.weather[0].icon;
  const windSpeed = weather.weather.wind.speed;
  
console.log(temp)
console.log(weather.weather.name)
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6">Current Weather in {city}</Typography>
      {weatherIcon && (
        <img
          src={`https://openweathermap.org/img/wn/${weatherIcon}@2x.png`}
          alt={description}
        />
      )}
      <Typography>Temperature: {temp}°C</Typography>
      <Typography>Humidity: {humidity}%</Typography>
      <Typography>Wind Speed: {windSpeed} m/s</Typography>
      <Typography>Description: {description}</Typography>
    </Box>
  );
};

export default WeatherInfo;
