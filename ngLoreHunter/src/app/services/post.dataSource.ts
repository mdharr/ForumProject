import { DataSource } from "@angular/cdk/collections";
import { Injectable, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { Sort } from "@angular/material/sort";
import { BehaviorSubject, Observable } from "rxjs";
import { Post } from "../models/post";
import { PostService } from "./post.service";


@Injectable()
export class PostDataSource extends DataSource<Post> {
  posts$ = new BehaviorSubject<Post[]>([]);
  isLoading$ = new BehaviorSubject<boolean>(false);
  sort: any;

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
