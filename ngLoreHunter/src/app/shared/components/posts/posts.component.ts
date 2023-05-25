import { NoSanitizePipe } from './../../../utilities/nosanitizerpipe';
import { PostDataSource } from './../../../services/post.dataSource';
import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit, Input, TemplateRef, OnChanges, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { Comment } from 'src/app/models/comment';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { Category } from 'src/app/models/category';
import { catchError, debounceTime, EMPTY, map, merge, Observable, Subscription, take, tap } from 'rxjs';
import { HomeService } from 'src/app/services/home.service';
import { HttpClient } from '@angular/common/http';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import * as ClassicEditor from 'src/assets/ckeditor/ckeditor5-37.1.0-hicq7jejpz5/build/ckeditor';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { JumpToPageDialogComponent } from '../jump-to-page-dialog/jump-to-page-dialog.component';

@Component({
  selector: 'app-posts',
  template: `
  <ckeditor
    #ckeditorInstance
    name="newPost.content"
    [editor]="Editor"
    [config]="{placeholder: 'Hello, Colonel! This is Snake.', contentsCSS: ['src/app/shared/components/posts/posts.component.css']}"
    [formControl]="content"
    required
    ></ckeditor>
  `,
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'ngLoreHunter';

  @ViewChild('postContainer', { read: ElementRef })
  postContainer!: ElementRef;

  public Editor = ClassicEditor;

  @ViewChild('ckeditorInstance') ckeditorInstance: any; // Add this line to access the CKEditor instance
  @ViewChild('filterDialog') filterDialog!: TemplateRef<any>;
  // @Input() currentPage: number = 1;
  @Input() pageCount: number = 0;

  postContent: SafeHtml | undefined;

  isLoading: boolean = false;

  currentPage: number = 1;
  pageSize: number = 10;
  pages: number[] = [];
  totalPosts: number = 0;
  totalPages: number = 0;

  displayedColumns: string[] = ['user', 'subject', 'content'];

  viewCount: number = 0;

  filteredPosts: Post[] = [];

  public filterSubject: string = '';

  post: Post = new Post();
  posts: Post[] = [];
  posts$: Observable<Post[]>;
  pinnedPosts$: Observable<Post[]>;
  categories: Category[] = [];

  users: User[] = [];
  selected: null | Post = null;
  categoryId: number = 0;
  postId: number = 0;
  value: any;

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
    private elementRef: ElementRef,
    private sanitizer: DomSanitizer,
    ) {
      // necessary
      this.posts$ = postService.getPosts(this.categoryId);
      this.pinnedPosts$ = this.posts$.pipe(
        map(posts => posts.filter(post => post.isPinned))
      );
  }

  ngOnInit() {
    this.authService.getCurrentLoggedInUser().subscribe((user: User) => {
      this.loggedInUser = user;
      console.log(this.loggedInUser);

      // Do something with the logged-in user object, e.g. update UI
    });

    if (this.totalPostsByCategorySubscription) {
      this.totalPostsByCategorySubscription.unsubscribe();
    }

    this.reload();

    this.post = new Post();
    this.postContent = this.sanitizer.bypassSecurityTrustHtml(this.post.content);

  }

  reload() {
    console.log(this.activatedRoute);

    this.paramsSub = this.activatedRoute.paramMap.subscribe((param) => {
      let idString = param.get('categoryId');
      if (idString) {
        this.categoryId = +idString;
        if (!isNaN(this.categoryId)) {
          this.categoryService.find(this.categoryId).subscribe({
            next: (category) => {
              console.log(category);
              console.log(this.categoryId);


            },
            error: (fail) => {
              console.log(fail);
              this.router.navigateByUrl('categoryNotFound');
            },
          });
        } else {
          this.router.navigateByUrl('invalidCategoryId');
        }

        this.posts$ = this.postService.postsByCategory(this.categoryId).pipe(
          map(posts => posts.sort((a, b) => {
            let lastEditedComparison = new Date(b.lastComment).getTime() - new Date(a.lastComment).getTime();
            if (lastEditedComparison === 0) {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            } else {
                return lastEditedComparison;
            }
          }))
        );

        this.pinnedPosts$ = this.posts$.pipe(
          map(posts => posts.filter(post => post.isPinned))
        );

        this.loadPostsForPage(this.currentPage);

        this.totalPostsByCategorySubscription = this.postService.getTotalPostsByCategory(this.categoryId).subscribe(totalPosts => {
          this.totalPosts = totalPosts;
        });
      }
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

  ngOnDestroy() {
    if (this.paramsSub) {
      this.paramsSub.unsubscribe();
    }

    if (this.totalPostsByCategorySubscription) {
      this.totalPostsByCategorySubscription.unsubscribe();
    }
  }

  ngAfterViewInit() {
    const toolbarElement = document.querySelector('.ck-toolbar');

    if (toolbarElement) {
      (toolbarElement as HTMLElement).style.backgroundColor = 'red !important'; // Replace with your desired background color
    }

    const options = {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0.5, // Adjust as needed
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Trigger the method to load posts for the current page asynchronously
          this.loadPostsForPage(this.currentPage);
          observer.unobserve(entry.target);
        }
      });
    }, options);

    const paginationElement = document.querySelector('.page-navigation');
    if (paginationElement) {
      observer.observe(paginationElement);
    }

  }

  loggedIn(): boolean {
    return this.authService.checkLogin();
  }

  resetForm() {
    this.newPost = new Post();
    this.postCreated = false;
  }

  displayPost(post: Post | null) {
    this.selected = post;
    if (this.selected) {
      this.postId = this.selected.id;
      console.log('user name');

    }

    if (this.selected && this.selected.id) {
      // invoke getComments method with this.selected.id as argument
    }
  }

  displayTable() {
    console.log(this.posts);
    location.reload();

  }

  createPost: boolean = false;
  setAddPost(): void {
    this.editPost = Object.assign({}, this.selected);
    this.reload();
  }

  addPost(post: Post) {
    console.log(post);

    this.postService.createPost(this.categoryId, post).subscribe({
      next: (data) => {
        this.postCreated = true;
        this.post = data;
        // this.posts$ = this.postService.postsByCategory(this.categoryId);
        this.loadPostsForPage(this.currentPage);
        // this.goToPage(1);
        console.log(this.categoryId);
        console.log(this.post.id);
        this.router.navigateByUrl(`/categories/${this.categoryId}/posts/${this.post.id}/comments`);
      },
      error: (nojoy) => {
        console.error(
          'PostsComponent.addPost: error creating post'
        );
          console.error(nojoy);
      }
    });
  }

  editPost: Post | null = null;
  setEditPost(): void {
    this.editPost = Object.assign({}, this.selected);
  }

  getErrorMessageSubject() {
    if(this.subject.hasError('required')) {
      return 'Must enter valid subject to submit';
    }
    return this.subject.hasError('subject') ? 'Not valid subject' : '';
  }
  getErrorMessageContent() {
    if(this.content.hasError('required')) {
      return 'Must enter valid content to submit';
    }
    return this.content.hasError('content') ? 'Not valid content' : '';
  }

  submitButtonClicked() {
    if (!this.subject.valid) {
      this.checkCkEditor = true;
      this.subject.markAllAsTouched();
      console.log('Submit button clicked');
      return
    } else if(!this.content.valid) {
      this.checkCkEditor = true;
      this.content.markAllAsTouched();
      console.log('Submit button clicked');
      return
    } else {
      this.addPost(this.newPost);
      this.subject.reset();
      this.ckeditorInstance.editorInstance.setData('');
    }
  }

  incrementViewCount(postId: number): void {
    // Call the API to increment the view count
    this.postService.incrementViewCount(postId).subscribe({
      next: (data) => {
        this.postCreated = true;
        this.post = data;
      },
      error: (nojoy) => {
        console.error(
          'PostsComponent.addPost: error creating post'
        );
          console.error(nojoy);
      }
    });
  }

  getTotalPages(): number {
    return Math.ceil(this.totalPosts / this.pageSize);
  }


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

  openFilterDialog() {
    this.dialog.open(this.filterDialog, {
      width: '400px'
    });
  }

  public filterPosts(): void {
    this.posts$ = this.postService.postsByCategory(this.categoryId).pipe(
      map(posts => {
        return posts.filter(post => {
          let subjectMatch = true;

          if (this.filterSubject && this.filterSubject !== '') {
            subjectMatch = post.subject.toLowerCase().includes(this.filterSubject.toLowerCase());

            return subjectMatch;
          } else {
            return this.posts$ = this.postService.postsByCategory(this.categoryId).pipe(
              map(posts => posts.sort((a, b) => {
                let lastEditedComparison = new Date(b.lastComment).getTime() - new Date(a.lastComment).getTime();
                if (lastEditedComparison === 0) {
                    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
                } else {
                    return lastEditedComparison;
                }
              }))
            );
          }
        });
      })
    );
  }

  showTooltip(content: string): void {
    this.postContent = this.sanitizer.bypassSecurityTrustHtml(content);
  }

  getSanitizedTooltipContent(): string {
    return this.postContent ? this.postContent.toString() : '';
  }

  generatePageArray() {
    const maxVisiblePages = 5; // Maximum number of visible pages in the navigation

    if (this.totalPages <= maxVisiblePages) {
      // If total pages is less than or equal to maxVisiblePages, display all pages
      this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    } else {
      const firstPage = 1;
      const lastPage = this.totalPages;
      const currentPage = this.currentPage;

      // Add first page
      const pageNumbers: number[] = [firstPage];

      // Add ellipsis if current page is not within the first 3 pages
      if (currentPage > 3) {
        pageNumbers.push(-1);
      }

      // Add visible page numbers
      const startPage = Math.max(2, currentPage - 2);
      const endPage = Math.min(lastPage - 1, currentPage + 2);
      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
      }

      // Add ellipsis if current page is not within the last 3 pages
      if (currentPage < lastPage - 2) {
        pageNumbers.push(-1);
      }

      // Add last page
      pageNumbers.push(lastPage);

      this.pages = pageNumbers;
    }
    this.isLoading = false;
  }

  // Modify the goToPage method
  async goToPage(page: number): Promise<void> {
    if (page >= 1 && page <= this.totalPages) {
      this.isLoading = true;
      this.currentPage = page;
      this.generatePageArray();
      // Call a method to retrieve the posts for the current page
      await this.loadPostsForPage(page);
      this.isLoading = false;
    }
  }

  loadPostsForPage(page: number): void {
    this.isLoading = true;
    const startIndex = (page - 1) * this.pageSize;
    let endIndex = startIndex + this.pageSize;

    this.posts$ = this.postService.postsByCategory(this.categoryId).pipe(
      map(posts => {
        const sortedPosts = posts
          .filter(post => !post.isPinned) // Exclude pinned posts
          .sort((a, b) => {
            let lastEditedComparison = new Date(b.lastComment).getTime() - new Date(a.lastComment).getTime();
            if (lastEditedComparison === 0) {
              return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            } else {
              return lastEditedComparison;
            }
          });

        const totalPosts = sortedPosts.length;
        const totalPages = this.getTotalPages();
        const remainingPosts = totalPosts - startIndex;

        if (remainingPosts < this.pageSize) {
          endIndex = startIndex + remainingPosts;
        }

        const slicedPosts = sortedPosts.slice(startIndex, endIndex);

        this.totalPosts = totalPosts;
        this.totalPages = totalPages;
        this.generatePageArray();

        return slicedPosts;
      })
    );

    this.posts$.subscribe(slicedPosts => {
      this.posts = slicedPosts;
      this.isLoading = false;
    });
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.goToPage(this.currentPage - 1);
    }
  }

  goToNextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.goToPage(this.currentPage + 1);
    }
  }

  onJumpToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.goToPage(page);
    }
  }

  onJumpToPageDialog() {
    console.log('onJumpToPageDialog called');

    const dialogRef = this.dialog.open(JumpToPageDialogComponent, {
      width: '250px',
      data: { currentPage: this.currentPage, totalPages: this.totalPages } // Pass current page and total pages as data to the dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result && result.page) {
        const page = result.page;
        this.onJumpToPage(page); // Call the onJumpToPage method with the selected page number
      }
    });
  }

}
