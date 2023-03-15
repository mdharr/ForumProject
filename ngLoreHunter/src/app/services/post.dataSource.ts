import { DataSource } from "@angular/cdk/collections";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Post } from "../models/post";
import { PostService } from "./post.service";


@Injectable()
export class PostDataSource extends DataSource<Post> {
  posts$ = new BehaviorSubject<Post[]>([]);
  isLoading$ = new BehaviorSubject<boolean>(false);

  categoryId: number = 1;

  constructor(private postService: PostService) {
    super();
  }

  connect(): Observable<Post[]> {
    return this.posts$.asObservable();
  }

  disconnect(): void {
    this.posts$.complete();
  }

  loadPosts(): void {
    this.isLoading$.next(true);
    this.postService.fetchPosts(this.categoryId).subscribe((posts) => {
      this.posts$.next(posts);
      this.isLoading$.next(false);
    });
  }

}
