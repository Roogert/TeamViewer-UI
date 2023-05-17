import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TeamService } from 'src/app/services/team.service';
@Component({
  selector: 'app-team-dialog',
  templateUrl: './team-dialog.component.html',
  styleUrls: ['./team-dialog.component.scss'],
})
export class TeamDialogComponent {
  constructor(public dialog: MatDialog, private team: TeamService) {}
  openDialog() {
    this.dialog.open(TeamDialogComponent);
  }
}
