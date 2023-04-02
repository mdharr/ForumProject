import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  //added parentheses after new User
  loginUser: User = new User();

  public onlineUserCount: number = 0;

  public loggedInUserCount: number = 0;

  constructor(
              private authService: AuthService,
              private router: Router,
              private modalService: NgbModal,
              private userService: UserService
              ) {}

  login(loginUser: User) {
    console.log("Logging in");
    this.authService.login(loginUser.username, loginUser.password).subscribe({
      next: (loggedInUser) => {
        console.log('Login success');
        console.log(loggedInUser);
        this.modalService.dismissAll();
        this.authService.checkLogin();
        this.router.navigateByUrl('home');
        location.reload();
      },
      error: (fail) => {
        console.error('Login failed');
        console.error(fail);
      }
    });

    // this.userService
  }

}
