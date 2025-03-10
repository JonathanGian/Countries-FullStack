import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { WeatherData, WeatherState } from '../../types/weather';
import { RootState } from '../store';

// Define the initial state


const initialState: WeatherState = {
  weather: {} as WeatherData,
  loading: false,
  error: null,
};

// Create an async thunk for fetching weather data
export const fetchWeatherByCity = createAsyncThunk(
  "weather/fetchWeatherByCity",
  async (city: string, { rejectWithValue }) => {
    const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

    try {
      // const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      //   params: {
      //     q: `${encodeURIComponent(city)}`,
      //     units: "metric",
      //     appid: import.meta.env.VITE_OPENWEATHER_API_KEY,
      //   },
      // });
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`
      );

      if (!apiKey) {
        console.error('Weather API Key is missing!');
        return rejectWithValue('API key missing');
      }
      return response.data;
    } catch (error) {
      console.error("Weather fetch failed:", error);
      return rejectWithValue("Weather data unavailable.");
    }
  },
);
// Create the weather slice
const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    clearWeather: (state) => {
        state.weather = {} as WeatherData;
        state.error = null;
        state.loading = false;
    },
    setWeather: (state, action) => {
        state.weather = action.payload;
        state.loading = false;
        state.error = null;
    },
    setWeatherLoading: (state, action) => {
        state.loading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherByCity.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchWeatherByCity.fulfilled, (state, action) => {
        state.loading = false;
        state.weather = action.payload;
      })
      .addCase(fetchWeatherByCity.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearWeather, setWeather, setWeatherLoading } = weatherSlice.actions;

export const selectWeather = (state:RootState) => state.weather

// Export the async thunk and reducer
export default weatherSlice.reducer;