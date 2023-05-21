import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserFollower } from 'src/app/models/user-follower';
import { UserFollowerService } from 'src/app/services/user-follower.service';

@Component({
  selector: 'app-user-followers',
  templateUrl: './user-followers.component.html',
  styleUrls: ['./user-followers.component.css']
})
export class UserFollowersComponent {

  followerUsers: UserFollower[] = [];
  userId: number = 0;

  constructor(private userFollowerService: UserFollowerService, private route: ActivatedRoute) {}

  ngOnInit() {
    // Assuming you have a method in your UserService to fetch the follower users
    let id = this.route.snapshot.paramMap.get('userId');
    if(id) {
      this.userId = +id;
      this.userFollowerService.getFollowersByUserId(this.userId).subscribe((users) => {
        this.followerUsers = users;
      });
    }
  }

}
