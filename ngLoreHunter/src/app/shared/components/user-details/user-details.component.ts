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
  userId: number = 0;

  private userSubscription: Subscription | undefined;


  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private userService: UserService) { }

  ngOnInit() {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    console.log(this.id);

    this.userSubscription = this.userService.show(this.id).subscribe(user => {
      this.user = user;
      console.log(this.user);

      this.userForm.patchValue({
        username: this.user.username,
        enabled: this.user.enabled,
        role: this.user.role,
        firstName: this.user.firstName,
        lastName: this.user.lastName,
        email: this.user.email,
        imageUrl: this.user.imageUrl,
        status: this.user.status,
        bannerMessage: this.user.bannerMessage,
        bannerImage: this.user.bannerImage,
      });
    });

    this.userForm = this.formBuilder.group({
      username: [''],
      enabled: [false],
      role: [''],
      firstName: [''],
      lastName: [''],
      email: [''],
      imageUrl: [''],
      status: [''],
      bannerMessage: [''],
      bannerImage: [''],
    });
  }

  ngOnDestroy(): void {
    if(this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  updateUser() {
    console.log('User:', this.userForm.value);
    this.userService.adminUpdate(this.userForm.value, this.id).subscribe({
      next: (user: User) => {
        this.user = user;
      },
      error: (err: any) => {
        console.error('Error updating user:', err);
      }
    });
  }




}
