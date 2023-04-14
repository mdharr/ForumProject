import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private url = environment.baseUrl + 'api';

  constructor(private http: HttpClient) { }

  getGames(): Observable<any> {
    return this.http.get(this.url + "/games");
  }
}
