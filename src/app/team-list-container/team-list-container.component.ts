import { Component, OnInit } from '@angular/core';
import { TeamDialogComponent } from '../modals/team-dialog-modal/team-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-team-list-container',
  templateUrl: './team-list-container.component.html',
  styleUrls: ['./team-list-container.component.scss'],
})
export class TeamListContainerComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  addTeam() {}

  openTeamDialog(): void {
    const dialogRef = this.dialog.open(TeamDialogComponent, {
      width: '800px',
      height: '270px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // You can get your data back from the dialog here
    });
  }
}
