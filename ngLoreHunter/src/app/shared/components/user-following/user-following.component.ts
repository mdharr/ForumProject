import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserFollower } from 'src/app/models/user-follower';
import { UserFollowerService } from 'src/app/services/user-follower.service';

@Component({
  selector: 'app-user-following',
  templateUrl: './user-following.component.html',
  styleUrls: ['./user-following.component.css']
})
export class UserFollowingComponent {

  followingUsers: UserFollower[] = [];
  userId: number = 0;

  constructor(private userFollowerService: UserFollowerService, private route: ActivatedRoute) {}

  ngOnInit() {
    // Assuming you have a method in your UserService to fetch the follower users
    let id = this.route.snapshot.paramMap.get('userId');
    if(id) {
      this.userId = +id;
      this.userFollowerService.getFollowingByUserId(this.userId).subscribe((users) => {
      this.followingUsers = users;
      });
    }
  }
}
