import { Game } from "./game";

export class UserGame {
  id: {
    userId: number;
    gameId: number;
  }
  game: Game;
  category: string;
  rating: string;

  constructor(
    id: { userId: number, gameId: number },
    game: Game = new Game(0, undefined, undefined, undefined, undefined, undefined, 0),
    category: string = '',
    rating: string = ''
  ) {
    this.id = id;
    this.game = game;
    this.category = category;
    this.rating = rating;
  }
}

