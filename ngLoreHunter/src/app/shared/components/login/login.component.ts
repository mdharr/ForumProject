import { ChangeDetectorRef, Component, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap, tap } from 'rxjs';

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
              private userService: UserService,
              private snackBar: MatSnackBar,
              private cdr: ChangeDetectorRef
  ) {}

  login(loginUser: User) {
    console.log("Logging in");
    this.authService.login(loginUser.username, loginUser.password).subscribe({
      next: (loginUser) => {
        console.log('Login success');
        this.authService.setUserId(loginUser.id); // Setting userId in AuthService
        console.log('USER ID: ' + this.authService.getUserId());
        this.modalService.dismissAll();
        this.authService.checkLogin();
        this.userService.setUser(loginUser);
        this.authService.setLoggedIn(true);
        this.snackBar.open('Login Successful!', 'Dismiss', {
          duration: 4000,
          panelClass: ['mat-toolbar', 'mat-primary'],
          verticalPosition: 'bottom'
        });
        this.reloadCurrentPage();
      },
      error: (fail) => {
        console.error('Login failed');
        console.error(fail);
      }
    });
  }

  // login(loginUser: User) {
  //   console.log("logging in");
  //   this.authService.login(loginUser.username, loginUser.password).pipe(
  //     switchMap((user) => {
  //       // Handle succesfful login
  //       console.log("login successful: ", user);

  //       // Store user ID in AuthService

  //       this.modalService.dismissAll();
  //       this.authService.checkLogin();
  //       return this.userService.setOnline(user.id);
  //     })
  //   ).subscribe({
  //     next: (response) => {
  //       console.log('Set user online successfully: ', response);
  //       // Redirect to home page or do other actions
  //     },
  //     error: (error) => {
  //       console.error('Login error: ', error);
  //     }
  //   });
  // }

  reloadCurrentPage(){
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    this.router.navigate([currentUrl]);
    });
  }

}
