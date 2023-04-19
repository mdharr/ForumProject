import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-banner-image-dialog',
  templateUrl: './user-banner-image-dialog.component.html',
  styleUrls: ['./user-banner-image-dialog.component.css']
})
export class UserBannerImageDialogComponent {
  bannerImageUrlForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<UserBannerImageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { user: User }
  ) {
    this.bannerImageUrlForm = this.fb.group({
      bannerImageUrl: ['', Validators.required]
    });
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onSubmit() {
    const bannerImageUrl = this.bannerImageUrlForm.get('bannerImageUrl')?.value;
    if (bannerImageUrl) {
      const updatedUser = { ...this.data.user, bannerImage: bannerImageUrl };
      this.userService.update(updatedUser).subscribe((user) => {
        this.dialogRef.close(user);
      });
    }
  }

}
