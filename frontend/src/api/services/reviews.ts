import { supabase } from "../../config/supabase";
import { AddReview, Review } from "../../types/reviews";

// Cache reviews per country to reduce redundant API calls
const reviewsCache: { [countryId: string]: Review[] } = {};
const lastFetchTime: { [countryId: string]: number } = {};
const CACHE_EXPIRY = 30000; // 30 seconds

export const reviewsApi = {
  /**
   * Get reviews for a specific country.
   * @param countryId The ID of the country.
   * @param useCache Whether to use cached data if available.
   */
  async getReviews(countryId: string, useCache = true): Promise<Review[]> {
    const now = Date.now();
    if (
      useCache &&
      reviewsCache[countryId] &&
      now - (lastFetchTime[countryId] || 0) < CACHE_EXPIRY
    ) {
      return reviewsCache[countryId];
    }

    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq('country_code', countryId)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching reviews:", error);
      throw new Error(error.message);
    }

    reviewsCache[countryId] = data || [];
    lastFetchTime[countryId] = now;

    return reviewsCache[countryId];
  },

  /**
   * Add a review for a country.
   * @param review An object containing country_code, country_name, rating, and an optional comment.
   */
  async addReview(review:AddReview): Promise<Review> {
    const { data, error } = await supabase
      .from("reviews")
      .insert([review])
      .select()
      .single();

    if (error) {
      console.error("Error adding review:", error);
      throw new Error(error.message);
    }

    // Update cache if available
    if (reviewsCache[review.country_code]) {
      // Add the new review at the beginning of the cache
      reviewsCache[review.country_code].unshift(data);
    }

    return data;
  },

  /**
   * Remove a review by its ID.
   * @param reviewId The ID of the review to remove.
   * @param countryId The country ID for which the review belongs (for updating cache).
   */
  async removeReview(reviewId: string, countryId: string): Promise<void> {
    const { error } = await supabase
      .from("reviews")
      .delete()
      .eq("id", reviewId);

    if (error) {
      console.error("Error removing review:", error);
      throw new Error(error.message);
    }

    // Update cache if it exists
    if (reviewsCache[countryId]) {
      reviewsCache[countryId] = reviewsCache[countryId].filter(
        (review) => review.id !== reviewId
      );
    }
  },
  
  /**
   * Update a review by its ID.
   * @param reviewId The ID of the review to update.
   * @param updatedFields The updated review data. 
   */
  async updateReview(reviewId: string, updatedFields: {rating: number, comment?: string}): Promise<Review> {
    const { data, error } = await supabase
    .from("reviews")
    .update(updatedFields)
    .eq("id", reviewId)
    .single();

    if (error) {
        console.error("Error updating review:", error);
        throw new Error(error.message);
    }
    return data;
  },

  /**
   * Clear the reviews cache.
   */
  clearCache() {
    Object.keys(reviewsCache).forEach(key => delete reviewsCache[key]);
    Object.keys(lastFetchTime).forEach(key => delete lastFetchTime[key]);
  },
};