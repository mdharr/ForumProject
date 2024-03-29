import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserNotificationService } from 'src/app/services/user-notification.service';

@Component({
  selector: 'app-notification-dialog',
  templateUrl: './notification-dialog.component.html',
  styleUrls: ['./notification-dialog.component.css']
})
export class NotificationDialogComponent {
  notificationForm: FormGroup;
  message: string = '';

  constructor(
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private userNotificationService: UserNotificationService,
    public dialogRef: MatDialogRef<NotificationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.notificationForm = this.fb.group({
      message: [this.data.userNotification.message, Validators.required]
    });
   }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const { message } = this.notificationForm.value;
    if(message !== '') {
      this.userNotificationService.sendNotification(message).subscribe({
        next: () => {
          console.log('Notification sent successfully');
          this.dialogRef.close();
          this.snackBar.open('Notification Sent!', 'Dismiss', {
            duration: 4000,
            panelClass: ['mat-toolbar', 'mat-primary'],
            verticalPosition: 'bottom'
          });
        },
        error: (error) => {
          console.error('Error sending notification:', error);
          this.snackBar.open('Notification Not Sent', 'Dismiss', {
            duration: 1000,
            panelClass: ['mat-toolbar', 'mat-primary'],
            verticalPosition: 'bottom'
          });
        }
      });
    }
  }

}
