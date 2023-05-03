import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { Observable, Subscription, map, take, catchError, EMPTY, of, throwError } from 'rxjs';
import { Category } from 'src/app/models/category';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { CommentService } from 'src/app/services/comment.service';
import { HomeService } from 'src/app/services/home.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit, AfterViewInit, OnDestroy {

  title = 'ngLoreHunter';

  @ViewChild('ckeditorInstance') ckeditorInstance: any; // Add this line to access the CKEditor instance
  @ViewChild('filterDialog') filterDialog!: TemplateRef<any>;
  @Input() currentPage: number = 1;
  @Input() pageCount: number = 0;

  pageSize: number = 5;
  totalPosts: number = 0;
  totalPages: number = 0;

  displayedColumns: string[] = ['user', 'subject', 'content'];

  viewCount: number = 0;

  filteredPosts: Post[] = [];

  public filterSubject: string = '';

  post: Post = new Post();
  posts: Post[] = [];
  posts$!: Observable<Post[]>;
  categories: Category[] = [];

  users: User[] = [];
  selected: null | Post = null;
  categoryId: number = 0;
  postId: number = 0;
  value: any;
  userId: number = 0;

  newPost: Post = new Post();

  postsByCategory: Post[] = [];

  comments: Comment[] = [];
  comment: Comment = new Comment();
  newComment: Comment = new Comment();
  loggedInUser: User = new User();

  postCreated = false;
  showForm: boolean = false;
  addPostMod: Post | null = null;

  selectedSearch: string = 'all';

  subject = new FormControl('', [Validators.required]);
  content = new FormControl('', [Validators.required]);
  checkCkEditor: boolean = false;

  private paramsSub: Subscription | undefined;
  private totalPostsByCategorySubscription: Subscription | undefined;
  private userPostsSubscription: Subscription | undefined;

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private authService: AuthService,
    private router: Router,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private homeServ: HomeService,
    private http: HttpClient,
    private dialog: MatDialog,
    private elementRef: ElementRef
    ) {}

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

    if (this.userPostsSubscription) {
      this.userPostsSubscription.unsubscribe();
    }

    // this.reload();

  }

  ngOnDestroy() {

    if (this.totalPostsByCategorySubscription) {
      this.totalPostsByCategorySubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    const toolbarElement = document.querySelector('.ck-toolbar');

    if (toolbarElement) {
      (toolbarElement as HTMLElement).style.backgroundColor = 'red !important'; // Replace with your desired background color
    }

  }

  loggedIn(): boolean {
    return this.authService.checkLogin();
  }

  reload() {
    console.log('reload called');
    console.log('userId: ' + this.userId);

    this.postService.getUserPosts(this.userId).subscribe({
      next: (posts) => {
        this.posts = posts;
        console.log(posts);
        this.posts$ = of(posts); // Assign the received posts to this.posts$
      },
      error: (error) => {
        console.log('Error getting user posts');
        console.log(error);
      },
    });



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

//   resetForm() {
//     this.newPost = new Post();
//     this.postCreated = false;
//   }

//   displayPost(post: Post | null) {
//     this.selected = post;
//     if (this.selected) {
//       this.postId = this.selected.id;
//       console.log('user name');

//     }

//     if (this.selected && this.selected.id) {
//       // invoke getComments method with this.selected.id as argument
//     }
//   }

//   editPost: Post | null = null;
//   setEditPost(): void {
//     this.editPost = Object.assign({}, this.selected);
//   }

//   getErrorMessageSubject() {
//     if(this.subject.hasError('required')) {
//       return 'Must enter valid subject to submit';
//     }
//     return this.subject.hasError('subject') ? 'Not valid subject' : '';
//   }
//   getErrorMessageContent() {
//     if(this.content.hasError('required')) {
//       return 'Must enter valid content to submit';
//     }
//     return this.content.hasError('content') ? 'Not valid content' : '';
//   }

//   incrementViewCount(categoryId: number, postId: number): void {
//     // Call the API to increment the view count
//     this.postService.updateViewCount(categoryId, postId).subscribe({
//       next: (data) => {
//         this.postCreated = true;
//         this.post = data;
//         this.posts$ = this.postService.postsByCategory(this.categoryId);
//       },
//       error: (nojoy) => {
//         console.error(
//           'PostsComponent.addPost: error creating post'
//         );
//           console.error(nojoy);
//       }
//     }
//   );
//   }

//   getTotalPages(): number {
//     return Math.ceil(this.totalPosts / this.pageSize);
//   }


//   goToPreviousPage(): void {
//     if (this.currentPage > 1) {
//       this.currentPage--;
//     }
//   }

//   goToNextPage(): void {
//     if (this.posts$ !== undefined) {
//       this.posts$.pipe(
//         take(1),
//         catchError(error => {
//           console.error(error);
//           return EMPTY;
//         })
//       ).subscribe(posts => {
//         if (Array.isArray(posts) && (this.currentPage * 5) < (posts.length)) {
//           this.currentPage++;
//         }
//       });
//     }
// }

//   openFilterDialog() {
//     this.dialog.open(this.filterDialog, {
//       width: '400px'
//     });
//   }

  // public filterPosts(): void {
  //   this.posts$ = this.postService.postsByCategory(this.categoryId).pipe(
  //     map(posts => {
  //       return posts.filter(post => {
  //         let subjectMatch = true;

  //         if (this.filterSubject && this.filterSubject !== '') {
  //           subjectMatch = post.subject.toLowerCase().includes(this.filterSubject.toLowerCase());

  //           return subjectMatch;
  //         } else {
  //           return this.posts$ = this.postService.postsByCategory(this.categoryId).pipe(
  //             map(posts => posts.sort((a, b) => {
  //               let lastEditedComparison = new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime();
  //               if (lastEditedComparison === 0) {
  //                   return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  //               } else {
  //                   return lastEditedComparison;
  //               }
  //             }))
  //           );
  //         }
  //       });
  //     })
  //   );
  // }

}
