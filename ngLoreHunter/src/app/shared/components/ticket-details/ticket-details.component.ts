import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ticket } from 'src/app/models/ticket';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-details',
  templateUrl: './ticket-details.component.html',
  styleUrls: ['./ticket-details.component.css']
})
export class TicketDetailsComponent implements OnInit, OnDestroy {
  ticket: Ticket = new Ticket();
  id: number = 0;

  private ticketSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute, private ticketService: TicketService) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    this.ticketSubscription = this.ticketService.getTicketById(this.id).subscribe(ticket => this.ticket = ticket);
  }

  ngOnDestroy(): void {
    if(this.ticketSubscription) {
      this.ticketSubscription.unsubscribe();
    }
  }
}
