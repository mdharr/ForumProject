import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, finalize, map, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Game } from '../models/game';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private url = environment.baseUrl + 'api';

  constructor(private http: HttpClient) { }

  // getGames(): Observable<any> {
  //   return this.http.get<any[]>(this.url + "/games");
  // }

  getGames(page: number, pageSize: number): Observable<any> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('page_size', pageSize.toString());

    return this.http.get<any[]>(this.url + "/games", { params })
      .pipe(
        finalize(() => console.log('API call completed')) // Optional: Perform any finalization logic here
      );
  }

  searchGames(searchQuery: string): Observable<any[]> {
    let params = new HttpParams()
      .set('search', searchQuery);

    return this.http.get<any[]>(this.url + "/games/search", { params })
      .pipe(
        finalize(() => console.log('API call completed')) // Optional: Perform any finalization logic here
      );
  }

  fetchGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.url + '/games/library').pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
            new Error(
              'GameService.fetchGames(): error retrieving list of all games from app library: ' + err
            )
        );
      })
    );
  }
}
