# Countries Favorites Feature Setup

This document outlines the implementation of the country favorites feature in the Countries Fullstack application. The feature allows authenticated users to save countries to their favorites list and view them in a dedicated page.

## Table of Contents

1. [Database Setup](#database-setup)
2. [Frontend Implementation](#frontend-implementation)
3. [API Service](#api-service)
4. [Components](#components)
5. [Performance Optimizations](#performance-optimizations)
6. [Usage](#usage)
7. [Troubleshooting](#troubleshooting)

## Database Setup

### Create the Favorites Table

Run the following SQL in your Supabase SQL Editor to create the favorites table with proper Row Level Security (RLS):

```sql
-- Create the favorites table
CREATE TABLE country_favorites (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  country_name TEXT NOT NULL,
  country_code TEXT NOT NULL,
  country_flag TEXT NOT NULL,
  user_id UUID NOT NULL REFERENCES auth.users(id)
);

-- Enable RLS
ALTER TABLE country_favorites ENABLE ROW LEVEL SECURITY;

-- Create policy for reading data
CREATE POLICY "Users can read own favorites"
ON country_favorites
FOR SELECT
USING (auth.uid() = user_id);

-- Create policy for inserting data
CREATE POLICY "Users can insert own favorites"
ON country_favorites
FOR INSERT
WITH CHECK (
  auth.uid() IS NOT NULL AND
  user_id = auth.uid()
);

-- Create policy for deleting data
CREATE POLICY "Users can delete own favorites"
ON country_favorites
FOR DELETE
USING (auth.uid() = user_id);

-- Create trigger to automatically set user_id
CREATE OR REPLACE FUNCTION set_favorite_user_id()
RETURNS TRIGGER AS $$
BEGIN
  NEW.user_id := auth.uid();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger
DROP TRIGGER IF EXISTS set_favorite_user_id_trigger ON country_favorites;
CREATE TRIGGER set_favorite_user_id_trigger
BEFORE INSERT ON country_favorites
FOR EACH ROW
EXECUTE FUNCTION set_favorite_user_id();
```

This setup ensures that:

- Each favorite is linked to a user
- Users can only see, add, and delete their own favorites
- The user_id is automatically set when a favorite is created

## Frontend Implementation

### Type Definitions

Create a type definition for country favorites in `frontend/src/types/favorite.ts`:

```typescript
export interface CountryFavorite {
  id: string;
  created_at: string;
  country_name: string;
  country_code: string;
  country_flag: string;
  user_id: string;
}

export interface FavoritesState {
  favorites: CountryFavorite[];
  loading: boolean;
  error: string | null;
}
```

## API Service

Create a service to handle favorites operations in `frontend/src/api/services/favorites.ts`:

```typescript
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
```

## Components

### TODO:
