import { Injectable } from '@nestjs/common';
import { SupabaseService } from './supabase.service';

@Injectable()
export class ReviewsService {
  constructor(private readonly supabaseService: SupabaseService) {}

  async getReviewsByCountry(countryId: string) {
    const { data, error } = await this.supabaseService.supabase
      .from('reviews')
      .select('*')
      .eq('country_id', countryId)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data;
  }

  async createReview(review: {
    country_id: string;
    rating: number;
    comment?: string;
    user_id: string;
  }) {
    const { data, error } = await this.supabaseService.supabase
      .from('reviews')
      .insert([review]);
    if (error) throw error;
    return data;
  }
}
