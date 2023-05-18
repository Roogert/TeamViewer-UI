import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.scss']
})
export class MemberDialogComponent {
  firstName = '';
  lastName = '';
  selectedTitle = '';
  selectedTeam = '';

  titles: string[] = [
    'Software Engineer',
    'Junior Developer',
  ];
  teams: string[] = [
    'Red Jaguars',
    'Blue Barracudas',
    'Green Monkeys',
    'Orange Iguanas',
    'Purple Parrots',
    'Silver Snakes',
  ];
team: any;

  constructor(
    public dialogRef: MatDialogRef<MemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){}

  closeDialog(): void {
    this.dialogRef.close();
  }
  saveDialog(): void {
    const dialogData = {
      firstName: this.firstName,
      lastName: this.lastName,
      title: this.selectedTitle,
      team: this.selectedTeam
    };
    this.dialogRef.close(dialogData);
  }
}
