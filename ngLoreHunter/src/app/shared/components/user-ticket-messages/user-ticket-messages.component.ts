import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, switchMap } from 'rxjs';
import { Ticket } from 'src/app/models/ticket';
import { TicketMessage } from 'src/app/models/ticket-message';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { TicketMessageService } from 'src/app/services/ticket-message.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-user-ticket-messages',
  templateUrl: './user-ticket-messages.component.html',
  styleUrls: ['./user-ticket-messages.component.css']
})
export class UserTicketMessagesComponent implements OnInit, OnDestroy {
  ticketId: number = 0;
  ticket: Ticket = new Ticket();
  messages: TicketMessage[] = [];
  newMessage: TicketMessage = new TicketMessage();
  loggedInUser: User = new User();

  private ticketSubscription: Subscription | undefined;
  private loggedInUserSubscription: Subscription | undefined;

  constructor(private route: ActivatedRoute, private ticketService: TicketService, private messageService: TicketMessageService, private authService: AuthService) { }

  ngOnInit(): void {
    this.ticketId = +this.route.snapshot.paramMap.get('ticketId')!;
    console.log(this.ticketId);

    this.loggedInUserSubscription = this.authService.getLoggedInUser().pipe(
      switchMap(user => {
        this.loggedInUser = user;
        console.log(this.loggedInUser);
        return this.messageService.getMessagesByUserIdAndTicketId(this.loggedInUser.id, this.ticketId);
      })
    ).subscribe({
      next: messages => {
        this.messages = messages.sort((a, b) => {
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        });
      },
      error: error => {
        console.log('Error getting loggedInUser');
        console.log(error);
      }
    });
  }

  ngOnDestroy(): void {
    if(this.ticketSubscription) {
      this.ticketSubscription.unsubscribe();
    }
    if(this.loggedInUserSubscription) {
      this.loggedInUserSubscription.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.ticket) {
      this.messageService.createTicketMessageByTicketId(this.ticketId, this.newMessage).subscribe((message) => {
        this.messages.push(message);
        this.newMessage.content = '';
      });
    }
  }

}
