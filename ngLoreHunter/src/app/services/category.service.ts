import { DatePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url = environment.baseUrl + 'api/categories';
  private otherUrl = environment.baseUrl;

  constructor(private http: HttpClient, private datePipe: DatePipe, private authService: AuthService) { }

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.authService.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }

  categoriesForUser(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + "/authenticated", this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
              new Error(
                'CategoryService.index(): error retrieving category list: ' + err
              )
        );
      })
    );
  }

  indexAll(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
              new Error(
                'CategoryService.index(): error retrieving category list: ' + err
              )
        );
      })
    );
  }
}
