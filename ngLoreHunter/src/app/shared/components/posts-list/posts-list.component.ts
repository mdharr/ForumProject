import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { Category } from 'src/app/models/category';
import { map, Observable, Subscription, tap } from 'rxjs';
import { HomeService } from 'src/app/services/home.service';
import { HttpClient } from '@angular/common/http';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  title = 'ngLoreHunter';
  public Editor = ClassicEditor;

  @ViewChild('ckeditorInstance') ckeditorInstance: any; // Add this line to access the CKEditor instance

  currentPage: number = 1;

  pageSize: number = 10;

  displayedColumns: string[] = ['user', 'subject', 'content'];

  viewCount: number = 0;

  filteredPosts: Post[] = [];

  public filterSubject: string = '';

  paramsSub: Subscription | undefined;

  post: Post = new Post();
  posts: Post[] = [];
  posts$!: Observable<Post[]>;
  categories: Category[] = [];

  users: User[] = [];
  selected: null | Post = null;
  categoryId: number = 0;
  postId: number = 0;
  value: any;

  loggedInUser: User = new User();

  postCreated = false;

  selectedSearch: string = 'all';

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private homeServ: HomeService,
    ) {
  }

  ngOnInit() {

    this.authService.getLoggedInUser().subscribe({
      next: (user) => {
        this.loggedInUser = user;
        console.log(user);
      },
      error: (error) => {
        console.log('Error getting loggedInUser');
        console.log(error);
      },
    });

    this.postService.indexAll().pipe(
      tap(posts => {
        // Set the posts data to the component's property
        this.posts = posts;
      }),
      map(posts => posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
    ).subscribe({
      next: (sortedPosts) => {
        // The sorted posts will be emitted here
        console.log(sortedPosts);
      },
      error: (error) => {
        console.log('Error getting posts');
        console.log(error);
      }
    });

    this.homeServ.index().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error:(fail) => {
        console.error('Error getting categories:');
        console.error(fail);
      }
    });

  }

  incrementViewCount(categoryId: number, postId: number): void {
    // Call the API to increment the view count
    this.postService.updateViewCount(categoryId, postId).subscribe({
      next: (data) => {
        this.postCreated = true;
        this.post = data;
        this.posts$ = this.postService.postsByCategory(this.categoryId);
      },
      error: (nojoy) => {
        console.error(
          'PostsComponent.addPost: error creating post'
        );
          console.error(nojoy);
      }
    }
  );
  }

  public filterPosts(): void {
    this.posts$ = this.postService.getAllPosts().pipe(
      map(posts => {
        return posts.filter(post => {
          let subjectMatch = true;

          if (this.filterSubject && this.filterSubject !== '') {
            subjectMatch = post.subject.toLowerCase().includes(this.filterSubject.toLowerCase());

            return subjectMatch;
          } else {
            return this.posts$ = this.postService.getAllPosts().pipe(
              map(posts => posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
            );
          }
        });
      })
    );
  }

}
