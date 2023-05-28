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
    game: Game = new Game(),
    category: string = '',
    rating: string = ''
  ) {
  this.id = id;
  this.game = game;
  this.category = category;
  this.rating = rating;
  }
}
