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
  ZERO = 'ZERO',
  HALF = 'HALF',
  ONE = 'ONE',
  ONE_AND_A_HALF = 'ONE_AND_A_HALF',
  TWO = 'TWO',
  TWO_AND_A_HALF = 'TWO_AND_A_HALF',
  THREE = 'THREE',
  THREE_AND_A_HALF = 'THREE_AND_A_HALF',
  FOUR = 'FOUR',
  FOUR_AND_A_HALF = 'FOUR_AND_A_HALF',
  FIVE = 'FIVE'
}

