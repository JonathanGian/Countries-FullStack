import { Controller, Get, Post, Query, Body } from '@nestjs/common';
import { ReviewsService } from '../services/reviews.service';

@Controller('reviews')
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Get()
  async getReviews(@Query('countryId') countryId: string) {
    return await this.reviewsService.getReviewsByCountry(countryId);
  }

  @Post()
  async createReview(
    @Body()
    body: {
      country_id: string;
      rating: number;
      comment?: string;
      user_id: string;
    },
  ) {
    return await this.reviewsService.createReview(body);
  }
}
