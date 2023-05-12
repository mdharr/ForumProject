import { TicketMessage } from "./ticket-message";
import { User } from "./user";

export class Ticket {
  id: number;
  title: string;
  description: string;
  status: TicketStatus;
  priority: TicketPriority;
  createdAt: string;
  updatedAt: string;
  user: User;
  ticketMessages: TicketMessage[];

  constructor(
    id: number = 0,
    title: string = '',
    description: string = '',
    status: TicketStatus = TicketStatus.OPEN,
    priority: TicketPriority = TicketPriority.MEDIUM,
    createdAt: string = '',
    updatedAt: string = '',
    user: User = new User,
    ticketMessages: TicketMessage[] = []
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.status = status;
    this.priority = priority;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.user = user;
    this.ticketMessages = ticketMessages;
  }

}

export enum TicketStatus {
  OPEN = 'OPEN',
  IN_PROGRESS = 'IN_PROGRESS',
  RESOLVED = 'RESOLVED',
  CLOSED = 'CLOSED'
}

export enum TicketPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}
