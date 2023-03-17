import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Comment } from '../models/comment';
import { Sort } from '@angular/material/sort';
import { Post } from '../models/post';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  private url = environment.baseUrl + 'api';

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.authService.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }

  createComment(comment: Comment): Observable<Comment> {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return this.http.post<Comment>(this.url + '/posts/' + comment.post.id + '/comments', comment, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error('CommentService.createComment(): error creating comment')
        );
      })
    );
  }

  fetchComments(categoryId: number, postId: number, sort: Sort): Observable<Comment[]>{
    const params = new HttpParams()
    .set('_sort', sort.active)
    .set('_order', sort.direction);
    return this.http.get<Comment[]>(this.url + '/categories/' + categoryId + '/posts/' + postId + '/comments',  {
      params,
     });

  }

  commentsByPost(categoryId: number, postId: number): Observable<Post[]> {
    return this.http.get<Post[]>(this.url + '/categories/' + categoryId + '/posts/' + postId + '/comments').pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error(
              'CommentService.index(): error retrieving comment list: ' + err
            )
        );
      })
    );
  }
}
