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
  viewCount: number;
  user: User;
  category: Category;
  comments: Comment[];
  sort: any;

  constructor(
    id: number = 0,
    subject: string = '',
    content: string = '',
    createdAt: string = '',
    status: string = '',
    lastEdited: string = '',
    commentCount: number = 0,
    enabled: boolean = false,
    viewCount: number = 0,
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
    this.viewCount = viewCount;
    this.user = user;
    this.category = category;
    this.comments = comments;
  }

}
