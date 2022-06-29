import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';

@Module({
  imports: [CardsModule],
  providers: [AppService],
})
export class AppModule {}
