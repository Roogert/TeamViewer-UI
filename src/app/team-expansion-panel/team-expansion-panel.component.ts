import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MemberDialogComponent } from '../modals/member-dialog/member-dialog.component';

@Component({
  selector: 'app-team-expansion-panel',
  templateUrl: './team-expansion-panel.component.html',
  styleUrls: ['./team-expansion-panel.component.scss'],
  //encapsulation: ViewEncapsulation.None
})

export class TeamExpansionPanelComponent {
  // TODO: Get Team names from backend
  list: string[] = [
    'Red Jaguars',
    'Blue Barracudas',
    'Green Monkeys',
    'Orange Iguanas',
    'Purple Parrots',
    'Silver Snakes',
  ];

defaultPhoto: string = '/assets/images/avatar.png';

members: member[] = [
  { name: 'James Halfhill', photo: '' },
  { name: 'Devin Gamestop', photo: '' },
  { name: 'Aosu Yakoma', photo: '' },
  { name: 'Tammy Panel', photo: '' },
  { name: 'Jane Smith', photo: '' },
  { name: 'Lucille Ball', photo: '' },
  { name: 'Desi Arnaz', photo: '' },
  { name: 'Kim Danger', photo: '' },
  { name: 'Apple Coldplay', photo: '' },
  { name: 'Moses Bean', photo: '' },
  { name: 'Bethany Culver', photo: '' },
  { name: 'Robert Bob', photo: '' },
];

maxTeamMembers = 12;
panelOpenState = false;

constructor(private dialog: MatDialog) {}

getMemberPhoto(member: member): string {
  return member.photo || this.defaultPhoto;
}

openDialog(): void {
  const dialogRef = this.dialog.open(MemberDialogComponent, {
    width: '35rem',
    data: {}
  });

  dialogRef.afterClosed().subscribe(result => {
    // This is where the dialog close event is handled.
  });
}

  addTeamMember(): void {
    if (this.members.length < this.maxTeamMembers) {
      this.members.push({ name: 'New Member', photo: '' });
      console.log('New team member added.');
    } else {
      console.log('Cannot add more team members. Maximum limit reached.');}
  }

  removeTeamMember(index: number): void {
    this.members.splice(index, 1);
    console.log('Team member removed.');
  }
}

interface member {
  photo: string | null;
  name: string;
}
