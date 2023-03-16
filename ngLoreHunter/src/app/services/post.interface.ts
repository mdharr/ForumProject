import { Category } from "../models/category";
import { User } from "../models/user";

export interface PostInterface {
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
}
