export class Game {
  id: number;
  createdAt: string;
  title: string;
  description: string;
  released: string;
  backgroundImage: string;
  metacriticScore: number;

  constructor(
    id: number = 0,
    createdAt: string = "",
    title: string = "",
    description: string = "",
    released: string = "",
    backgroundImage: string = "",
    metacriticScore: number
  ) {
    this.id = id;
    this.createdAt = createdAt;
    this.title = title;
    this.description = description;
    this.released = released;
    this.backgroundImage = backgroundImage;
    this.metacriticScore = metacriticScore;
  }
}
