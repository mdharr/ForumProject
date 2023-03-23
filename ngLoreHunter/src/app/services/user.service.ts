import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.baseUrl + 'api/users';

  constructor(private authService: AuthService, private http: HttpClient) { }

  getHttpOptions() {
    let options = {
      headers: {
        Authorizations: 'Basic ' + this.authService.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }

  index(): Observable<User[]> {
    return this.http.get<User[]>(this.url, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('UserService.index(): error retrieving users: ' + err)
        );
      })
    );
  }

  show(id: number): Observable<User> {
    return this.http.get<User>(`${this.url}/${id}`).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error('UserService.show(): error retrieving user: ' + err)
        );
      })
    );
  }

  destroy(id: number): Observable<void> {
    return this.http.delete<void>(`${this.url}/${id}`).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('userService.delete(): error deleting user: ' + err)
        );
      })
    );
  }

  disableAdmin(user: User): Observable<User> {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return this.http
      .put<User>(`${this.url}/${user.id}`, user, this.getHttpOptions())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () =>
              new Error(
                'userService.disableAdmin(): error disabling user: ' + err
              )
          );
        })
      );
  }

}
