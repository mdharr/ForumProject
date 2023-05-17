import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit, OnDestroy {

  user: User = new User();
  id: number = 0;
  userForm!: FormGroup;

  private userSubscription: Subscription | undefined;


  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.userSubscription = this.userService.show(this.id).subscribe(user => this.user = user);

  }

  ngOnDestroy(): void {
    if(this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  updateUser() {
    console.log('User:', this.user);
    this.userService.update(this.user).subscribe(
      (user: User) => {
        this.user = user;
      },
      (err) => {
        console.error('Error updating user:', err);
      }
    );
  }

}
