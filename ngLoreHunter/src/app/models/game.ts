export class Game {

  slug: string;
  name: string;
  description: string;
  released: string;
  backgroundImage: string;

  constructor(
    slug: string = "",
    name: string = "",
    description: string = "",
    released: string = "",
    backgroundImage: string = ""
  ) {
    this.slug = slug;
    this.name = name;
    this.description = description;
    this.released = released;
    this.backgroundImage = backgroundImage;
  }
}
