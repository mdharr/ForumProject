import { Category } from "./category";
import { Comment } from "./comment";
import { User } from "./user";

export class Post {
  id: number;
  subject: string;
  content: string;
  createdAt: string;
  status: string;
  lastEdited: string;
  commentCount: number;
  enabled: boolean;
  user: User;
  category: Category;
  comments: Comment[];

  constructor(
    id: number = 0,
    subject: string = '',
    content: string = '',
    createdAt: string = '',
    status: string = '',
    lastEdited: string = '',
    commentCount: number = 0,
    enabled: boolean = false,
    user: User = new User(),
    category: Category = new Category(),
    comments: Comment[] = []
  ) {
    this.id = id;
    this.subject = subject;
    this.content = content;
    this.createdAt = createdAt;
    this.status = status;
    this.lastEdited = lastEdited;
    this.commentCount = commentCount;
    this.enabled = enabled;
    this.user = user;
    this.category = category;
    this.comments = comments;
  }

}
