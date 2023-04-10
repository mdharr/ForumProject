import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { switchMap } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {
  userId: number = 0; // Retrieve userId from AuthService


  constructor(
              private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar,
              private userService: UserService
              ) {}

  logout() {
    console.log("Logging out");
    this.authService.logout();
    this.reloadCurrentPage();
    this.snackBar.open('Logout Successful!', 'Dismiss', {
      duration: 3000, // Duration in milliseconds for which the snackbar will be shown
      panelClass: ['mat-toolbar', 'mat-primary'], // CSS class for custom styling
      verticalPosition: 'bottom' // Position of the snackbar on the screen
    });
  }

  // logout() {
  //   console.log("logging out");
  //   this.userId = this.authService.getUserId(); // Retrieve userId from AuthService
  //   this.authService.logout().pipe(
  //     switchMap(() => {
  //       // Handle successful logout
  //       console.log("logout successfully");
  //       // Pass the user ID to setOffline() function in UserService
  //       return this.userService.setOffline(this.userId);
  //     })
  //   ).subscribe({
  //     next: (response) => {
  //       console.log("Set user offline successfully: ", response);
  //       // Redirect to login page or do other actions
  //       this.router.navigate(['/home']);
  //     },
  //     error: (error) => {
  //       console.error("logout error: ", error);
  //       // Show error message to user or do other actions
  //       this.router.navigate(['/home']);
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

