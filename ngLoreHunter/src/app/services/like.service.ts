import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Like } from '../models/like';
import { User } from '../models/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private url = environment.baseUrl + 'api';

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

  createLike(commentId: number, user: User): Observable<Like> {
    const url = `${this.url}/comments/${commentId}/likes`;
    return this.http.post<Like>(url, user).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error(
              'LikeService.createLike() error creating like' + err
            )
        );
      })
    );
  }

  deleteLike(likeId: number) {
    const url = `${this.url}/likes/${likeId}`;
    const options = this.getHttpOptions();

    return this.http.delete(url, options)
      .pipe(
        catchError((error: any) => {
          console.log(error);
          return throwError(
            new Error('LikeService.deleteLike() error deleting like')
          );
        })
      );
  }

  getLikeCount(commentId: number): Observable<number> {
    const url = `${this.url}/comments/${commentId}/likes/count`;
    return this.http.get<number>(url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error(
              'LikeService.getLikeCount() error retrieving like count' + err
            )
        );
      })
    );
  }

  hasUserLikedComment(commentId: number, user: User): Observable<boolean> {
    const url = `${this.url}/comments/${commentId}/likes/has-liked`;
    const options = this.getHttpOptions();
    return this.http.post<boolean>(url, user, options).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(() => {
          const error = new Error(
            'LikeService.hasUserLikedComment() error retrieving user liked comment boolean value' + err
          );
          return error;
        });
      })
    );
  }






}
