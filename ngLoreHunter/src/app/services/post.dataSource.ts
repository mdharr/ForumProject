import { DataSource } from "@angular/cdk/collections";
import { Injectable } from "@angular/core";
import { Sort } from "@angular/material/sort";
import { BehaviorSubject, Observable } from "rxjs";
import { Post } from "../models/post";
import { PostService } from "./post.service";


@Injectable()
export class PostDataSource extends DataSource<Post> {
  posts$ = new BehaviorSubject<Post[]>([]);
  isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private postService: PostService) {
    super();
  }

  connect(): Observable<Post[]> {
    return this.posts$.asObservable();
  }

  disconnect(): void {
    this.posts$.complete();
  }

  loadPosts(categoryId: number, sort: Sort): void {
    this.isLoading$.next(true);
    this.postService.fetchPosts(categoryId, sort).subscribe((posts) => {
      this.posts$.next(posts);
      this.isLoading$.next(false);
    });
  }

}
