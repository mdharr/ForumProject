import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { Category } from 'src/app/models/category';
import { catchError, EMPTY, map, Observable, Subscription, tap, throwError } from 'rxjs';
import { HomeService } from 'src/app/services/home.service';
import { HttpClient } from '@angular/common/http';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit, OnDestroy {

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

  private loggedInUserSubscription: Subscription | undefined;
  private indexAllSubscription: Subscription | undefined;
  private homeServIndexSubscription: Subscription | undefined;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private homeServ: HomeService,
    private router: Router,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute
    ) {
  }

  ngOnInit() {

    this.loggedInUserSubscription = this.authService.getLoggedInUser().subscribe({
      next: (user) => {
        this.loggedInUser = user;
        console.log(user);
      },
      error: (error) => {
        console.log('Error getting loggedInUser');
        console.log(error);
      },
    });

    this.authService.getCurrentLoggedInUser().subscribe((user: User) => {
      this.loggedInUser = user;
      // Do something with the logged-in user object, e.g. update UI
    });

    this.indexAllSubscription = this.postService.indexAll().pipe(
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

    this.homeServIndexSubscription = this.homeServ.index().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error:(fail) => {
        console.error('Error getting categories:');
        console.error(fail);
      }
    });

  }

  ngOnDestroy() {
    if (this.loggedInUserSubscription) {
      this.loggedInUserSubscription.unsubscribe();
    }

    if (this.indexAllSubscription) {
      this.indexAllSubscription.unsubscribe();
    }

    if (this.homeServIndexSubscription) {
      this.homeServIndexSubscription.unsubscribe();
    }
  }

  incrementViewCount(categoryId: number, postId: number): void {
    // Call the API to increment the view count
    this.postService.updateViewCount(categoryId, postId).subscribe({
      next: (data) => {
        this.postCreated = true;
        this.post = data;

        this.posts$ = this.postService.postsByCategory(categoryId);
      },
      error: (nojoy) => {
        console.error(
          'PostsComponent.addPost: error creating post'
        );
          console.error(nojoy);
      }
    });
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

  isNotANumber(value: any): boolean {
    return isNaN(value);
  }

  parseToInt(value: string): number {
    return parseInt(value);
  }

  // getCategoryByPostId(postId: number): Observable<number> {
  //   return this.categoryService.getCategoryIdByPostId(postId).pipe(
  //     map(categoryId => {
  //       this.categoryId = categoryId;
  //       // Handle the category id, for example, update the UI or perform any other operation
  //       console.log('Category ID:', categoryId);
  //       return this.categoryId; // Return the category ID value
  //     }),
  //     catchError(error => {
  //       // Handle the error, for example, show an error message
  //       console.error(error);
  //       // You can choose to return a default value or throw an error here if needed
  //       // For example, you can return -1 or throw a custom error
  //       return throwError(() => new Error('Error retrieving category ID: ' + error));
  //     })
  //   );
  // }

  getCategoryIdByPostId(postId: number): void {
    this.categoryService.getCategoryIdByPostId(postId).pipe(
      catchError(error => {
        console.error(error);
        return throwError(() => new Error('Error retrieving category ID: ' + error));
      })
    ).subscribe(categoryId => {
      this.navigateToComments(categoryId, postId); // Call navigateToComments with categoryId and postId as arguments
    });
  }

  navigateToComments(categoryId: number, postId: number): void {
    const url = `/categories/${categoryId}/posts/${postId}/comments`;
    const queryParams: NavigationExtras = {
      queryParams: {
        categoryId: categoryId,
        postId: postId
      }
    };
    this.router.navigate([url], queryParams);
  }

  getCategoryIdAndNavigateToComments(postId: number): void {
    this.categoryService.getCategoryIdByPostId(postId).pipe(
      catchError(error => {
        console.error(error);
        // Handle error case here, if needed
        return EMPTY; // Return an empty observable to prevent error propagation
      })
    ).subscribe(categoryId => {
      this.navigateToComments(categoryId, postId);
    });
  }

}
