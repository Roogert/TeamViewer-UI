import { TeamService } from './../../services/team.service';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Member } from 'src/app/models/member.model';
import { Team } from 'src/app/models/team.model';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-edit-member-dialog',
  template: `<div>
    <form [formGroup]="memberForm" (ngSubmit)="save()" class="form">
      <div class="first-row">
        <mat-form-field>
          <input
            matInput
            placeholder="First Name"
            formControlName="first_name"
          />
          <mat-error *ngIf="memberForm.controls['first_name'].invalid">
            Please provide a First name.
          </mat-error>
        </mat-form-field>

        <mat-form-field>
          <input matInput placeholder="Last Name" formControlName="last_name" />
          <mat-error *ngIf="memberForm.controls['last_name'].invalid">
            Please provide a Last name.
          </mat-error>
        </mat-form-field>
      </div>
      <div class="second-row">
        <mat-form-field>
          <mat-label>Title</mat-label>
          <mat-select formControlName="job_title">
            <mat-option value="Associate Software Engineer"
              >Associate Software Engineer</mat-option
            ><mat-option value="Software Engineer">Software Engineer</mat-option
            ><mat-option value="Senior Software Engineer"
              >Senior Software Engineer</mat-option
            >
            <mat-option value="Associate Quality Engineer"
              >Associate Quality Engineer</mat-option
            ><mat-option value="Quality Engineer">Quality Engineer</mat-option>
            <mat-option value="Senior Quality Engineer"
              >Senior Quality Engineer</mat-option
            >
          </mat-select>
          <mat-error *ngIf="memberForm.controls['job_title'].invalid">
            Please select a Title.
          </mat-error>
        </mat-form-field>

        <mat-form-field>
          <mat-label>Team</mat-label>
          <mat-select formControlName="team">
            <mat-option *ngFor="let team of data.teams" [value]="team">
              {{ team.name }}
            </mat-option>
          </mat-select>
          <mat-error *ngIf="memberForm.controls['team'].invalid">
            Please select a Team.
          </mat-error>
        </mat-form-field>
      </div>

      <div class="buttons" mat-dialog-actions>
        <button mat-button (click)="onCancel()">Cancel</button>
        <button mat-button type="submit" [disabled]="memberForm.invalid">
          Submit
        </button>
      </div>
    </form>
  </div> `,
  styleUrls: ['./edit-member-dialog.component.scss'],
})
export class EditMemberDialogComponent {
  memberForm: FormGroup = new FormGroup({
    first_name: new FormControl(this.data.member.first_name, [
      Validators.required,
    ]),
    last_name: new FormControl(this.data.member.last_name, [
      Validators.required,
    ]),
    job_title: new FormControl(this.data.member.job_title, [
      Validators.required,
    ]),
    team: new FormControl(this.data.member.team_id, [Validators.required]),
  });

  teams: Team[] = [];
  members: Member[] = [];
  constructor(
    private teamService: TeamService,
    private memberService: MemberService,
    public dialogRef: MatDialogRef<EditMemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { member: Member; teams: Team[] }
  ) {}

  save() {
    if (this.memberForm.valid) {
      const member = {
        first_name: this.memberForm.get('first_name')?.value,
        last_name: this.memberForm.get('last_name')?.value,
        job_title: this.memberForm.get('job_title')?.value,
        team_id: this.memberForm.get('team')?.value.id,
      };
      this.dialogRef.close(member);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
