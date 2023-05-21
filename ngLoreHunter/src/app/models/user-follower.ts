export class UserFollower {
  id: {
    followerId: number;
    followedId: number;
  };
  follower: {
    id: number;
    username: string;
    imageUrl: string;
    firstName: string;
    bannerMessage: string;
    // Other properties of the follower user
  };
  followed: {
    id: number;
    username: string;
    imageUrl: string;
    firstName: string;
    bannerMessage: string;
    // Other properties of the followed user
  };

  constructor(
    id: { followerId: number; followedId: number },
    follower: { id: number; username: string; imageUrl: string; firstName: string; bannerMessage: string; },
    followed: { id: number; username: string; imageUrl: string; firstName: string; bannerMessage: string; }
  ) {
    this.id = id;
    this.follower = follower;
    this.followed = followed;
  }
}
