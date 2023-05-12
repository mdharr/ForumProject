import { Component } from '@angular/core';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent {

  displayedColumns: string[] = ['title', 'status', 'priority', 'createdAt', 'updatedAt', 'user'];
  dataSource: Ticket[] = [];

  constructor(private ticketService: TicketService) { }

  ngOnInit(): void {
    this.ticketService.getAllTickets().subscribe(tickets => {
      this.dataSource = tickets;
    });
  }

}
