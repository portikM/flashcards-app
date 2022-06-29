import { CardsRepository } from './cards.repository';

describe('CardsRepository', () => {
  it('should be defined', () => {
    expect(new CardsRepository()).toBeDefined();
  });
});
