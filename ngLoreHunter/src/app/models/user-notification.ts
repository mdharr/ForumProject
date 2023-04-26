export class UserNotification {
  id: {
    userId: number;
    notificationId: number;
  };
  viewed: boolean;
  viewedAt: string | null;
  dismissed: boolean;
  dismissedAt: string | null;
  notification: {
    id: number;
    message: string;
    createdAt: string;
  };

  constructor(
    id: { userId: number; notificationId: number },
    viewed: boolean,
    viewedAt: string | null,
    dismissed: boolean,
    dismissedAt: string | null,
    notification: { id: number; message: string; createdAt: string }
  ) {
    this.id = id;
    this.viewed = viewed;
    this.viewedAt = viewedAt;
    this.dismissed = dismissed;
    this.dismissedAt = dismissedAt;
    this.notification = notification;
  }
}
