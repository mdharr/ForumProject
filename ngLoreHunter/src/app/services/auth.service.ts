import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, catchError, throwError, tap, Subject, BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { Buffer } from "buffer";
import { environment } from 'src/environments/environment';
import { NavigationEnd, RouterLink } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private url = environment.baseUrl;

  private loggedInUserSubject: BehaviorSubject<User> = new BehaviorSubject<User>(new User());
  private loggedInUser: User = new User();

  private isLoggedIn = false; // flag to track authentication state

  userId: number = 0; // User ID property

  private loggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private loggedIn = new BehaviorSubject<boolean>(false);
  loggedIn$ = this.loggedInSubject.asObservable();

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
        this.loggedIn.next(true);
        localStorage.setItem('isLoggedIn', 'true');
        this.loggedInUser = newUser; // store the logged-in user object
        this.loggedInUserSubject.next(this.loggedInUser); // emit the logged-in user object using the BehaviorSubject
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
    localStorage.removeItem('isLoggedIn');
    localStorage.clear();
    return this.http.post(this.url + 'logout', null).pipe(
      tap(() => {
        // set isLoggedIn to false in localStorage
        this.loggedIn.next(false);
        this.loggedInUser = new User(); // clear the logged-in user object
        this.loggedInUserSubject.next(this.loggedInUser); // emit null to indicate no logged-in user using the BehaviorSubject
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

    // Setter for user ID
    setUserId(userId: number): void {
      this.userId = userId;
    }

    // Getter for user ID
    getUserId(): number {
      return this.userId;
    }

    setLoggedIn(loggedIn: boolean): void {
      this.loggedInSubject.next(loggedIn);
    }

    getCurrentLoggedInUser(): BehaviorSubject<User> {
      return this.loggedInUserSubject;
    }

}
