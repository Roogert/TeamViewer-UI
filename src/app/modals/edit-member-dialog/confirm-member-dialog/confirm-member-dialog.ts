// confirm-dialog.component.ts

import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-member-dialog',
  template: `
    <h1 mat-dialog-title>Are you sure?</h1>
    <div mat-dialog-content>
      <p>
        You are about to archive Member {{ data.memberName }}. This action
        cannot be undone.
      </p>
    </div>
    <div mat-dialog-actions>
      <button mat-button type="button" (click)="onCancel()">Cancel</button>
      <button mat-button type="submit" (click)="onConfirm()">Archive</button>
    </div>
  `,
})
export class ConfirmMemberDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<ConfirmMemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { memberName: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close(false);
  }

  onConfirm(): void {
    this.dialogRef.close(true);
  }
}
