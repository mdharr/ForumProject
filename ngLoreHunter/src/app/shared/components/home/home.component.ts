import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { AuthService } from 'src/app/services/auth.service';
import { HomeService } from 'src/app/services/home.service';
import { PostService } from 'src/app/services/post.service';
import { HostListener } from '@angular/core';
import { PostDataSource } from './../../../services/post.dataSource';
import { Post } from 'src/app/models/post';
import { Comment } from 'src/app/models/comment';
import { CommentService } from 'src/app/services/comment.service';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';
import { SessionService } from 'src/app/services/session.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public posts$: Observable<Post[]> | undefined;

  categories: Category[] = [];
  categoryId: number = 0;
  posts: Post[] = [];
  comments: Comment[] = [];
  users: User[] = [];
  activeUsers: User[] = [];
  data: any;
  sort: any;
  latest: Post = new Post();
  loggedInUsers: number = 0;
  activeSessionCount: number = 0;
  loggedInUserCount: number = 0;

  isRotated1: boolean = false;
  isRotated2: boolean = false;

  dataSource = new PostDataSource(this.postService);

  constructor(
              private auth: AuthService,
              private homeServ: HomeService,
              private postService: PostService,
              private commentService: CommentService,
              private userService: UserService,
              private postDataSource: PostDataSource,
              private http: HttpClient,
              public imageService: ImageService,
              private sessionService: SessionService
              ) {}

  ngOnInit() {
    this.posts$ = this.postService.indexAll();
    console.log(this.loggedInUsers);

    this.reload();
    this.getLoggedInUsers();
    console.log(this.loggedInUsers);

    this.sessionService.getActiveSessionCount().subscribe(
      count => {
        this.activeSessionCount = count;
      },
      error => {
        console.error('Failed to fetch active session count: ', error);
      }
    );

    this.auth.getLoggedInUsers().subscribe((count) => {
      this.loggedInUserCount = count;
    })
  }

  reload(): void {
    this.homeServ.index().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error:(fail) => {
        console.error('Error getting categories:');
        console.error(fail);
      }
    });
    this.postService.indexAll().subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error:(fail) => {
        console.error('Error getting posts:');
        console.error(fail);
      }
    });
    this.commentService.indexAll().subscribe({
      next: (comments) => {
        this.comments = comments;
      },
      error:(fail) => {
        console.error('Error getting comments:');
        console.error(fail);
      }
    });
    this.userService.index().subscribe({
      next: (users) => {
        this.users = users;
      },
      error:(fail) => {
        console.error('Error getting comments:');
        console.error(fail);
      }
    });

  }

  checkLogin(): void {
    this.auth.getLoggedInUser().subscribe({
      next: (user) => {
        console.log(user);
      },
      error:(fail) => {
        console.error('Error getting user:');
        console.error(fail);

      }
    });
  }

  rotateChevronTop() {
    if(this.isRotated1) {
      this.isRotated1 = false;
    } else {
      this.isRotated1 = true;
    }

  }

  rotateChevronBottom() {
    if(this.isRotated2) {
      this.isRotated2 = false;
    } else {
      this.isRotated2 = true;
    }

  }


  hasNetwork(online: boolean) {
    console.log(online);
  }

  @HostListener('window:online', ['$event'])
    onLine(e:any){
    // do something
  }

  getLoggedInUsers() {
    this.auth.getLoggedInUsers().subscribe({
      next: (loggedInUsers) => {
        this.loggedInUsers = loggedInUsers;
      },
      error: (fail) => {
        console.error('Error getting online users:');
        console.error(fail);
      }
    });
  }

}
