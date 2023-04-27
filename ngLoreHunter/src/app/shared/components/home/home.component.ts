import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
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
import { map, Observable, Observer, Subject, Subscription, switchMap, tap } from 'rxjs';
import { ImageService } from 'src/app/services/image.service';
import { SessionService } from 'src/app/services/session.service';
import { UserNotification } from 'src/app/models/user-notification';
import { UserNotificationService } from 'src/app/services/user-notification.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

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
  userNotifications: UserNotification[] = [];
  // userNotifications$!: Observable<UserNotification[]>;
  private userNotificationsSubject = new Subject<UserNotification[]>();
  userNotifications$ = this.userNotificationsSubject.asObservable();
  loggedInUserId: number = 0;
  loggedInUser: User = new User();

  isRotated1: boolean = false;
  isRotated2: boolean = false;

  dataSource = new PostDataSource(this.postService);

  private categoriesSubscription: Subscription | undefined;
  private postsSubscription: Subscription | undefined;
  private commentsSubscription: Subscription | undefined;
  private usersSubscription: Subscription | undefined;
  private activeSessionCountSubscription: Subscription | undefined;
  private loggedInUserCountSubscription: Subscription | undefined;
  private loggedInUsersSubscription: Subscription | undefined;
  private getLoggedInUserSubscription: Subscription | undefined;
  private userNotificationsSubscription: Subscription | undefined;
  private loggedInUserSubscription: Subscription | undefined;


  constructor(
              private auth: AuthService,
              private homeServ: HomeService,
              private postService: PostService,
              private commentService: CommentService,
              private userService: UserService,
              private postDataSource: PostDataSource,
              private http: HttpClient,
              public imageService: ImageService,
              private sessionService: SessionService,
              private userNotificationService: UserNotificationService
              ) {}

  ngOnInit() {

    this.posts$ = this.postService.indexAll();

    this.reload();

    if (this.activeSessionCountSubscription) {
      this.activeSessionCountSubscription.unsubscribe();
    }

    this.activeSessionCountSubscription = this.sessionService.getActiveSessionCount().subscribe(
      count => {
        this.activeSessionCount = count;
      },
      error => {
        console.error('Failed to fetch active session count: ', error);
      }
    );

    if (this.loggedInUsersSubscription) {
      this.loggedInUsersSubscription.unsubscribe();
    }

    this.loggedInUsersSubscription = this.auth.getLoggedInUsers().subscribe((count) => {
      this.loggedInUserCount = count;
    });

  }

  reload(): void {

    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }

    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }

    if (this.commentsSubscription) {
      this.commentsSubscription.unsubscribe();
    }

    this.categoriesSubscription = this.homeServ.index().subscribe({
      next: (categories) => {
        this.categories = categories;
      },
      error:(fail) => {
        console.error('Error getting categories:');
        console.error(fail);
      }
    });

    this.postsSubscription = this.postService.indexAll().subscribe({
      next: (posts) => {
        this.posts = posts;
      },
      error:(fail) => {
        console.error('Error getting posts:');
        console.error(fail);
      }
    });

    this.commentsSubscription = this.commentService.indexAll().subscribe({
      next: (comments) => {
        this.comments = comments;
      },
      error:(fail) => {
        console.error('Error getting comments:');
        console.error(fail);
      }
    });

    this.usersSubscription = this.userService.index().subscribe({
      next: (users) => {
        this.users = users;
      },
      error:(fail) => {
        console.error('Error getting comments:');
        console.error(fail);
      }
    });

    // this.userNotifications$ = this.auth.getLoggedInUser().pipe(
    //   switchMap((user: User) => {
    //     this.loggedInUser = user;
    //     console.log(user);
    //     console.log(this.loggedInUser);

    //     return new Observable((observer: Observer<UserNotification[]>) => {
    //       this.userNotificationService.getUnreadUserNotificationsByUserId(user.id)
    //         .subscribe({
    //           next: (userNotifications: UserNotification[]) => {
    //             observer.next(userNotifications);
    //           },
    //           error: (error: any) => {
    //             observer.error(error);
    //           },
    //           complete: () => {
    //             observer.complete();
    //           }
    //         });
    //     });
    //   })
    // );
    this.auth.getLoggedInUser().pipe(
      switchMap((user: User) => {
        this.loggedInUser = user;
        // ...
        return this.userNotificationService.getUnreadUserNotificationsByUserId(user.id);
      })
    ).subscribe({
      next: (userNotifications: UserNotification[]) => {
        this.userNotifications = userNotifications;
        this.userNotificationsSubject.next(userNotifications);
      },
      error: (error: any) => {
        console.error('Error retrieving user notifications: ' + error);
      }
    });

  }

  ngOnDestroy() {

    if (this.activeSessionCountSubscription) {
      this.activeSessionCountSubscription.unsubscribe();
    }

    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }

    if (this.postsSubscription) {
      this.postsSubscription.unsubscribe();
    }

    if (this.commentsSubscription) {
      this.commentsSubscription.unsubscribe();
    }

    if (this.usersSubscription) {
      this.usersSubscription.unsubscribe();
    }

    if (this.loggedInUsersSubscription) {
      this.loggedInUsersSubscription.unsubscribe();
    }

    if (this.getLoggedInUserSubscription) {
      this.getLoggedInUserSubscription.unsubscribe();
    }

    if (this.loggedInUserSubscription) {
      this.loggedInUserSubscription.unsubscribe();
    }

    if (this.userNotificationsSubscription) {
      this.userNotificationsSubscription.unsubscribe();
    }

  }

  checkLogin(): void {
    if (this.getLoggedInUserSubscription) {
      this.getLoggedInUserSubscription.unsubscribe();
    }

    this.getLoggedInUserSubscription = this.auth.getLoggedInUser().subscribe({
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
    // do something here with the listener
  }

  getLoggedInUsers() {
    if (this.loggedInUsersSubscription) {
      this.loggedInUsersSubscription.unsubscribe();
    }

    this.loggedInUsersSubscription = this.auth.getLoggedInUsers().subscribe({
      next: (loggedInUsers) => {
        this.loggedInUsers = loggedInUsers;
      },
      error: (fail) => {
        console.error('Error getting online users:');
        console.error(fail);
      }
    });
  }

  loggedIn(): boolean {
    return this.auth.checkLogin();
  }

  dismissUserNotification(userId: number, notificationId: number) {
    this.userNotificationService.dismissUserNotification(userId, notificationId)
      .subscribe({
        next: () => {
          // User notification dismissed successfully
          console.log('User notification dismissed successfully');

          // Update the userNotifications array directly to exclude the dismissed notification
          this.userNotifications = this.userNotifications.filter(userNotification => userNotification.notification.id !== notificationId);

          // Emit the updated userNotifications array as a new value in the stream
          this.userNotificationsSubject.next(this.userNotifications);
        },
        error: (error: any) => {
          console.error('Error dismissing user notification:');
          console.error(error);
          // Handle error accordingly
        }
      });
  }

  trackNotificationById(index: number, notification: UserNotification): number {
    return notification.notification.id;
  }

}
