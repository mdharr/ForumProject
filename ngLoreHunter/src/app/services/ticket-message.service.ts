import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { TicketMessage } from '../models/ticket-message';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TicketMessageService {
  private url = environment.baseUrl + 'api';

  constructor(private authService: AuthService, private http: HttpClient,) { }

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.authService.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }

  getMessagesByTicketId(ticketId: number): Observable<TicketMessage[]> {
    return this.http.get<TicketMessage[]>(this.url + '/tickets/' + ticketId + '/messages', this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
          new Error(
            'TicketMessageService.getMessagesByTicketId(): error retrieving ticket messages: ' + err
          )
        );
      })
    )
  }

  createTicketMessageByTicketId(ticketId: number, ticketMessage: TicketMessage): Observable<TicketMessage> {
    return this.http.post<TicketMessage>(this.url + '/tickets/' + ticketId + '/messages', ticketMessage, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
          new Error('TicketMessageService.createTicketMessageByTicketId(): error creating ticket message: ' + err)
        );
      })
    )
  }

}
