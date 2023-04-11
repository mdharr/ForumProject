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
    console.log("logging in");
    this.authService.login(loginUser.username, loginUser.password).subscribe({
      next: (loggedInUser) => {
        console.log("login success")
        console.log(loggedInUser);
        this.cdr.detectChanges();
        this.modalService.dismissAll();
        // this.router.navigateByUrl('home');
        this.snackBar.open('Login Success!', 'Dismiss', {
          duration: 4000,
          panelClass: ['mat-toolbar', 'mat-primary'],
          verticalPosition: 'bottom'
        });
      },
      error: (fail) => {
        console.error('login fail');
        console.error(fail);
      }
    })

  }

}
