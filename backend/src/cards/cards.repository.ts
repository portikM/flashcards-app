/* eslint-disable @typescript-eslint/no-var-requires */
import { Cards } from './cards.interface';
const fs = require('fs').promises;
import { AddCardBodyDto } from './dto/add-card-body.dto';

export class CardsRepository {
  private async getCardsFromFile(): Promise<Cards> {
    try {
      const data = await fs.readFile('./src/cards/db/cards.json', 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.log(error);
      throw new Error('Problem with getting cards');
    }
  }

  private async saveCardsToFile(cards: Cards): Promise<void> {
    try {
      await fs.writeFile('./src/cards/db/cards.json', JSON.stringify(cards));
    } catch (error) {
      console.log(error);
      throw new Error('Problem with saving card');
    }
  }

  async getCards(): Promise<Cards> {
    return await this.getCardsFromFile();
  }

  async addCard(id: string, cardContent: AddCardBodyDto): Promise<void> {
    const cards = await this.getCardsFromFile();
    const { content, hint } = cardContent;
    cards[id] = { content, hint };

    await this.saveCardsToFile(cards);
  }

  async deleteCard(id: string): Promise<void> {
    const cards = await this.getCardsFromFile();
    delete cards[id];

    await this.saveCardsToFile(cards);
  }
}
