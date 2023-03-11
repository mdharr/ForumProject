import { Component, Input } from '@angular/core';
import { Post } from 'src/app/models/post';
import { Comment } from 'src/app/models/comment';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  comments: Comment[] = [];
  userComments: Comment[] = [];
  postComments: Comment[] = [];
  @Input() selectedPost: Post | null = null;
  userId: any;

  constructor() {}

}
