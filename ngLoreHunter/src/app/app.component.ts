import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from 'src/app/services/auth.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'ngLoreHunter';

  onlineUsers: User[] = [];

  loggedInUsers: User[] = [];

  isLoggedIn = false;
  loggedInUsersCount: number = 0;
  notLoggedInUsersCount: number = 0;

  constructor(
    private _snackBar: MatSnackBar,
    private authService: AuthService,
    private http: HttpClient
    ) {}

  ngOnInit() {

    addEventListener('offline', (e) => {
      this._snackBar.open('Please check your internet connection','Dismiss', {
        duration: 5000
      });
    });

    addEventListener('online', (e) => {
      this._snackBar.open('You are now online','Dismiss', {
        duration: 2000
      });
    });

    // Fetch count of logged-in and not logged-in users from backend API
    this.fetchUserCounts();

    // Update isLoggedIn flag based on localStorage value
    this.isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

  }

  loggedIn(): boolean {
    return this.authService.checkLogin();
  }

  fetchUserCounts() {
    // Send HTTP request to backend API to fetch counts of logged-in and not logged-in users
    // Update loggedInUsersCount and notLoggedInUsersCount variables based on the response
    this.authService.getUserCounts().subscribe((response: any) => {
      this.loggedInUsersCount = response.loggedInUsersCount;
      this.notLoggedInUsersCount = response.notLoggedInUsersCount;
    });
  }

  onLoginClick() {
    // Call login() method from AuthService and update isLoggedIn flag and user counts
    this.authService.login('username', 'password').subscribe(() => {
      this.isLoggedIn = true;
      this.fetchUserCounts();
    });
  }

  onLogoutClick() {
    // Call logout() method from AuthService and update isLoggedIn flag and user counts
    this.authService.logout().subscribe(() => {
      this.isLoggedIn = false;
      this.fetchUserCounts();
    });
  }


}
