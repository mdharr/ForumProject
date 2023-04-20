import { PostDataSource } from './../../../services/post.dataSource';
import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { Comment } from 'src/app/models/comment';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { Category } from 'src/app/models/category';
import { debounceTime, map, merge, Observable, Subscription, take, tap } from 'rxjs';
import { HomeService } from 'src/app/services/home.service';
import { HttpClient } from '@angular/common/http';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormControl, Validators } from '@angular/forms';

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

  public Editor = ClassicEditor;

  @ViewChild('ckeditorInstance') ckeditorInstance: any; // Add this line to access the CKEditor instance

  @Input() currentPage: number = 1;
  @Input() pageCount: number = 0;

  pageSize: number = 5;

  displayedColumns: string[] = ['user', 'subject', 'content'];

  viewCount: number = 0;

  filteredPosts: Post[] = [];

  public filterSubject: string = '';

  post: Post = new Post();
  posts: Post[] = [];
  posts$!: Observable<Post[]> | undefined;
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

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private authService: AuthService,
    private router: Router,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private homeServ: HomeService,
    private http: HttpClient
    ) {
  }

  ngOnInit() {
    this.authService.getCurrentLoggedInUser().subscribe((user: User) => {
      this.loggedInUser = user;
      // Do something with the logged-in user object, e.g. update UI
    });

    this.reload();

  }

  ngOnDestroy() {
    if (this.paramsSub) {
      this.paramsSub.unsubscribe();
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
            let lastEditedComparison = new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime();
            if (lastEditedComparison === 0) {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            } else {
                return lastEditedComparison;
            }
          }))
        );
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
    this.postService.postsByCategory(this.categoryId).subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error: (err) => {
        console.error('Error loading posts');
        console.error(err);
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
        this.posts$ = this.postService.postsByCategory(this.categoryId).pipe(
          map(posts => posts.sort((a, b) => {
            let lastEditedComparison = new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime();
            if (lastEditedComparison === 0) {
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            } else {
                return lastEditedComparison;
            }
          }))
        );
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

  getTotalPages(): number {
    const totalPosts = this.posts.length; // or use this.posts$.value.length if you're using BehaviorSubject
    return Math.ceil(totalPosts / this.pageSize);
  }

  goToPreviousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  goToNextPage(): void {
    if (this.posts$ !== undefined) {
      this.posts$.pipe(
        take(1)
      ).subscribe(posts => {
        if (Array.isArray(posts) && (this.currentPage * 5) < (posts.length)) {
          this.currentPage++;
        }
      }, error => {
        console.error(error);
      });
    }
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
                let lastEditedComparison = new Date(b.lastEdited).getTime() - new Date(a.lastEdited).getTime();
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

  updatePagination(): void {
    const totalPages = this.getTotalPages();
  }

}
