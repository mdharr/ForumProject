import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Ticket } from 'src/app/models/ticket';

@Component({
  selector: 'app-create-ticket-dialog',
  templateUrl: './create-ticket-dialog.component.html',
  styleUrls: ['./create-ticket-dialog.component.css']
})
export class CreateTicketDialogComponent {
  ticket: Ticket = new Ticket();

  constructor(public dialogRef: MatDialogRef<CreateTicketDialogComponent>) {}

  createTicket(): void {
    // Validate the form fields if needed

    // Close the dialog and pass the new ticket to the calling component
    this.dialogRef.close(this.ticket);
  }

  closeDialog(): void {
    // Close the dialog without creating a ticket
    this.dialogRef.close();
  }
}
