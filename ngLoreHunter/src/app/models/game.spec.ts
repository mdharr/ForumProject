import { Game } from './game';

describe('Game', () => {
  it('should create an instance', () => {
    const game = new Game(
      1,                        // id
      '2023-05-28',             // createdAt
      'My Game',                // title
      'This is a game',         // description
      '2023-01-01',             // released
      'background-image.jpg',   // backgroundImage
      80                        // metacriticScore
    );

    expect(game).toBeTruthy();
  });
});

