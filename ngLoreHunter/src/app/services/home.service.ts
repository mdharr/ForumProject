import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private url = environment.baseUrl + 'api/categories';

  constructor(private http: HttpClient, private authService: AuthService) { }

  getHttpOptions() {
    let options = {
        headers: {
          Authorization: 'Basic ' + this.authService.getCredentials(),
          'X-Requested-With': 'XMLHttpRequest',
        },
      };
      return options;
    }

    index(): Observable<Category[]> {
      return this.http.get<Category[]>(this.url).pipe(
        catchError((err: any) => {
          console.log(err);
          return throwError(
            () =>
              new Error(
                'HomeService.index() error retrieving list of categories' + err
              )
          );
        })
      );
    }
}
