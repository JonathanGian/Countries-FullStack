import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './controllers/app.controller';
import { TestController } from './controllers/test.controller';
import { AppService } from './services/app.service';
import { SupabaseService } from './services/supabase.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [AppController, TestController],
  providers: [AppService, SupabaseService],
})
export class AppModule {}
