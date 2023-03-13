import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post';
import { User } from 'src/app/models/user';
import { Comment } from 'src/app/models/comment';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { CommentService } from 'src/app/services/comment.service';
import { PostService } from 'src/app/services/post.service';
import { Category } from 'src/app/models/category';
import { Subscription } from 'rxjs';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {
  title = 'ngLoreHunter';

  paramsSub: Subscription | undefined;

  posts: Post[] = [];
  categories: Category[] = [];
  post: null | Post = null;
  users: User[] = [];
  selected: null | Post = null;
  categoryId: number = 0;
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
    private homeService: HomeService
  ) {
  }

  ngOnInit() {
    console.log(this.activatedRoute);

    this.paramsSub = this.activatedRoute.paramMap.subscribe((param) => {
      let idString = param.get('categoryId');
      if (idString) {
        this.categoryId = +idString;
        if (!isNaN(this.categoryId)) {
          this.categoryService.find(this.categoryId).subscribe({
            next: (category) => {
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

  }

  ngOnDestroy() {
    console.log('Destroyed and unsubscribed');
    this.paramsSub?.unsubscribe();

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

  resetForm() {
    this.newPost = new Post();
    this.postCreated = false;
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

  createPost: boolean = false;
  setAddPost(): void {
    this.editPost = Object.assign({}, this.selected);
  }

  addPost(post: Post) {
    console.log(post);

    this.postService.createPost(post).subscribe({
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

  editPost: Post | null = null;
  setEditPost(): void {
    this.editPost = Object.assign({}, this.selected);
  }

  updatePost(post: Post, goToDetail = true): void {
    this.postService.update(post).subscribe({
      next: (updatedPost) => {
        if (goToDetail) {
          this.displayPost(updatedPost);
        } else {
          this.displayPost(null);
        }
        this.editPost = null;
        this.reload();
      },
      error: (toobad) => {
        console.error(
          'PostsComponent.updatePost: error updating post'
        );
          console.error(toobad);
      },
    });
  }
}
