import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { catchError, EMPTY, map, Observable, Subscription, throwError } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { HomeService } from 'src/app/services/home.service';
import { PostService } from 'src/app/services/post.service';

const TRENDING_THRESHOLD = 5;
const ONE_WEEK_IN_MS = 7 * 24 * 60 * 60 * 1000;

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {

  trendingPosts$!: Observable<Post[]>;

  @ViewChild('filterDialog') filterDialog!: TemplateRef<any>;

  currentPage: number = 1;

  pageSize: number = 10;

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
  private trendingPostsSubscription: Subscription | undefined;
  private homeServIndexSubscription: Subscription | undefined;

  constructor(
    private postService: PostService,
    private authService: AuthService,
    private homeServ: HomeService,
    private router: Router,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private dialog: MatDialog
    ) {
  }

  ngOnInit(): void {
    this.loggedInUserSubscription = this.authService.getCurrentLoggedInUser().subscribe((user: User) => {
      this.loggedInUser = user;
      // Do something with the logged-in user object, e.g. update UI
    });

    this.trendingPosts$ = this.getTrendingPosts();

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

    if (this.trendingPostsSubscription) {
      this.trendingPostsSubscription.unsubscribe();
    }

    if (this.homeServIndexSubscription) {
      this.homeServIndexSubscription.unsubscribe();
    }
  }

  getTrendingPosts(): Observable<Post[]> {
    const oneWeekAgo: number = Date.now() - ONE_WEEK_IN_MS;
      return this.postService.getAllPosts().pipe(
      map(posts => {
        return posts.filter(post => {
          const timeSinceLastEdited = Date.now() - new Date(post.lastEdited).getTime();
          const isTrending = timeSinceLastEdited <= ONE_WEEK_IN_MS && Date.parse(post.lastEdited) >= oneWeekAgo && post.comments.length >= TRENDING_THRESHOLD;
          if (timeSinceLastEdited <= ONE_WEEK_IN_MS && post.comments.length >= TRENDING_THRESHOLD) {
            post.isTrending = true;
          } else {
            post.isTrending = false;
          }
          return isTrending;
        });
      })
    );
  }

  openFilterDialog() {
    this.dialog.open(this.filterDialog, {
      width: '400px'
    });
  }

  public filterPosts(): void {
    console.log('filterPosts called');

    this.posts$ = this.postService.getAllPosts().pipe(
      map(posts => {
        if (this.filterSubject && this.filterSubject !== '') {
          return posts.filter(post => post.subject.toLowerCase().includes(this.filterSubject.toLowerCase()));
        } else {
          return posts;
        }
      }),
      map(posts => posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()))
    );
  }

  isNotANumber(value: any): boolean {
    return isNaN(value);
  }

  parseToInt(value: string): number {
    return parseInt(value);
  }

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
