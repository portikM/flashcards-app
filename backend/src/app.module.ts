import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [CardsModule, AuthModule, ConfigModule.forRoot()],
  providers: [AppService],
})
export class AppModule {}
