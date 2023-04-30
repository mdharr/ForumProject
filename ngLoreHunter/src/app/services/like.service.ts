import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Like } from '../models/like';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  private url = environment.baseUrl + 'api';

  constructor(private http: HttpClient) {}

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

  deleteLike(likeId: number): Observable<any> {
    const url = `${this.url}/likes/${likeId}`;
    return this.http.delete(url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error(
              'LikeService.deleteLike() error deleting like' + err
            )
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
    return this.http.post<boolean>(url, user).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error(
              'LikeService.hasUserLikedComment() error retrieving user liked comment boolean value' + err
            )
        );
      })
    );
  }
}
