import { Component, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
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
import { MatDialog } from '@angular/material/dialog';
import { JumpToPageDialogComponent } from '../jump-to-page-dialog/jump-to-page-dialog.component';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit, OnDestroy {

  title = 'ngLoreHunter';

  @ViewChild('ckeditorInstance') ckeditorInstance: any; // Add this line to access the CKEditor instance
  @ViewChild('filterDialog') filterDialog!: TemplateRef<any>;

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

  comments: Comment[] = [];
  comment: Comment = new Comment();
  newComment: Comment = new Comment();
  postCreated = false;

  selectedSearch: string = 'all';

  private loggedInUserSubscription: Subscription | undefined;
  private indexAllSubscription: Subscription | undefined;
  private homeServIndexSubscription: Subscription | undefined;
  private totalPostsByCategorySubscription: Subscription | undefined;

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

  ngOnInit() {

    this.authService.getCurrentLoggedInUser().subscribe((user: User) => {
      this.loggedInUser = user;
      // Do something with the logged-in user object, e.g. update UI
    });

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

    this.homeServIndexSubscription = this.homeServ.index().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error:(fail) => {
        console.error('Error getting categories:');
        console.error(fail);
      }
    });

    this.loadPostsForPage(this.currentPage);

    this.totalPostsByCategorySubscription = this.postService.getTotalPostsCount().subscribe(totalPosts => {
      this.totalPosts = totalPosts;
    });

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

    this.posts$ = this.postService.getAllPosts().pipe(
      map(posts => {
        const sortedPosts = posts
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
