import { Post } from "./post";
import { User } from "./user";

export class Comment {
  id: number;
  content: string;
  createdAt: string;
  status: string;
  lastEdited: string;
  enabled: boolean;
  user: User;
  post: Post;
  parentId: number;

  constructor(
    id: number = 0,
    content: string = '',
    createdAt: string = '',
    status: string = '',
    lastEdited: string = '',
    enabled: boolean = false,
    user: User = new User(),
    post: Post = new Post(),
    parentId: number = 0,
  ) {
    this.id = id;
    this.content = content;
    this.createdAt = createdAt;
    this.status = status;
    this.lastEdited = lastEdited;
    this.enabled = enabled;
    this.user = user;
    this.post = post;
    this.parentId = parentId;
  }
}
