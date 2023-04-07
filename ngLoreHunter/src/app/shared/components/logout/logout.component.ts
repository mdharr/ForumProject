import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent {

  constructor(
              private authService: AuthService,
              private router: Router,
              private snackBar: MatSnackBar
              ) {}

  logout() {
    console.log("Logging out");
    this.authService.logout();
    this.router.navigateByUrl('/');
    this.snackBar.open('Logout Successful!', 'Dismiss', {
      duration: 3000, // Duration in milliseconds for which the snackbar will be shown
      panelClass: ['mat-toolbar', 'mat-primary'], // CSS class for custom styling
      verticalPosition: 'bottom' // Position of the snackbar on the screen
    });
    setTimeout(() => {
      location.reload();
    }, 1000);
  }

}

