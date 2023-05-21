import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserFollower } from '../models/user-follower';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserFollowerService {
  private baseUrl = environment.baseUrl + 'api';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.authService.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }

  followUser(followerId: number, followedId: number): Observable<UserFollower> {
    const url = `${this.baseUrl}/users/${followerId}/follow/${followedId}`;
    return this.http.post<UserFollower>(url, {}, this.getHttpOptions());
  }

  unfollowUser(followerId: number, followedId: number): Observable<boolean> {
    const url = `${this.baseUrl}/users/${followerId}/unfollow/${followedId}`;
    return this.http.delete<boolean>(url, this.getHttpOptions());
  }

  getFollowersByUserId(userId: number): Observable<UserFollower[]> {
    const url = `${this.baseUrl}/users/${userId}/followers`;
    return this.http.get<UserFollower[]>(url);
  }

  getFollowingByUserId(userId: number): Observable<UserFollower[]> {
    const url = `${this.baseUrl}/users/${userId}/following`;
    return this.http.get<UserFollower[]>(url);
  }

}
