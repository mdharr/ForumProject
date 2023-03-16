import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Injectable } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { BehaviorSubject, Observable } from "rxjs";
import { CommentService } from "./comment.service";
import { Comment } from "../models/comment";

@Injectable()
export class CommentDataSource extends DataSource<Comment> {
  comments$ = new BehaviorSubject<Comment[]>([]);
  isLoading$ = new BehaviorSubject<boolean>(false);
  sort: any;

  constructor(private commentService: CommentService) {
    super();
  }

  connect(collectionViewer: CollectionViewer): Observable<Comment[]> {
    return this.comments$.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.comments$.complete();
    this.isLoading$.complete();
  }

  loadComments(categoryId: number, postId: number, sort: Sort): void {
    this.isLoading$.next(true);
    console.log(categoryId);
    console.log(postId);
    this.commentService.fetchComments(categoryId, postId, sort).subscribe((comments) => {
      this.comments$.next(comments);
      this.isLoading$.next(false);
    });
  }

}
