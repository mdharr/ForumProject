import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Ticket } from 'src/app/models/ticket';
import { TicketMessage } from 'src/app/models/ticket-message';
import { TicketMessageService } from 'src/app/services/ticket-message.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-ticket-messages',
  templateUrl: './ticket-messages.component.html',
  styleUrls: ['./ticket-messages.component.css']
})
export class TicketMessagesComponent implements OnInit, OnDestroy {
  ticketId: number = 0;
  ticket: Ticket = new Ticket();
  messages: TicketMessage[] = [];
  newMessage: TicketMessage = new TicketMessage();

  private ticketSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute, private ticketService: TicketService, private messageService: TicketMessageService) { }

  ngOnInit(): void {
    this.ticketId = +this.route.snapshot.paramMap.get('id')!;
    this.ticketSubscription = this.ticketService.getTicketById(this.ticketId).subscribe((ticket) => {
      this.ticket = ticket;
    });
    this.messageService.getMessagesByTicketId(this.ticketId).subscribe((messages) => {
      this.messages = messages.sort((a, b) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      });
    });
  }

  ngOnDestroy(): void {
    if(this.ticketSubscription) {
      this.ticketSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.ticket) {
      this.messageService.createTicketMessageByTicketId(this.ticket.id, this.newMessage).subscribe((message) => {
        this.messages.push(message);
        this.newMessage.content = '';
      });
    }
  }

}
