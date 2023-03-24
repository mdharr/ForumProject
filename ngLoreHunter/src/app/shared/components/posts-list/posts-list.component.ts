import { PostDataSource } from './../../../services/post.dataSource';
import { Component, OnDestroy, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { Comment } from 'src/app/models/comment';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { Category } from 'src/app/models/category';
import { merge, Subscription, tap } from 'rxjs';
import { HomeService } from 'src/app/services/home.service';
import { HttpClient } from '@angular/common/http';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.css']
})
export class PostsListComponent implements OnInit {

  title = 'ngLoreHunter';

  public Editor = ClassicEditor;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  displayedColumns: string[] = ['user', 'subject', 'content'];

  dataSource = new PostDataSource(this.postService);

  // mat table properties start

  // mat table properties start

  // mat table end

  paramsSub: Subscription | undefined;

  post: Post = new Post();
  posts: Post[] = [];
  categories: Category[] = [];
  // post: null | Post = null;
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

    this.paramsSub = this.activatedRoute.paramMap.subscribe((param) => {
      let idString = param.get('categoryId');
      if (idString) {
        this.categoryId = +idString;
        if (!isNaN(this.categoryId)) {
          this.categoryService.find(this.post.category.id).subscribe({
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

    this.dataSource.loadAllPosts();
  }

  // sortPosts(sort: Sort): void {
  //   this.dataSource.loadPosts(this.categoryId, sort);
  // }

}
