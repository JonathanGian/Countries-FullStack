import { Country } from "../../types/country";
import { api } from "../axios";

export const countriesApi = {
    getAllCountries: (): Promise<Country[]> => api.get("https://restcountries.com/v3.1/all"),
}
export const getCountryByCode = (code: string): Promise<Country> => api.get(`https://restcountries.com/v3.1/alpha/${code}`);

export const getCountryByName = (name: string): Promise<Country[]> => api.get(`https://restcountries.com/v3.1/name/${name}`);

export const getCountryByCurrency = (currency: string): Promise<Country[]> => api.get(`https://restcountries.com/v3.1/currency/${currency}`);

export const getCountryByCapital = (capital: string): Promise<Country[]> => api.get(`https://restcountries.com/v3.1/capital/${capital}`);

