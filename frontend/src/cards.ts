interface Card {
  [id: string]: {
    content: string;
    hint: string;
  };
}

export default class Cards {
  cards: Card;

  constructor() {
    this.cards = {};
  }

  async init(): Promise<void> {
    this.cards = await this.getCards();
  }

  public static async build(): Promise<Cards> {
    const cards = new Cards();
    await cards.init();
    return cards;
  }

  async getCards(): Promise<Card> {
    // TODO: change this part to backend call
    const response = await fetch("./db/cards.json");
    const data = await response.json();
    return data;
  }

  randomId(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  saveCard(content: string) {
    this.cards[this.randomId()] = {
      content: content,
      hint: "",
    };
    // TODO: call backend to add new card
  }

  deleteCard(cardId: string) {
    if (
      Object.keys(this.cards).includes(cardId) &&
      Object.keys(this.cards).length > 1
    ) {
      delete this.cards[cardId];
      // TODO: call backend to delete card
    } else
      throw new Error(
        "Problem with deleting card: card not found or only one card left"
      );
  }
}
