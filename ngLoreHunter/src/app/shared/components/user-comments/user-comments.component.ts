import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { catchError, EMPTY, map, Observable, of, Subscription, switchMap } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { Comment } from 'src/app/models/comment';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { CommentService } from 'src/app/services/comment.service';
import { HomeService } from 'src/app/services/home.service';
import { LikeService } from 'src/app/services/like.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-user-comments',
  templateUrl: './user-comments.component.html',
  styleUrls: ['./user-comments.component.css']
})
export class UserCommentsComponent {
  title = 'ngLoreHunter';

  displayedColumns: string[] = ['user', 'content'];

  paramsSub: Subscription | undefined;

  posts: Post[] = [];
  comments: Comment[] = [];
  comments$!: Observable<Comment[]>;

  categories: Category[] = [];
  // post: null | Post = null;
  post: Post | null = null;

  users: User[] = [];
  selected: Post = new Post();
  categoryId: number = 0;
  postId: number = 0;
  value: any;
  userId: number = 0;

  newPost: Post = new Post();

  postsByCategory: Post[] = [];

  user: any;

  comment: Comment = new Comment();
  newComment: Comment = new Comment();
  loggedInUser: User = new User();

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private authService: AuthService,
    private router: Router,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
    ) {

    }

  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      this.userId = params['userId'];
      console.log(this.userId);

      this.reload();
    });

    this.authService.getCurrentLoggedInUser().subscribe((user: User) => {
      this.loggedInUser = user;
      // Do something with the logged-in user object, e.g. update UI
    });

    this.reload();

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

    this.commentService.getUserComments(this.userId).subscribe({
      next: (comments) => {
        this.comments = comments;
        this.comments$ = of(comments);
      },
      error: (error) => {

      }
    })

  }

  ngOnDestroy() {
    if (this.paramsSub) {
      this.paramsSub.unsubscribe();
    }

  }

  loggedIn(): boolean {
    return this.authService.checkLogin();
  }

  reload() {

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

  refreshComponent() {
    // Method to be triggered from LoginComponent
    console.log('Refresh Component method called from LoginComponent');
    this.cdr.detectChanges();
    // ... implement your logic to refresh the component
  }

}
