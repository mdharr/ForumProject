import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SessionService {
  private url = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getActiveSessionCount(): Observable<number> {
    return this.http.get<number>(this.url + 'sessions/active');
  }
}
