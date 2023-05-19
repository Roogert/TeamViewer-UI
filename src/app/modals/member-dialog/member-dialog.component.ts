import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team } from 'src/app/models/team.model';

@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.scss'],
})
export class MemberDialogComponent implements OnInit {
  firstName = '';
  lastName = '';
  selectedTitle = '';
  selectedTeam = '';

  titles: string[] = ['Software Engineer', 'Junior Developer'];
  teams: Team[] = [];
  team: any;

  constructor(
    public dialogRef: MatDialogRef<MemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.teams = this.data.teams;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }
  saveDialog(): void {
    const dialogData = {
      firstName: this.firstName,
      lastName: this.lastName,
      title: this.selectedTitle,
      team: this.selectedTeam,
    };
    this.dialogRef.close(dialogData);
  }
}
