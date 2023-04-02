import { DataSource } from "@angular/cdk/collections";
import { Injectable, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { Sort } from "@angular/material/sort";
import { BehaviorSubject, Observable } from "rxjs";
import { Post } from "../models/post";
import { PostInterface } from "./post.interface";
import { PostService } from "./post.service";


@Injectable()
export class PostDataSource extends DataSource<Post> {
  posts$ = new BehaviorSubject<Post[]>([]);
  isLoading$ = new BehaviorSubject<boolean>(false);
  latest$ = new BehaviorSubject<Post[]>([]);
  sort: any;

  constructor(private postService: PostService) {
    super();
  }

  connect(): Observable<Post[]> {
    return this.posts$.asObservable();
  }

  disconnect(): void {
    this.posts$.complete();
    this.isLoading$.complete();
  }

  loadPosts(categoryId: number): Observable<Post[]> {
    this.isLoading$.next(true);
    console.log(categoryId);
    this.postService.postsByCategory(categoryId).subscribe((posts) => {
      this.posts$.next(posts);
      this.isLoading$.next(false);
    });
    return this.posts$;
  }

  loadAllPosts(): void {
    this.isLoading$.next(true);
    this.postService.indexAll().subscribe((posts) => {
      this.posts$.next(posts);
      this.isLoading$.next(false);
    });
  }

  loadLatestPost(categoryId: number): void {
    this.isLoading$.next(true);
    console.log(categoryId);
    this.postService.getPosts(categoryId).subscribe((posts) => {
      this.latest$.next(posts);
      this.isLoading$.next(false);
    });

  }

}
