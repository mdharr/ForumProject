import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Post } from 'src/app/models/post';
import { Comment } from 'src/app/models/comment';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CategoryService } from 'src/app/services/category.service';
import { CommentService } from 'src/app/services/comment.service';
import { HomeService } from 'src/app/services/home.service';
import { PostService } from 'src/app/services/post.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { catchError, combineLatest, EMPTY, map, Observable, of, Subscription, switchMap, tap, throwError } from 'rxjs';
import { Category } from 'src/app/models/category';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { PostDataSource } from 'src/app/services/post.dataSource';
import { CommentDataSource } from 'src/app/services/comment.dataSource';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { UserBannerImageDialogComponent } from '../user-banner-image-dialog/user-banner-image-dialog.component';
import { UserFollowerService } from 'src/app/services/user-follower.service';
import { UserFollower } from 'src/app/models/user-follower';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {

  title = 'ngLoreHunter';

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  displayedColumns: string[] = ['user', 'content'];

  dataSource = new CommentDataSource(this.commentService);

  public isComponentLoaded = false;

  posts: Post[] = [];
  categories: Category[] = [];
  post: null | Post = null;
  users: User[] = [];
  selected: Post = new Post();
  categoryId: number = 0;
  postId: number = 0;
  userId: number = 0;
  value: any;
  postsCount: number = 0;
  commentsCount: number = 0;

  followersCount: number = 0;
  followingCount: number = 0;
  followingCount$!: Observable<number>;
  followersCount$!: Observable<number>;
  followingUsers: UserFollower[] = [];
  isFollowing: boolean = false;
  followButtonLabel: string = '';

  newPost: Post = new Post();

  postsByCategory: Post[] = [];
  userPosts: Post[] = [];

  comments: Comment[] = [];
  comment: Comment = new Comment();
  newComment: Comment = new Comment();
  loggedInUser: User = new User();
  profileUser: User = new User();
  profileUserId: number = 0;

  followers: UserFollower[] = [];
  following: UserFollower[] = [];

  postCreated = false;
  showForm: boolean = false;
  addPostMod: Post | null = null;

  selectedSearch: string = 'all';

  content = new FormControl('', [Validators.required]);
  checkCkEditor: boolean = false;

  private paramsSubscription: Subscription | undefined;
  private testParamsSubscription: Subscription | undefined;
  private loggedInUserSubscription: Subscription | undefined;
  private homeServIndexSubscription: Subscription | undefined;
  private postsByCategorySubscription: Subscription | undefined;
  private profileUserSubscription: Subscription | undefined;
  private profileUserCommentsSubscription: Subscription | undefined;
  private profileUserFollowingSubscription: Subscription | undefined;
  private profileUserFollowedBySubscription: Subscription | undefined;
  private userFollowerSubscription: Subscription | undefined;

  constructor(
    private postService: PostService,
    private commentService: CommentService,
    private authService: AuthService,
    private router: Router,
    private categoryService: CategoryService,
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private homeService: HomeService,
    private http: HttpClient,
    public dialog: MatDialog,
    public userFollowerService: UserFollowerService,
    ) {}

    ngOnInit() {
      this.paramsSubscription = this.activatedRoute.paramMap.pipe(
        switchMap((param) => {
          let idString = param.get('userId');
          if (idString) {
            this.userId = +idString;
            if (!isNaN(this.userId)) {
              return combineLatest([
                this.userService.show(this.userId),
                this.userFollowerService.getFollowersByUserId(this.userId),
                this.userFollowerService.getFollowingByUserId(this.userId),
                this.postService.show(this.categoryId, this.postId),
              ]).pipe(
                tap(([user, followers, following, post]) => {
                  this.profileUser = user;
                  this.postsCount = this.posts.length;
                  this.commentsCount = this.comments.length;
                }),
                switchMap(([user, followers, following, post]) => {
                  this.followingCount$ = this.userFollowerService.getFollowingByUserId(user.id).pipe(
                    map((following) => following.length)
                  );
                  this.followersCount$ = this.userFollowerService.getFollowersByUserId(user.id).pipe(
                    map((followers) => followers.length)
                  );

                  this.postsByCategorySubscription = this.postService.getUserPosts(this.userId).subscribe((posts) => {
                    this.posts = posts;
                    this.postsCount = this.posts.length;
                    this.commentsCount = this.comments.length;
                  });

                  this.profileUserCommentsSubscription = this.commentService.getUserComments(this.userId).subscribe((comments) => {
                    this.comments = comments;
                    this.commentsCount = this.comments.length;
                    this.postsCount = this.posts.length;
                  });

                  return of({ user, post });
                }),
                catchError((fail) => {
                  console.log(fail);
                  // this.router.navigateByUrl('postNotFound');
                  // Return an empty observable or throw an error if needed
                  return EMPTY;
                })
              );
            } else {
              // this.router.navigateByUrl('invalidPostId');
              // Return an empty observable or throw an error if needed
              return EMPTY;
            }
          } else {
            // Return an empty observable or throw an error if needed
            return EMPTY;
          }
        })
      ).subscribe();

      this.reload();

      this.loggedInUserSubscription = this.authService.getLoggedInUser().subscribe({
        next: (user) => {
          this.loggedInUser = user;
          this.userFollowerService.getFollowingByUserId(user.id).subscribe({
            next: (followingUsers) => {
              this.followingUsers = followingUsers;
              this.checkFollowingStatus(); // Initialize the isFollowing variable
            },
            error: (error) => {
              console.log('Error getting following users');
              console.log(error);
            },
          });
        },
        error: (error) => {
          console.log('Error getting loggedInUser');
          console.log(error);
        },
      });

      // if (this.profileUserSubscription) {
      //   this.profileUserSubscription.unsubscribe();
      // }

      setTimeout(() => {
        this.isComponentLoaded = true;
      }, 500);
    }

    ngOnDestroy() {
      if (this.paramsSubscription) {
        this.paramsSubscription.unsubscribe();
      }

      if (this.loggedInUserSubscription) {
        this.loggedInUserSubscription.unsubscribe();
      }

      if (this.postsByCategorySubscription) {
        this.postsByCategorySubscription.unsubscribe();
      }

      if (this.homeServIndexSubscription) {
        this.homeServIndexSubscription.unsubscribe();
      }

      if (this.profileUserSubscription) {
        this.profileUserSubscription.unsubscribe();
      }

      if (this.profileUserCommentsSubscription) {
        this.profileUserCommentsSubscription.unsubscribe();
      }

      if (this.profileUserFollowingSubscription) {
        this.profileUserFollowingSubscription.unsubscribe();
      }

      if (this.profileUserFollowedBySubscription) {
        this.profileUserFollowedBySubscription.unsubscribe();
      }

      if (this.testParamsSubscription) {
        this.testParamsSubscription.unsubscribe();
      }

      if (this.userFollowerSubscription) {
        this.userFollowerSubscription.unsubscribe();
      }
    }

    loggedIn(): boolean {
      return this.authService.checkLogin();
    }

    reload() {
      this.postsByCategorySubscription = this.postService.getUserPosts(this.userId).subscribe({
        next: (posts) => {
          this.posts = posts;
          this.postsCount = this.posts.length;
          console.log(this.postsCount);

        },
        error: (err) => {
          console.error('Error loading posts');
          console.error(err);
        },
      });

      this.profileUserCommentsSubscription = this.commentService.getUserComments(this.userId).subscribe({
        next: (comments) => {
          this.comments = comments;
          this.commentsCount = this.comments.length;
          console.log(this.commentsCount);

        },
        error: (err) => {
          console.error('Error loading comments');
          console.error(err);
        }
      });

      this.homeServIndexSubscription = this.homeService.index().subscribe({
        next: (categories) => {
          this.categories = categories;
        },
        error:(fail) => {
          console.error('Error getting categories:');
          console.error(fail);
        }
      });

      this.profileUserFollowingSubscription = this.userFollowerService.getFollowersByUserId(this.userId).subscribe({
        next: (followers) => {
          this.followers = followers;
          this.followersCount$ = of(followers.length); // Convert the count to an observable
        },
        error: (fail) => {
          console.error('Error getting followers:');
          console.error(fail);
        }
      });

      this.profileUserFollowedBySubscription = this.userFollowerService.getFollowingByUserId(this.userId).subscribe({
        next: (following) => {
          this.following = following;
          this.followingCount$ = of(following.length); // Convert the count to an observable
        },
        error: (fail) => {
          console.error('Error getting following:');
          console.error(fail);
        }
      });

    }


    sortComments(sort: Sort): void {
      this.dataSource.loadComments(this.categoryId, this.postId);
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

    editInformation(user: User): void {
      this.userService.update(user).subscribe({
        next: (user) => {
          user = this.loggedInUser;
          // dismiss dialog here
          this.reload();
        },
        error: (error) => {
          console.log('Error getting loggedInUser Profile Component');
          console.log(error);
        },
      });
    }

    openDialog(): void {
      const dialogRef = this.dialog.open(UserBannerImageDialogComponent, {
        width: '600px',
        data: { user: this.profileUser }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');
        console.log(result);
      });
    }

    checkFollowingStatus(): void {
      console.log('checking following status');

      if (this.userFollowerSubscription) {
        this.userFollowerSubscription.unsubscribe();
      }

      this.userFollowerSubscription = this.userFollowerService.getFollowingByUserId(this.loggedInUser.id)
        .subscribe((followingUsers: UserFollower[]) => {
          this.followingUsers = followingUsers;
          this.isFollowing = this.followingUsers.some(user => user.followed.id === this.profileUser.id);
          console.log('following users: ', this.followingUsers);
          console.log('following status is: ', this.isFollowing);

          this.updateFollowButtonLabel();
        });
    }

    toggleFollow(): void {
      if (this.isFollowing) {
        this.unfollowUser();
      } else {
        this.followUser();
      }
    }

    followUser(): void {
      this.userFollowerService.followUser(this.loggedInUser.id, this.profileUser.id)
        .subscribe(
          () => {
            this.isFollowing = true;
            this.updateFollowButtonLabel();
            this.updateFollowersCount();
          },
          (error) => {
            console.log('follow error:', error);
          }
        );
    }


    unfollowUser(): void {
      this.userFollowerService.unfollowUser(this.loggedInUser.id, this.profileUser.id)
        .subscribe(
          () => {
            this.isFollowing = false;
            this.updateFollowButtonLabel();
            this.updateFollowersCount();
          }
        );
    }


    updateFollowButtonLabel(): void {
      this.followButtonLabel = this.isFollowing ? 'Unfollow' : 'Follow';
    }

    updateFollowersCount(): void {
      this.followersCount$ = this.userFollowerService.getFollowersByUserId(this.profileUser.id).pipe(
        map((followers) => followers.length)
      );
    }

}
