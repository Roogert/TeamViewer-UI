import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/models/team.model';

@Component({
  selector: 'app-edit-dialog',
  template: `<div mat-dialog-content>
    <form [formGroup]="teamForm" (ngSubmit)="save()" class="form">
      <mat-form-field appearance="fill" class="form-field">
        <input matInput placeholder="Name" formControlName="name" />
        <mat-error *ngIf="teamForm.controls['name'].invalid">
          Please provide a valid Team name.
        </mat-error>
      </mat-form-field>
      <mat-form-field appearance="fill" class="form-field">
        <textarea
          matInput
          placeholder="Description"
          formControlName="description"
        ></textarea>
        <mat-error *ngIf="teamForm.controls['description'].invalid">
          Please provide a valid Team description.
        </mat-error>
      </mat-form-field>
      <div class="button-group">
        <button mat-button type="button" (click)="onCancel()">Cancel</button>
        <button mat-button type="submit" [disabled]="teamForm.invalid">
          Submit
        </button>
      </div>
    </form>
  </div> `,
  styleUrls: ['./edit-dialog.component.scss'],
})
export class EditDialogComponent {
  teamForm: FormGroup = new FormGroup({
    name: new FormControl(this.data.team.name, [Validators.required]),
    description: new FormControl(this.data.team.description, [
      Validators.required,
    ]),
  });

  constructor(
    private teamService: TeamService,
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { team: Team }
  ) {}

  save() {
    if (this.teamForm.valid) {
      const team = {
        id: this.data.team.id,
        name: this.teamForm.get('name')?.value,
        description: this.teamForm.get('description')?.value,
      };
      this.dialogRef.close(team);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
