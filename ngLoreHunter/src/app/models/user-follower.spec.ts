import { UserFollower } from './user-follower';

it('should create an instance', () => {
  const id = { followerId: 1, followedId: 2 };
  const follower = { id: 1, username: 'follower1', imageUrl: 'follower1.jpg', firstName: 'John', bannerMessage: 'Follow me!' };
  const followed = { id: 2, username: 'followed1', imageUrl: 'followed1.jpg', firstName: 'Jane', bannerMessage: 'I am being followed!' };
  const createdAt = new Date().toISOString();
  expect(new UserFollower(id, follower, followed, createdAt)).toBeTruthy();
});

