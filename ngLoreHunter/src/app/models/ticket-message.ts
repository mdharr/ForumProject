import { tick } from "@angular/core/testing";
import { Ticket } from "./ticket";
import { User } from "./user";

export class TicketMessage {
  id: number;
  content: string;
  createdAt: string;
  ticket: Ticket;
  user: User;

  constructor(
    id: number = 0,
    content: string = '',
    createdAt: string = '',
    ticket: Ticket = new Ticket(),
    user: User = new User()
  ) {
    this.id = id;
    this.content = content;
    this.createdAt = createdAt;
    this.ticket = ticket;
    this.user = user;
  }

}
