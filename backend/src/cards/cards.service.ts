import { Injectable } from '@nestjs/common';
import { CardsRepository } from './cards.repository';
import { Cards } from './cards.interface';
import { AddCardBodyDto } from './dto/add-card-body.dto';

@Injectable()
export class CardsService {
  constructor(private cardsRepo: CardsRepository) {}

  getCards(): Promise<Cards> {
    return this.cardsRepo.getCards();
  }

  addCard(id: string, cardContent: AddCardBodyDto): Promise<void> {
    return this.cardsRepo.addCard(id, cardContent);
  }

  deleteCard(id: string): Promise<void> {
    return this.cardsRepo.deleteCard(id);
  }
}
