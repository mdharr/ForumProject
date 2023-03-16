import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';
import { Post } from '../models/post';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Sort } from '@angular/material/sort';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  private url = environment.baseUrl + 'api';

  constructor(
    private authService: AuthService,
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
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

  show(id: number): Observable<Post> {
    return this.http.get<Post>(`${this.url}/${id}`, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error(
              'PostService.index() error retrieving post list: ' + err
            )
        );
      })
    );
  }

  createPost(post: Post): Observable<Post> {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return this.http.post<Post>(this.url + '/categories/' + post.category.id +'/posts', post, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error('PostService.createPost(): error creating post.')
        );
      })
    );
  }

  indexAll(): Observable<Post[]> {
    return this.http.get<Post[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error(
              'PostService.index(): error retrieving post list: ' + err
            )
        );
      })
    );
  }

  postsByCategory(categoryId: number): Observable<Post[]> {
    return this.http.get<Post[]>(this.url + '/categories/' + categoryId + '/posts', this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error(
              'PostService.index(): error retrieving post list: ' + err
            )
        );
      })
    );
  }

  update(post: Post): Observable<Post> {
    const httpOptions = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    return this.http.put<Post>(`${this.url}/`, post, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error(
              'PostService.update(): error updating post: ' + err
            )
        );
      })
    );
  }

  fetchPosts(categoryId: number, sort: Sort): Observable<Post[]>{
    const params = new HttpParams()
    .set('_sort', sort.active)
    .set('_order', sort.direction);
    return this.http.get<Post[]>(this.url + '/categories/' + categoryId + '/posts',  {
      params,
     });

  }

}
