import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
  Header,
  UseGuards,
} from '@nestjs/common';
import { CardsService } from './cards.service';
import { AddCardBodyDto } from './dto/add-card-body.dto';
import { Cards } from './cards.interface';
import { AuthGuard } from '@nestjs/passport';

@Controller('cards')
export class CardsController {
  constructor(private cardsService: CardsService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get('/')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Credentials', 'true')
  async getCards(): Promise<Cards> {
    return await this.cardsService.getCards();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post('/:id')
  @UsePipes(new ValidationPipe())
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Credentials', 'true')
  async addCard(
    @Param('id') id: string,
    @Body() addCardBody: AddCardBodyDto,
  ): Promise<string> {
    await this.cardsService.addCard(id, addCardBody);
    return 'Card was added successfully!';
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete('/:id')
  @Header('Access-Control-Allow-Origin', '*')
  @Header('Access-Control-Allow-Credentials', 'true')
  async deleteCard(@Param('id') id: string): Promise<string> {
    await this.cardsService.deleteCard(id);
    return 'Card was deleted successfully!';
  }
}
