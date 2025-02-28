# Countries Feature Setup Instructions

## 1. API Endpoints

### Countries API

Using the REST Countries API (v3.1):

#### Base URL

https://restcountries.com/v3.1

#### Endpoints Used

1. Get All Countries
   GET /all

- Returns all countries
- Used in CountriesList component
- No parameters required
- Response includes basic country information

2. Get Country by Code
   GET /alpha/{code}

- Returns specific country by code (e.g., FIN, USA)
- Used in CountryDetail component
- Parameters:
  - code: 3-letter country code (cca3)
- Returns array with single country

### Weather API

Using the OpenWeather API:

#### Base URL

https://api.openweathermap.org/data/2.5

#### Endpoints Used

1. Get Weather by City
   GET /weather?q={city}&units=metric&appid={API_KEY}

- Returns current weather for a city
- Used in CountryDetail component for capital city weather
- Parameters:
  - city: Capital city name
  - units: metric (for Celsius)
  - appid: API key from environment variables

## 2. Types Setup

### Country Types (src/types/country.ts)

- CountryName (common, official, nativeName)
- CountryFlags (png, svg, alt)
- Country (main country data interface)
- CountryState (Redux state interface)

### Weather Types (src/types/weather.ts)

- WeatherData (main weather data interface)
  - main: temperature, feels_like, humidity
  - weather: description, icon
  - wind: speed
- WeatherState (state management interface)

## 3. API Service Setup

### Countries Service (src/api/services/countries.ts)

export const countriesApi = {
getAllCountries: (): Promise<Country[]>,
getCountryByCode: (code: string): Promise<Country>
};

### Weather Service (src/api/services/weather.ts)

export const weatherApi = {
getWeatherByCity: (city: string): Promise<WeatherData>
};

## 4. Redux Setup

### Countries Slice (src/store/slices/countriesSlice.ts)

- Initial state with proper typing
- Async thunks for fetching data
- Proper error handling
- Type-safe selectors
- Clear selected country action

### Store Configuration (src/store/store.ts)

- Configured with countries reducer
- Type-safe store setup with RootState and AppDispatch types

## 5. Components Setup

### CountryCard Component (src/components/Countries/CountryCard.tsx)

- Card layout for individual country
- Displays flag, name, region, capital, population
- Links to country detail page using country common name
- Uses URL encoding for special characters in country names

### CountriesList Component (src/components/Countries/CountriesList.tsx)

- Grid layout of CountryCards
- Handles loading and error states
- Fetches countries on mount
- Responsive grid layout

### CountryDetail Component (src/components/Countries/CountryDetail.tsx)

- Detailed view of single country
- Back navigation
- Expanded country information
- Handles loading and error states
- Integrates weather information for capital city
- Uses encoded common name for identification

### WeatherInfo Component (src/components/Weather/WeatherInfo.tsx)

- Displays current weather data
- Shows temperature, humidity, wind speed
- Weather condition icon and description
- Handles loading and error states

## 6. Route Setup

Updated src/App.tsx with routes:

- / (home) -> CountriesList
- /countries -> CountriesList
- /countries/:name -> CountryDetail

## 7. Environment Setup

Required environment variables in .env:
VITE_OPENWEATHER_API_KEY=your_api_key

## 8. Error Handling

- Loading states for both countries and weather data
- Error states with user-friendly messages
- Fallbacks for missing data
- Type-safe error handling in Redux
