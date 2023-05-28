import { Game } from "./game";

export class UserGame {
  id: {
    userId: number;
    gameId: number;
  }
  game: Game;
  category: GameCategory;
  rating: GameRating;

  constructor(
    id: { userId: number, gameId: number },
    game: Game = new Game(0, undefined, undefined, undefined, undefined, undefined, 0),
    category: GameCategory = GameCategory.PLAYING,
    rating: GameRating = GameRating.ZERO
  ) {
    this.id = id;
    this.game = game;
    this.category = category;
    this.rating = rating;
  }
}

export enum GameCategory {
  PLAYED = 'PLAYED',
  PLAYING = 'PLAYING'
}

export enum GameRating {
  ZERO = '0',
  HALF = '0.5',
  ONE = '1',
  ONE_AND_A_HALF = '1.5',
  TWO = '2',
  TWO_AND_A_HALF = '2.5',
  THREE = '3',
  THREE_AND_A_HALF = '3.5',
  FOUR = '4',
  FOUR_AND_A_HALF = '4.5',
  FIVE = '5'
}

