import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, map, Observable, throwError } from 'rxjs';
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

  comments: Comment[] = [];

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

  createComment(comment: Comment, categoryId: number, postId: number): Observable<Comment> {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return this.http.post<Comment>(this.url + '/categories/' + categoryId + '/posts/' + postId + '/comments', comment, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error('CommentService.createComment(): error creating comment')
        );
      })
    );
  }

  fetchComments(categoryId: number, postId: number): Observable<Comment[]>{
    return this.http.get<Comment[]>(this.url + '/categories/' + categoryId + '/posts/' + postId + '/comments').pipe(
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

  commentsByPost(categoryId: number, postId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.url + '/categories/' + categoryId + '/posts/' + postId + '/comments').pipe(
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

  indexAll(): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.url + '/comments').pipe(
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

  getUserComments(userId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.url + '/users/' + userId + '/comments').pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error(
              'CommentService.getUserComments(): error retrieving user comments: ' + err
            )
        );
      })
    );
  }

}
