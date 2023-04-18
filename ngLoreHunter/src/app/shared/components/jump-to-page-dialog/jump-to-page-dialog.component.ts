import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-jump-to-page-dialog',
  templateUrl: './jump-to-page-dialog.component.html',
  styleUrls: ['./jump-to-page-dialog.component.css']
})
export class JumpToPageDialogComponent {

  page: number = 0;

  constructor(
    public dialogRef: MatDialogRef<JumpToPageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { currentPage: number, totalPages: number }, private dialog: MatDialog) { }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  onJumpToPageClick(): void {
    if (this.page && this.page >= 1 && this.page <= this.data.totalPages) { // Check if the entered page number is valid
      this.dialogRef.close({ page: this.page });
    }
  }

}
