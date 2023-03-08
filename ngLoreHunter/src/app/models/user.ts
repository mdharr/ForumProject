import { Category } from "./category";
import { Post } from "./post";
import { Comment } from "./comment";
import { first } from "rxjs";

export class User {

  id: number;
  username: string;
  password: string;
  enabled: boolean;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  createdAt: string;
  imageUrl: string;
  lastActivity: string;
  status: string;
  commentCount: number;
  postCount: number;
  bannerMessage: string;
  categories: Category[];
  posts: Post[];
  comments: Comment[];


  constructor(
    id: number = 0,
    username: string = '',
    password: string = '',
    enabled: boolean = false,
    role: string = '',
    firstName: string = '',
    lastName: string = '',
    email: string = '',
    createdAt: string = '',
    imageUrl: string = '',
    lastActivity: string = '',
    status: string = '',
    commentCount: number = 0,
    postCount: number = 0,
    bannerMessage: string = '',
    categories: Category[] = [],
    posts: Post[] = [],
    comments: Comment[] = []
  ) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.enabled = enabled;
    this.role = role;
    this.firstName = firstName;
    this.lastName = lastName;
    this.email = email;
    this.createdAt = createdAt;
    this.imageUrl = imageUrl;
    this.lastActivity = lastActivity;
    this.status = status;
    this.commentCount = commentCount;
    this.postCount = postCount;
    this.bannerMessage = bannerMessage;
    this.categories = categories;
    this.posts = posts;
    this.comments = comments;
  }
}
