export class Like {
  id: number;
  userId: number;
  commentId: number;

  constructor(
    id: number = 0,
    userId: number = 0,
    commentId: number = 0
  ) {
    this.id = id;
    this.userId = userId;
    this.commentId = commentId;
  }
}
