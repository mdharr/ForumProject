import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserFollower } from '../models/user-follower';

@Injectable({
  providedIn: 'root'
})
export class UserFollowerService {
  private url = environment.baseUrl + 'api';

  constructor(private http: HttpClient) {}

  followUser(followerId: number, followedId: number): Observable<UserFollower> {
    const url = `${this.url}users/${followerId}/follow/${followedId}`;
    return this.http.post<UserFollower>(url, {});
  }

  unfollowUser(followerId: number, followedId: number): Observable<boolean> {
    const url = `${this.url}users/${followerId}/unfollow/${followedId}`;
    return this.http.delete<boolean>(url);
  }

  getFollowersByUserId(userId: number): Observable<UserFollower[]> {
    const url = `${this.url}users/${userId}/followers`;
    return this.http.get<UserFollower[]>(url);
  }

  getFollowedByUserId(userId: number): Observable<UserFollower[]> {
    const url = `${this.url}users/${userId}/followed`;
    return this.http.get<UserFollower[]>(url);
  }

}
