/* eslint-disable @typescript-eslint/no-var-requires */
import { Cards } from './cards.interface';
const fs = require('fs').promises;
import { AddCardBodyDto } from './dto/add-card-body.dto';
import { S3 } from 'aws-sdk';

export class CardsRepository {
  private getS3() {
    return new S3();
  }

  private async getCardsFromFile(): Promise<Cards> {
    const s3 = this.getS3();
    try {
      const data = await s3
        .getObject({
          Bucket: process.env.BUCKET_NAME,
          Key: 'cards.json',
        })
        .promise();

      return JSON.parse(data.Body.toString());
    } catch (error) {
      console.log(error);
      throw new Error('Problem with getting cards');
    }
  }

  private async saveCardsToFile(cards: Cards): Promise<void> {
    try {
      const s3 = this.getS3();
      await s3
        .putObject({
          Bucket: process.env.BUCKET_NAME,
          Key: 'cards.json',
          Body: JSON.stringify(cards),
          ACL: 'public-read',
        })
        .promise();
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
