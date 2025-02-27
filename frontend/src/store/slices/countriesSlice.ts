import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CountryState } from "../../types/country";
import { countriesApi } from "../../api/services/countries";
import { RootState } from "../store";

const initialState: CountryState = {
    countries: [],
    loading: false,
    error: null,
    selectedCountry: null,
};

export const fetchAllCountries = createAsyncThunk("countries/fetchAllCountries", async () => {
    const response = await countriesApi.getAllCountries();
    console.log("API Response:", response); // Debugging step
    return response;
})

export const countrySlice = createSlice({
    name: "countries",
    initialState,
    reducers: {
        clearSelectedCountry: (state) => {
            state.selectedCountry = null;
            state.error = null;
        },
        setSelectedCountry: (state, action) => {
            state.selectedCountry = action.payload;
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchAllCountries.pending, (state) => {
            state.loading = true;
        })
        .addCase(fetchAllCountries.fulfilled, (state, action) => {
            state.loading = false;
            state.countries = action.payload;
        })
        .addCase(fetchAllCountries.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string || "Failed to load countries."
        })
    },
})

export const selectAllCountries = (state: RootState) => state.countries.countries;

export const { clearSelectedCountry, setSelectedCountry } = countrySlice.actions;
export default countrySlice.reducer;