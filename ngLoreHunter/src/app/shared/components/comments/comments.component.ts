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
import { PostDataSource } from 'src/app/services/post.dataSource';
import { CommentDataSource } from 'src/app/services/comment.dataSource';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {
  title = 'ngLoreHunter';

  public Editor = ClassicEditor;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  displayedColumns: string[] = ['user', 'content'];

  dataSource = new CommentDataSource(this.commentService);

  // mat table properties start

  // mat table properties start

  // mat table end

  paramsSub: Subscription | undefined;

  posts: Post[] = [];
  categories: Category[] = [];
  post: null | Post = null;
  users: User[] = [];
  selected: null | Post = null;
  categoryId: number = 0;
  postId: number = 0;
  value: any;

  newPost: Post = new Post();

  postsByCategory: Post[] = [];

  comments: Comment[] = [];
  newComment: Comment = new Comment();
  loggedInUser: User = new User();

  postCreated = false;
  showForm: boolean = false;
  addPostMod: Post | null = null;

  selectedSearch: string = 'all';

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private authService: AuthService,
    private router: Router,
    private categoryService: CategoryService,
    private activatedRoute: ActivatedRoute,
    private homeService: HomeService,
    private http: HttpClient
    ) {}

  ngOnInit() {

    console.log(this.activatedRoute);

    this.paramsSub = this.activatedRoute.paramMap.subscribe((param) => {
      console.log(param);
      console.log(this.postId);

      let idString = param.get('categoryId');
      let idString2 = param.get('postId');
      if (idString && idString2) {
        this.categoryId = +idString;
        this.postId = +idString2;
        if (!isNaN(this.categoryId && this.postId)) {
          this.categoryService.find(this.categoryId).subscribe({
            next: (category) => {
              console.log(category);
              console.log(this.categoryId);
              console.log(this.postId);
              console.log(this.comments);
            },
            error: (fail) => {
              console.log(fail);
              // this.router.navigateByUrl('categoryNotFound');
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

    this.dataSource.loadComments(this.categoryId, this.postId, { active: 'id', direction: 'asc' });
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

  getComments(id: number) {
    this.postService.postsByCategory(id).subscribe({
      next: (posts) => {
        this.posts = posts;
        console.log(this.posts);
      },
      error: (err) => {
        console.error('Error loading post comments');
        console.error(err);
      },
    });
  }

  createComment(comment: Comment, selected: Post) {
    let id = this.selected?.id;
    if (id) {
      comment.post.id = id;
    }
    console.log(comment);
    this.commentService.createComment(comment).subscribe({
      next: (data) => {
        this.newComment.post.id = selected.id;
        this.newComment.user.id = this.loggedInUser.id;
        this.newComment = new Comment();
        this.displayPost(selected);
      },
      error: (nojoy) => {
        console.error('PostComponent.createComment: Error creating comment.');
        console.error(nojoy);
      },
    });
  }

  displayTable() {
    console.log(this.posts);
    location.reload();

  }

  displayPost(post: Post | null) {
    this.selected = post;
    if (this.selected) {
      console.log('user name');

    }

    if (this.selected && this.selected.id) {
      // invoke getComments method with this.selected.id as argument
    }
  }

  sortComments(sort: Sort): void {
    this.dataSource.loadComments(this.categoryId, this.postId, sort);
  }

}
