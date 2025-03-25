import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './controllers/app.controller';
import { TestController } from './controllers/test.controller';
import { AppService } from './services/app.service';
import { SupabaseService } from './services/supabase.service';
import { ReviewsController } from './controllers/reviews.controller';
import { ReviewsService } from './services/reviews.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController, TestController, ReviewsController],
  providers: [AppService, SupabaseService, ReviewsService],
})
export class AppModule {}
