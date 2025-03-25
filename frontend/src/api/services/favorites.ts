import { supabase } from "../../config/supabase";
import { Country } from "../../types/country";
import { CountryFavorite } from "../../types/favorite";

// Cache for favorite status to reduce redundant API calls
let favoritesCache: CountryFavorite[] | null = null;
let lastFetchTime = 0;
const CACHE_EXPIRY = 30000; // 30 seconds

export const favoritesApi = {
    
  /**
   * Get all favorites for the current user
   * @param useCache Whether to use cached data if available
   */
  async getFavorites(useCache = true): Promise<CountryFavorite[]> {
    const now = Date.now();

    // Return cached data if it's fresh and useCache is true
    if (useCache && favoritesCache && now - lastFetchTime < CACHE_EXPIRY) {
      return favoritesCache;
    }

    const { data, error } = await supabase
      .from("country_favorites")
      .select("*");

    if (error) {
      console.error("Error fetching favorites:", error);
      throw new Error(error.message);
    }

    // Update cache
    favoritesCache = data || [];
    lastFetchTime = now;

    return favoritesCache;
  },

  /**
   * Add a country to favorites
   */
  async addFavorite(country: Country): Promise<CountryFavorite> {
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
      console.error("Error adding favorite:", error);
      throw new Error(error.message);
    }

    // Update cache if it exists
    if (favoritesCache) {
      favoritesCache.push(data);
    }

    return data;
  },

  /**
   * Remove a country from favorites
   */
  async removeFavorite(countryName: string): Promise<void> {
    const { error } = await supabase
      .from("country_favorites")
      .delete()
      .eq("country_name", countryName);

    if (error) {
      console.error("Error removing favorite:", error);
      throw new Error(error.message);
    }

    // Update cache if it exists
    if (favoritesCache) {
      favoritesCache = favoritesCache.filter(
        (fav) => fav.country_name !== countryName
      );
    }
  },

  /**
   * Check if a country is in favorites
   */
  async isFavorite(countryName: string): Promise<boolean> {
    // Try to use cache first
    if (favoritesCache) {
      const found = favoritesCache.some(
        (fav) => fav.country_name === countryName
      );
      return found;
    }

    // If no cache, make a targeted query
    const { data, error } = await supabase
      .from("country_favorites")
      .select("id")
      .eq("country_name", countryName)
      .maybeSingle();

    if (error) {
      console.error("Error checking favorite status:", error);
      throw new Error(error.message);
    }

    return !!data;
  },

  /**
   * Clear the favorites cache
   */
  clearCache() {
    favoritesCache = null;
    lastFetchTime = 0;
  },
};