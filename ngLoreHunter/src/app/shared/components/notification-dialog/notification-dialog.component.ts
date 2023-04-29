import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
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
    this.userNotificationService.sendNotification(message).subscribe({
      next: () => {
        console.log('Notification sent successfully');
        this.dialogRef.close();
      },
      error: (error) => {
        console.error('Error sending notification:', error);
      }
    });
  }

}
