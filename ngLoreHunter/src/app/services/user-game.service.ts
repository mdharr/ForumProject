import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserGame } from '../models/user-game';

@Injectable({
  providedIn: 'root'
})
export class UserGameService {
  private url = environment.baseUrl + 'api';

  constructor(private http: HttpClient) { }

  fetchUserGames(userId: number): Observable<UserGame[]> {
    return this.http.get<UserGame[]>(this.url + '/users/' + userId + '/usergames').pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error(
              'UserGameService.fetchUserGames(): error retrieving user games: ' + err
            )
        );
      })
    );
  }
}
