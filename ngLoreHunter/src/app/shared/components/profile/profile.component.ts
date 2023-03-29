import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Post } from 'src/app/models/post';
import { Comment } from 'src/app/models/comment';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { CommentService } from 'src/app/services/comment.service';
import { HomeService } from 'src/app/services/home.service';
import { PostService } from 'src/app/services/post.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { Category } from 'src/app/models/category';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { PostDataSource } from 'src/app/services/post.dataSource';
import { CommentDataSource } from 'src/app/services/comment.dataSource';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  title = 'ngLoreHunter';

  public Editor = ClassicEditor;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  displayedColumns: string[] = ['user', 'content'];

  dataSource = new CommentDataSource(this.commentService);

  paramsSub: Subscription | undefined;

  posts: Post[] = [];
  categories: Category[] = [];
  post: null | Post = null;
  users: User[] = [];
  selected: Post = new Post();
  categoryId: number = 0;
  postId: number = 0;
  userId: number = 0;
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

  content = new FormControl('', [Validators.required]);
  checkCkEditor: boolean = false;

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private authService: AuthService,
    private router: Router,
    private categoryService: CategoryService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private homeService: HomeService,
    private http: HttpClient
    ) {}

    ngOnInit() {

      console.log(this.activatedRoute);

      this.paramsSub = this.activatedRoute.paramMap.subscribe((param) => {
        console.log(this.userId);

        let idString = param.get('userId');
        if (idString) {
          this.userId = +idString;
          if (!isNaN(this.userId)) {
            this.userService.show(this.userId).subscribe({
              next: (user) => {
                console.log(user);
                console.log(this.loggedInUser);
              },
              error: (fail) => {
                console.log(fail);
              },
            });
            this.postService.show(this.categoryId, this.postId).subscribe({
              next: (post) => {
                console.log(post);
                console.log(this.postId);

              },
              error: (fail) => {
                console.log(fail);
                // this.router.navigateByUrl('postNotFound');
              }
            })
          } else {
            // this.router.navigateByUrl('invalidPostId');
          }
        }
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

      this.dataSource.loadComments(this.categoryId, this.postId);

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


    sortComments(sort: Sort): void {
      this.dataSource.loadComments(this.categoryId, this.postId);
    }

}
