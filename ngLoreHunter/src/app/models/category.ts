import { Post } from "./post";
import { User } from "./user";

export class Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  status: string;
  viewCount: number;
  postCount: number;
  commentCount: number;
  enabled: boolean;
  user: User;
  posts: Post[];

  constructor(
    id: number = 0,
    name: string = '',
    description: string = '',
    createdAt: string = '',
    status: string = '',
    viewCount: number = 0,
    postCount: number = 0,
    commentCount: number = 0,
    enabled: boolean = false,
    user: User = new User(),
    posts: Post[] = []
  ) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.createdAt = createdAt;
    this.status = status;
    this.viewCount = viewCount;
    this.postCount = postCount;
    this.commentCount = commentCount;
    this.enabled = enabled;
    this.user = user;
    this.posts = posts;
  }
}
