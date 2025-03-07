import { WeatherData } from "../../types/weather";
import { api } from "../axios";

export const weatherApi = {
    getWeatherByCity: (city: string): Promise<WeatherData> => api.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`),
}