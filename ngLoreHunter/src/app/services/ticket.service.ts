import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { catchError, Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Ticket } from '../models/ticket';
import { CreateTicketDialogComponent } from '../shared/components/create-ticket-dialog/create-ticket-dialog.component';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
  private url = environment.baseUrl + 'api';

  constructor(private authService: AuthService, private http: HttpClient, private dialog: MatDialog) { }

  getHttpOptions() {
    let options = {
      headers: {
        Authorization: 'Basic ' + this.authService.getCredentials(),
        'X-Requested-With': 'XMLHttpRequest',
      },
    };
    return options;
  }

  getAllTickets(): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.url + '/tickets', this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
          new Error(
            'TicketService.getAllTickets(): error retrieving all tickets ' + err
          )
        );
      })
    );
  }

  getTicketById(ticketId: number): Observable<Ticket> {
    return this.http.get<Ticket>(this.url + '/tickets/' + ticketId, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
          new Error(
            'TicketService.getTicketById(): error retrieving ticket: ' + err
          )
        );
      })
    );
  }

  getTicketsByUserId(userId: number): Observable<Ticket[]> {
    return this.http.get<Ticket[]>(this.url + '/users/' + userId + '/tickets', this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
          new Error(
            'TicketService.getTicketsByUserId(): error retrieving tickets: ' + err
          )
        );
      })
    );
  }

  createTicket(ticket: Ticket): Observable<Ticket> {
    return this.http.post<Ticket>(this.url + '/tickets', ticket, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () =>
          new Error('TicketService.createTicket(): error creating ticket: ' + err)
        );
      })
    );
  }

  updateTicketByTicketId(ticket: Ticket, ticketId: number): Observable<Ticket> {
    return this.http.put<Ticket>(this.url + '/tickets/' + ticketId, ticket, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TicketService.updateTicket(): error updating ticket: ' + err)
        );
      })
    );
  }

  updateTicketByTicketIdAndUserId(ticket: Ticket, ticketId: number, userId: number): Observable<Ticket> {
    return this.http.put<Ticket>(this.url + '/users/' + userId + '/tickets/' + ticketId, ticket, this.getHttpOptions()).pipe(
      catchError((err: any) => {
        console.log(err);
        return throwError(
          () => new Error('TicketService.updateTicketByTicketIdAndUserId(): error updating ticket: ' + err)
        );
      })
    );
  }

  openCreateTicketDialog(): void {
    const dialogRef = this.dialog.open(CreateTicketDialogComponent, {
      width: '500px',
      // Other dialog configuration options
    });

    // Subscribe to the dialog close event to handle the result
    dialogRef.afterClosed().subscribe((newTicket: Ticket | undefined) => {
      if (newTicket) {
        // Call the createTicket() method to save the new ticket
        this.createTicket(newTicket).subscribe(
          (ticket: Ticket) => {
            // Handle successful creation of the ticket
            console.log('Ticket created:', ticket);
            // Perform any additional actions, such as refreshing the ticket list
          },
          (err) => {
            // Handle error during ticket creation
            console.error('Error creating ticket:', err);
            // Perform any error handling, such as displaying an error message
          }
        );
      }
    });
  }

}
