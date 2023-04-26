import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private url = environment.baseUrl + 'api';

  userId: number = 0;

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

    // getUnreadNotifications(userId: number): Observable<UserNotification[]> {
    //   return this.http.get<UserNotification[]>(`/users/${userId}/notifications/unread`);
    // }

}
