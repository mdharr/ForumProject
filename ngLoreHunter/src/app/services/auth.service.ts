import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError, tap } from 'rxjs';
import { User } from '../models/user';
import { Buffer } from "buffer";
import { environment } from 'src/environments/environment';
import { NavigationEnd, RouterLink } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.baseUrl;

  private isLoggedIn = false; // flag to track authentication state

  constructor(private http: HttpClient) {}

  register(user: User): Observable<User> {
    // Create POST request to register a new account
    return this.http.post<User>(this.url + 'register', user).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('AuthService.register(): error registering user.')
        );
      })
    );
  }

  login(username: string, password: string): Observable<User> {
    // Make credentials
    const credentials = this.generateBasicAuthCredentials(username, password);
    // Send credentials as Authorization header specifying Basic HTTP authentication
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Basic ${credentials}`,
        'X-Requested-With': 'XMLHttpRequest',
      }),

    };

    // Create GET request to authenticate credentials
    return this.http.get<User>(this.url + 'authenticate', httpOptions).pipe(
      tap((newUser) => {
        // While credentials are stored in browser localStorage, we consider
        // ourselves logged in.
        localStorage.setItem('credentials', credentials);
        this.isLoggedIn = true;
        localStorage.setItem('isLoggedIn', 'true');
        return newUser;
      }),
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('AuthService.login(): error logging in user.')
        );
      })
    );
  }

  logout(): Observable<any> {
    localStorage.removeItem('credentials');
    return this.http.post(this.url + 'logout', null).pipe(
      tap(() => {
        // set isLoggedIn to false in localStorage
        localStorage.setItem('isLoggedIn', 'false');
      }),
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('AuthService.logout(): error logging out user.')
        );
      })
    );
  }

  isAuthenticated() {
    // Check isLoggedIn flag and local storage or cookie
    return this.isLoggedIn || localStorage.getItem('isLoggedIn') === 'true';
  }

  getLoggedInUser(): Observable<User> {
    if (!this.checkLogin()) {
      return throwError(() => {
        new Error('Not logged in.');
      });
    }
    let httpOptions = {
      headers: {
        Authorization: 'Basic ' + this.getCredentials(),
        'X-Requested-with': 'XMLHttpRequest',
      },
    };
    return this.http
      .get<User>(this.url + 'authenticate', httpOptions)
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () => new Error( 'AuthService.getUserById(): error retrieving user: ' + err )
          );
        })
      );
  }

  checkLogin(): boolean {
    if (localStorage.getItem('credentials')) {
      return true;
    }
    return false;
  }

  generateBasicAuthCredentials(username: string, password: string): string {
    return Buffer.from(`${username}:${password}`).toString('base64');
  }

  getCredentials(): string | null {
    return localStorage.getItem('credentials');
  }

  getLoggedInUsers(): Observable<number> {
    return this.http.get<number>(this.url + 'logged-in-users').pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('AuthService.getLoggedInUsers(): error retrieving logged in users.')
        );
      })
    );
  }

  getUserCounts(): Observable<any> {
    // Send HTTP request to backend API to fetch counts of logged-in and not logged-in users
    return this.http.get<any>(this.url + 'userCounts').pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('AuthService.getUserCounts(): error fetching user counts.')
        );
      })
    );
  }

}
