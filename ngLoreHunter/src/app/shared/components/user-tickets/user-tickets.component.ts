import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ticket } from 'src/app/models/ticket';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-user-tickets',
  templateUrl: './user-tickets.component.html',
  styleUrls: ['./user-tickets.component.css']
})
export class UserTicketsComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['title', 'status', 'priority', 'createdAt', 'updatedAt', 'user'];
  tickets: Ticket[] = [];
  loggedInUser: User = new User();

  private ticketSubscription: Subscription | undefined;
  private loggedInUserSubscription: Subscription | undefined;

  constructor(private ticketService: TicketService, private router: Router, private authService: AuthService) { }

  ngOnInit(): void {
    this.loggedInUserSubscription = this.authService.getLoggedInUser().subscribe({
      next: (user) => {
        this.loggedInUser = user;
        console.log(this.loggedInUser);
        this.getTickets(this.loggedInUser.id);
      },
      error: (error) => {
        console.log('Error getting loggedInUser');
        console.log(error);
      },
    });
  }

  getTickets(userId: number): void {
    this.ticketSubscription = this.ticketService.getTicketsByUserId(userId).subscribe((tickets) => {
      this.tickets = tickets;
    });
  }

  viewTicketMessages(ticketId: number): void {
    this.router.navigate(['/users', this.loggedInUser.id, 'tickets', ticketId, 'messages']);
  }

  onRowClicked(ticket: Ticket) {
    this.router.navigate(['/users', this.loggedInUser.id, 'tickets', ticket.id, 'messages']);
  }

  ngOnDestroy(): void {
    if(this.ticketSubscription) {
      this.ticketSubscription.unsubscribe();
    }
    if(this.loggedInUserSubscription) {
      this.loggedInUserSubscription.unsubscribe();
    }
  }

  trimSubject(subject: string): string {
    const maxLength = 15;
    return subject.length > maxLength ? subject.slice(0, maxLength) + '...' : subject;
  }

}
