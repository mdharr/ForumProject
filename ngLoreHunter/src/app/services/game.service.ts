import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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

    return this.http.get<any[]>(this.url + "/games", { params });
  }
}
