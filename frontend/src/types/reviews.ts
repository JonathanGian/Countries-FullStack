export interface Review {
  id: string;
  created_at: string;
  country_code: string;
  country_name: string;
  rating: number;
  comment?: string;
  user_id: string;
  user_name: string;
  user_avatar_url?: string;
  user_email?: string;
}
export interface AddReview{
    country_code: string;
    country_name: string;
    rating: number;
    comment?: string;
    user_name: string;
    user_email: string;
    user_avatar_url?: string;
}
export interface ReviewsProps {
  country: string;
}
