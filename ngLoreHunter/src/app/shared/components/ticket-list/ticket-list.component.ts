import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit, OnDestroy {

  displayedColumns: string[] = ['title', 'status', 'priority', 'createdAt', 'updatedAt', 'user'];
  tickets: Ticket[] = [];

  private ticketSubscription: Subscription | undefined;

  constructor(private ticketService: TicketService, private router: Router) { }

  ngOnInit(): void {
    this.getTickets();
  }

  getTickets(): void {
    this.ticketSubscription = this.ticketService.getAllTickets().subscribe((tickets) => {
      this.tickets = tickets;
    });
  }

  viewTicketDetails(ticketId: number): void {
    this.router.navigate(['/tickets', ticketId]);
  }

  onRowClicked(ticket: Ticket) {
    this.router.navigate(['/tickets', ticket.id]);
  }

  ngOnDestroy(): void {
    if(this.ticketSubscription) {
      this.ticketSubscription.unsubscribe();
    }
  }

}
