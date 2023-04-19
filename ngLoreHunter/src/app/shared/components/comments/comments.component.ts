import { AfterViewInit, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild } from '@angular/core';
import { Post } from 'src/app/models/post';
import { Comment } from 'src/app/models/comment';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { CommentService } from 'src/app/services/comment.service';
import { HomeService } from 'src/app/services/home.service';
import { PostService } from 'src/app/services/post.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { catchError, EMPTY, map, Observable, of, Subscription, switchMap } from 'rxjs';
import { Category } from 'src/app/models/category';
import { User } from 'src/app/models/user';
import { PostDataSource } from 'src/app/services/post.dataSource';
import { CommentDataSource } from 'src/app/services/comment.dataSource';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'ngLoreHunter';

  public Editor = ClassicEditor;
  @ViewChild('ckeditorInstance') ckeditorInstance: any; // Add this line to access the CKEditor instance

  displayedColumns: string[] = ['user', 'content'];

  dataSource = new CommentDataSource(this.commentService);

  paramsSub: Subscription | undefined;

  posts: Post[] = [];

  categories: Category[] = [];
  // post: null | Post = null;
  post: Post | null = null;

  users: User[] = [];
  selected: Post = new Post();
  categoryId: number = 0;
  postId: number = 0;
  value: any;

  newPost: Post = new Post();

  postsByCategory: Post[] = [];

  comments: Comment[] = [];
  comments$: Observable<Comment[]> = this.commentService.commentsByPost(this.categoryId, this.postId);

  user: any;

  comment: Comment = new Comment();
  newComment: Comment = new Comment();
  loggedInUser: User = new User();

  postCreated = false;
  showForm: boolean = false;
  addPostMod: Post | null = null;

  selectedSearch: string = 'all';

  content = new FormControl('', [Validators.required]);
  checkCkEditor: boolean = false;

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private authService: AuthService,
    private router: Router,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private homeService: HomeService,
    private http: HttpClient,
    private sanitizer:DomSanitizer,
    private _renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private dialog: MatDialog,
    ) {

    }

  ngOnInit() {

    console.log(this.activatedRoute);

    this.paramsSub = this.activatedRoute.paramMap.pipe(
      switchMap((param) => {
        console.log(param);
        console.log(this.postId);

        let idString = param.get('categoryId');
        let idString2 = param.get('postId');
        if (idString && idString2) {
          this.categoryId = +idString;
          this.postId = +idString2;
          if (!isNaN(this.categoryId && this.postId)) {
            if (this.categoryId === 0) {
              return this.categoryService.getCategoryIdByPostId(this.postId).pipe(
                switchMap((categoryId) => {
                  this.categoryId = categoryId;
                  return this.categoryService.find(this.categoryId).pipe(
                    switchMap((category) => {
                      console.log(category);
                      console.log(this.categoryId);
                      console.log(this.postId);
                      console.log(this.comments);
                      // Perform actions with category data
                      // this.navigateToComments(this.categoryId, this.postId);
                      this.comments$ = this.commentService.fetchComments(this.categoryId, this.postId).pipe();
                      return this.postService.show(this.categoryId, this.postId);
                    }),
                    switchMap((post) => {
                      console.log(post);
                      console.log(this.postId);
                      // Perform actions with post data
                      // this.updateViewCount(this.postId, this.categoryId);
                      return EMPTY; // Replace with appropriate observable if needed
                    }),
                    catchError((fail) => {
                      console.log(fail);
                      // Handle error for postService.show
                      // this.router.navigateByUrl('postNotFound');
                      return EMPTY; // Replace with appropriate observable if needed
                    })
                  );
                }),
                catchError((err) => {
                  console.log(err);
                  // Handle error for getCategoryIdByPostId
                  // this.router.navigateByUrl('categoryIdNotFound');
                  return EMPTY; // Replace with appropriate observable if needed
                })
              );
            } else {
              return this.categoryService.find(this.categoryId).pipe(
                switchMap((category) => {
                  console.log(category);
                  console.log(this.categoryId);
                  console.log(this.postId);
                  console.log(this.comments);
                  // Perform actions with category data
                  this.comments$ = this.commentService.fetchComments(this.categoryId, this.postId).pipe();

                  return this.postService.show(this.categoryId, this.postId);
                }),
                switchMap((post) => {
                  console.log(post);
                  console.log(this.postId);
                  // Perform actions with post data
                  // this.updateViewCount(this.postId, this.categoryId);
                  return EMPTY; // Replace with appropriate observable if needed
                }),
                catchError((fail) => {
                  console.log(fail);
                  // Handle error for postService.show
                  // this.router.navigateByUrl('postNotFound');
                  return EMPTY; // Replace with appropriate observable if needed
                })
              );
            }
          } else {
            // this.router.navigateByUrl('invalidPostId');
            return EMPTY; // Replace with appropriate observable if needed
          }
        } else {
          return EMPTY; // Replace with appropriate observable if needed
        }
      })
    ).subscribe();

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

    // this.comments$ = this.dataSource.loadComments(this.categoryId, this.postId);
    this.comments$ = this.commentService.fetchComments(this.categoryId, this.postId).pipe();

  }

  ngOnDestroy() {
    if (this.paramsSub) {
      this.paramsSub.unsubscribe();
    }

  }

  // needs work
  updateViewCount(postId: number, categoryId: number): void {
    console.log('in editInformation');
    this.postService.update(this.postId, this.categoryId).subscribe({
      next: (post) => {
        post.viewCount += post.viewCount;
        console.log("Before view count update" + post.viewCount);
        post.viewCount += post.viewCount;
        console.log("After first view count update" + post.viewCount);
      }
    });
  }

  loggedIn(): boolean {
    return this.authService.checkLogin();
  }

  reload() {
    this.postService.postsByCategory(this.categoryId).subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error: (err) => {
        console.error('Error loading posts');
        console.error(err);
      },
    });

    this.homeService.index().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error:(fail) => {
        console.error('Error getting categories:');
        console.error(fail);
      }
    });
  }

  getComments(categoryId: number, postId: number) {
    // this.postService.postsByCategory(id).subscribe({
    //   next: (posts) => {
    //     this.posts = posts;
    //     console.log(this.posts);
    //   },
    //   error: (err) => {
    //     console.error('Error loading post comments');
    //     console.error(err);
    //   },
    // });
    this.commentService.fetchComments(categoryId, postId).subscribe({

    });
  }

  createComment(comment: Comment, selected: Post) {
    let id = this.selected.id;
    if (id) {
      comment.post.id = id;
    }
    console.log(comment);
    this.commentService.createComment(comment, this.categoryId, this.postId).subscribe({
      next: (data) => {
        // this.newComment.post.id = selected.id;
        // this.newComment.user.id = this.loggedInUser.id;
        // this.newComment = new Comment();
        // this.comments$ = this.commentService.fetchComments(this.categoryId, this.postId);
        this.comments$ = this.dataSource.loadComments(this.categoryId, this.postId);
      },
      error: (nojoy) => {
        console.error('CommentComponent.createComment: Error creating comment.');
        console.error(nojoy);
      },
    });

  }

  displayTable() {
    console.log(this.posts);
    location.reload();

  }

  displayPost(post: Post) {
    this.selected = post;
    if (this.selected) {
      console.log('user name');

    }

    if (this.selected && this.selected.id) {
      // invoke getComments method with this.selected.id as argument
    }
  }

  sortComments(sort: Sort): void {
    this.dataSource.loadComments(this.categoryId, this.postId);
  }

  getErrorMessageContent() {
    if(this.content.hasError('required')) {
      return 'Must enter valid content to submit';
    }
    return this.content.hasError('content') ? 'Not valid content' : '';
  }

  submitButtonClicked() {
    if (!this.content.valid) {
      this.checkCkEditor = true;
      this.content.markAllAsTouched();
      console.log('Submit button clicked');
      return
    } else {
      this.createComment(this.newComment, this.selected);
      this.ckeditorInstance.editorInstance.setData('');
    }
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

  ngAfterViewInit() {

  }

}
