import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { UserNotification } from '../models/user-notification';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserNotificationService {
  private url = environment.baseUrl + 'api';

  constructor(private authService: AuthService, private http: HttpClient,) { }

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.authService.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }

    // rest api endpoint test success for sending user notifications
  sendNotification(message: string) {
    const notification = { message: message };
    return this.http.post(this.url + '/notifications/send', notification, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error('UserNotificationService.sendNotification(): error sending notification.')
        );
      })
    );
  }

  // rest api endpoint test success
  getUnreadUserNotificationsByUserId(userId: number): Observable<UserNotification[]> {
    return this.http.get<UserNotification[]>(this.url + '/users/' + userId + '/notifications/unread').pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
          new Error(
            'UserNotificationService.getUnreadNotificationsByUserId() error retrieving notifications: ' + err
          )
        );
      })
    );
  }

  // rest api endpoint test success for dismissing user notifications
  dismissUserNotification(userId: number, notificationId: number): Observable<void> {
    const url = `${this.url}/users/${userId}/notifications/${notificationId}/dismiss`;
    return this.http.put<void>(url, null).pipe(
      catchError((err: any) => {
        console.log(err);
        throw new Error('UserNotificationService.dismissNotification() error dismissing notification: ' + err);
      })
    );
  }

}
