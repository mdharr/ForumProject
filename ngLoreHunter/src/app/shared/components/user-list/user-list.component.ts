import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['username', 'email', 'role', 'firstName', 'lastName', 'createdAt', 'lastActivity', 'postCount', 'commentCount'];
  users: User[] = [];

  private userSubscription: Subscription | undefined;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.userSubscription = this.userService.index().subscribe((users) => {
      this.users = users;
    });
  }

  viewUserDetails(userId: number): void {
    this.router.navigate(['/user-details', userId]);
  }

  onRowClicked(user: User) {
    this.router.navigate(['/users', user.id]);
  }

  ngOnDestroy(): void {
    if(this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
