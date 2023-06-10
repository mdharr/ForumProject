import { Game } from "./game";

export class UserGame {
  id: {
    userId: number;
    gameId: number;
  }
  game: Game;
  gameCategory: GameCategory;
  rating: GameRating;
  review: string;
  isRecommended: boolean;
  playtime: number;

  constructor(
    id: { userId: number, gameId: number },
    game: Game = new Game(0, undefined, undefined, undefined, undefined, undefined, 0),
    gameCategory: GameCategory = GameCategory.PLAYING,
    rating: GameRating = GameRating.ZERO,
    review: string = '',
    isRecommended: boolean = false,
    playtime: number = 0
  ) {
    this.id = id;
    this.game = game;
    this.gameCategory = gameCategory;
    this.rating = rating;
    this.review = review;
    this.isRecommended = isRecommended;
    this.playtime = playtime;
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

