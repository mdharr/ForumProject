import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserFollower } from 'src/app/models/user-follower';
import { AuthService } from 'src/app/services/auth.service';
import { UserFollowerService } from 'src/app/services/user-follower.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-followers',
  templateUrl: './user-followers.component.html',
  styleUrls: ['./user-followers.component.css']
})
export class UserFollowersComponent implements OnInit, OnDestroy {

  followerUsers: UserFollower[] = [];
  userId: number = 0;
  profileUser: User = new User();
  loggedInUser: User = new User();
  isLoggedInUser: boolean = true;
  isLoading: boolean = false;

  private loggedInUserSubscription: Subscription | undefined;
  private profileUserSubscription: Subscription | undefined;
  private userFollowerSubscription: Subscription | undefined;

  constructor(private userFollowerService: UserFollowerService, private route: ActivatedRoute, private authService: AuthService, private userService: UserService) {}

  ngOnInit() {
    this.isLoading = true;

    if (this.profileUserSubscription) {
      this.profileUserSubscription.unsubscribe();
    }

    if (this.loggedInUserSubscription) {
      this.loggedInUserSubscription.unsubscribe();
    }

    if (this.userFollowerSubscription) {
      this.userFollowerSubscription.unsubscribe();
    }

    let id = this.route.snapshot.paramMap.get('userId');

    if (id) {
      this.userId = +id;

      this.loggedInUserSubscription = this.authService.getLoggedInUser().subscribe({
        next: (user) => {
          this.loggedInUser = user;
          this.isLoggedInUser = this.userId === this.loggedInUser.id; // Update isLoggedInUser

          // Fetch user followers after determining isLoggedInUser value
          this.fetchUserFollowers();
        },
        error: (error) => {
          console.log('Error getting loggedInUser');
          console.log(error);

          // Fetch user followers even if there's an error retrieving loggedInUser
          this.fetchUserFollowers();
        },
      });

      this.profileUserSubscription = this.userService.show(this.userId).subscribe((user) => {
        this.profileUser = user;
      });
    }
  }

  private fetchUserFollowers() {
    this.userFollowerSubscription = this.userFollowerService.getFollowersByUserId(this.userId).subscribe((users) => {
      this.followerUsers = users;
      this.isLoading = false;
    });
  }

  ngOnDestroy() {

    if(this.profileUserSubscription) {
      this.profileUserSubscription.unsubscribe();
    }

    if(this.loggedInUserSubscription) {
      this.loggedInUserSubscription.unsubscribe();
    }

    if(this.userFollowerSubscription) {
      this.userFollowerSubscription.unsubscribe();
    }

  }

}
