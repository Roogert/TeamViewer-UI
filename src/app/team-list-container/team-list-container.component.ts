import { Component, OnInit } from '@angular/core';
import { TeamDialogComponent } from '../modals/team-dialog-modal/team-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Member } from '../models/member.model';
import { Team } from '../models/team.model';

@Component({
  selector: 'app-team-list-container',
  templateUrl: './team-list-container.component.html',
  styleUrls: ['./team-list-container.component.scss'],
})
export class TeamListContainerComponent implements OnInit {
  isExpanded: boolean = false;

  selectedTeam: Team = {} as Team;
  selectedMembers: Member[] = [];
  isMemberSelected: boolean = false;
  selectedMember: Member = {} as Member;



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

  handleExpanded(isExpanded: boolean) {
    this.isExpanded = isExpanded;
    console.log(isExpanded);
  }



  handleSelectedTeam(selectedTeam: Team) {
    this.selectedTeam = selectedTeam;
    console.log(selectedTeam);

  }

  handleSelectedMembers(selectedMembers: Member[]) {
    this.selectedMembers = selectedMembers;
    console.log(selectedMembers);
  }

  handleIsMemberSelected(member: Member) {
    this.isMemberSelected = member !== null;
    this.selectedMember = member;
  }
}
