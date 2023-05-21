import { UserNotification } from './user-notification';

it('should create an instance', () => {
  const id = { userId: 1, notificationId: 1 };
  const viewed = false;
  const viewedAt = null;
  const dismissed = false;
  const dismissedAt = null;
  const notification = { id: 1, message: 'Example message', createdAt: '2023-05-21' };

  expect(new UserNotification(id, viewed, viewedAt, dismissed, dismissedAt, notification)).toBeTruthy();
});

