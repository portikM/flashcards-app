import axios from "axios";

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
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_BASE_URL}/cards`
    );
    return response.data;
  }

  randomId(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  async saveCard(content: string) {
    const cardId = this.randomId();
    this.cards[cardId] = {
      content,
      hint: "",
    };
    try {
      const response = await axios({
        method: "post",
        url: `${import.meta.env.VITE_BACKEND_BASE_URL}/cards/${cardId}`,
        data: {
          content,
          hint: "",
        },
      });
    } catch (error) {
      console.log(error);
    }
  }

  async deleteCard(cardId: string) {
    if (
      Object.keys(this.cards).includes(cardId) &&
      Object.keys(this.cards).length > 1
    ) {
      delete this.cards[cardId];
      try {
        const response = await axios({
          method: "delete",
          url: `${import.meta.env.VITE_BACKEND_BASE_URL}/cards/${cardId}`,
        });
      } catch (error) {
        console.log(error);
      }
    } else
      throw new Error(
        "Problem with deleting card: card not found or only one card left"
      );
  }
}
