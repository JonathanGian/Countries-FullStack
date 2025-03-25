import React, { useEffect, useState, useCallback } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
  Rating,
  Avatar,
} from "@mui/material";
import { Review } from "../types/reviews";
import { reviewsApi } from "../api/services/reviews";
import { useAuth } from "../context/AuthContext";

interface ReviewsProps {
  countryCode: string;
  countryName: string;
}

const Reviews: React.FC<ReviewsProps> = ({ countryCode, countryName }) => {
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState<number | null>(0);
  const [comment, setComment] = useState("");
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editingRating, setEditingRating] = useState<number | null>(0);
  const [editingComment, setEditingComment] = useState<string>("");

  // Define fetchReviews outside useEffect so it's accessible by handlers
  const fetchReviews = useCallback(
    async (useCache = true) => {
      try {
        const fetchedReviews = await reviewsApi.getReviews(countryCode, useCache);
        setReviews(fetchedReviews);
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    },
    [countryCode]
  );

  // Use useEffect to load reviews initially when countryCode changes
  useEffect(() => {
    fetchReviews();
  }, [countryCode, fetchReviews]);

  const handleSubmit = async () => {
    if (!user) {
      alert("You must be logged in to submit a review.");
      return;
    }
    if (rating === null || rating === 0) {
      alert("Please select a rating.");
      return;
    }
    const payload = {
      country_code: countryCode,
      country_name: countryName,
      rating,
      comment,
      ...(user && {
        user_name: user.user_metadata?.full_name,
        user_email: user.email || "N/A",
        user_avatar_url: user.user_metadata?.avatar_url,
      }),
    };
    try {
      await reviewsApi.addReview(payload);
      fetchReviews(false); // Refresh reviews list, bypassing cache
      setComment("");
    } catch (error) {
      console.error("Error adding review:", error);
    }
  };

  const handleRemoveReview = async (reviewId: string) => {
    try {
      await reviewsApi.removeReview(reviewId, countryCode);
      fetchReviews(false);
    } catch (error) {
      console.error("Error removing review:", error);
    }
  };

  const handleAvatarError = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = "https://via.placeholder.com/32";
    event.currentTarget.onerror = null;
  };

  return (
    <Box>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Reviews
      </Typography>
      {reviews.map((review) => (
        <Box
          key={review.id}
          sx={{
            border: "1px solid #ccc",
            padding: 2,
            mb: 2,
            display: "flex",
            alignItems: "center",
          }}
        >
          {review.user_avatar_url && (
            <Avatar
              src={review.user_avatar_url}
              alt={review.user_name || review.user_email}
              sx={{ width: 32, height: 32, mr: 1 }}
              onError={handleAvatarError}
            />
          )}
          <Box sx={{ flexGrow: 1 }}>
            {editingReviewId === review.id ? (
              <>
                <Rating
                  name={`edit-rating-${review.id}`}
                  value={editingRating || 0}
                  onChange={(_event, newValue) =>
                    setEditingRating(newValue)
                  }
                />
                <TextField
                  label="Edit Review"
                  multiline
                  rows={2}
                  value={editingComment}
                  onChange={(e) => setEditingComment(e.target.value)}
                  fullWidth
                  sx={{ mt: 1 }}
                />
              </>
            ) : (
              <>
                <Rating value={review.rating} readOnly />
                <Typography variant="body1">{review.comment}</Typography>
              </>
            )}
            <Typography variant="caption">
              Posted on {new Date(review.created_at).toLocaleDateString()} by{" "}
              {review.user_name || review.user_email}
            </Typography>
          </Box>
          {user && user.email === review.user_email && (
            editingReviewId === review.id ? (
              <Box sx={{ ml: 2 }}>
                <Button
                  variant="text"
                  color="primary"
                  onClick={async () => {
                    try {
                      await reviewsApi.updateReview(review.id, {
                        rating: editingRating || 0,
                        comment: editingComment,
                      });
                      setEditingReviewId(null);
                      fetchReviews(false);
                    } catch (error) {
                      console.error("Error updating review:", error);
                    }
                  }}
                >
                  Save
                </Button>
                <Button
                  variant="text"
                  color="inherit"
                  onClick={() => setEditingReviewId(null)}
                >
                  Cancel
                </Button>
              </Box>
            ) : (
              <Box sx={{ ml: 2 }}>
                <Button
                  variant="text"
                  color="primary"
                  onClick={() => {
                    setEditingReviewId(review.id);
                    setEditingRating(review.rating);
                    setEditingComment(review.comment || "");
                  }}
                >
                  Edit
                </Button>
                <Button
                  variant="text"
                  color="error"
                  onClick={() => handleRemoveReview(review.id)}
                >
                  Delete
                </Button>
              </Box>
            )
          )}
        </Box>
      ))}
      <Box sx={{ mt: 3 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Add a Review
        </Typography>
        <Rating
          name="review-rating"
          value={rating || 0}
          onChange={(_event, newValue) => setRating(newValue)}
        />
        <TextField
          label="Review"
          multiline
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          fullWidth
          disabled={!user}
          sx={{ mt: 2 }}
        />
        
        <Button variant="contained" disabled={!user} onClick={handleSubmit} sx={{ mt: 2 }}>
          Submit Review
        </Button>
      </Box>
    </Box>
  );
};

export default Reviews;