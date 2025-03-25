import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CountryFavorite, FavoritesState } from "../../types/favorite";
import { supabase } from "../../config/supabase";
import { RootState } from "../store";
import { Country } from "../../types/country";

const initialState: FavoritesState = {
    favorites: [],
    loading: false,
    error: null,
    loaded: false,
}

/**
 * Fetch all favorites for the current user
 * @returns The list of favorite countries
 */
export const fetchFavorites = createAsyncThunk(
    "favorites/fetchFavorites",
    async (_,{ rejectWithValue}) => {
        const {data, error} = await supabase
        .from("country_favorites")
        .select("*");
        if(error) {
            return rejectWithValue(error.message);
        }
        return data as CountryFavorite[];
    }

);

/**
 * Add a country to favorites
 * @param country The country to add
 * @returns The added country
 */
export const addFavoriteToDB = createAsyncThunk(
    "favorites/addFavoriteToDB",
    async (country: Country, { rejectWithValue }) => {
        
        const { data, error } = await supabase
        
        .from("country_favorites")
        .insert([
          {
            country_name: country.name.common,
            country_code: country.cca3,
            country_flag: country.flags.png,
          },
        ])
        .select()
        .single();
  

        if (error) {
            return rejectWithValue(error.message);
        }
        return data as CountryFavorite;
    }
);

/**
 * Remove a country from favorites
 * @param country_code of the country to remove
 * @returns The removed country
 */
export const removeFavoriteFromDB = createAsyncThunk(
    "favorites/removeFavoriteFromDB",
    async (country_code: string, { rejectWithValue }) => {
        const { data,error } = await supabase
        .from("country_favorites")
        .delete()
        .eq("country_code", country_code)
        .select()
        .single();

        if (error) {
            return rejectWithValue(error.message);
        }
        return data as unknown as CountryFavorite;
    }
)


  
const favoritesSlice = createSlice({
    name: "favorites",
    initialState,
    reducers: {
        addFavorite: (state, action) => {
            state.favorites.push(action.payload);
        },
        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter((favorite) => favorite.id !== action.payload);
        },
        
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.favorites = action.payload;
                state.loading = false;
                state.loaded = true;
              })
            .addCase(fetchFavorites.rejected, (state, action) => {
                state.loading = true;
                state.error = action.payload as string;
            })
            .addCase(addFavoriteToDB.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addFavoriteToDB.fulfilled, (state, action) => {
                state.favorites.push(action.payload);
                state.loading =  false;
            }).
            addCase(removeFavoriteFromDB.fulfilled, (state, action) => {
                if (action.payload && action.payload.country_code) {
                    state.favorites = state.favorites.filter(
                        (favorite) => favorite.country_code !== action.payload.country_code
                    );
                } else {
                    console.error('Invalid payload:', action.payload);
                }
                state.loading =  false;
              
                
            })
    },
});

export const selectAllFavorites = (state: RootState) => state.favorites.favorites;
export default favoritesSlice.reducer;
