import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = environment.baseUrl + 'api/users';

  user: User = new User();
  userChanged: EventEmitter<User> = new EventEmitter<User>();

  constructor(private authService: AuthService, private http: HttpClient) { }

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.authService.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }

  index(): Observable<User[]> {
    return this.http.get<User[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('UserService.index(): error retrieving users: ' + err)
        );
      })
    );
  }

  show(id: number): Observable<User> {
    return this.http.get<User>(this.url + '/' + id).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error('UserService.show(): error retrieving user: ' + err)
        );
      })
    );
  }

  update(user: User): Observable<User> {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return this.http
      .put<User>(`${this.url}/`, user, this.getHttpOptions())
      .pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () => new Error('userService.update(): error updating user: ' + err)
          );
        })
      );
  }

  adminUpdate(user: User, userId: number): Observable<User> {
    return this.http.put<User>(this.url + '/' + userId + '/update', user, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('UserService.adminUpdate(): error updating user: ' + err)
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
    const httpOptions = this.getHttpOptions();
    return this.http
      .put<User>(`${this.url}/${user.id}`, user, httpOptions)
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

  setOffline(userId: number): Observable<User> {
    const httpOptions = this.getHttpOptions();
    return this.http.put<User>(`${this.url}/${userId}/setOffline`, {}, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('UserService.setOffline(): error setting user offline: ' + err)
        );
      })
    );
  }

  setOnline(userId: number): Observable<User> {
    const httpOptions = this.getHttpOptions();
    return this.http.put<User>(`${this.url}/${userId}/setOnline`, {}, httpOptions).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('UserService.setOnline(): error setting user online: ' + err)
        );
      })
    );
  }

  setUser(user: User) {
    this.user = user;
    this.userChanged.emit(user);
  }

}
