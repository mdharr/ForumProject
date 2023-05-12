import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ticket } from 'src/app/models/ticket';
import { TicketMessage } from 'src/app/models/ticket-message';
import { TicketMessageService } from 'src/app/services/ticket-message.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-messages',
  templateUrl: './ticket-messages.component.html',
  styleUrls: ['./ticket-messages.component.css']
})
export class TicketMessagesComponent implements OnInit {
  ticketId: number = 0;
  ticket: Ticket = new Ticket();
  messages: TicketMessage[] = [];

  constructor(private route: ActivatedRoute, private ticketService: TicketService, private messageService: TicketMessageService) { }

  ngOnInit(): void {
    this.ticketId = +this.route.snapshot.paramMap.get('id')!;
    this.ticketService.getTicketById(this.ticketId).subscribe((ticket) => {
      this.ticket = ticket;
    });
    this.messageService.getMessagesByTicketId(this.ticketId).subscribe((messages) => {
      this.messages = messages;
    });
  }

}
