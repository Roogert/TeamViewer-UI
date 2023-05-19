import { Component, OnInit } from '@angular/core';
import { TeamDialogComponent } from '../modals/team-dialog-modal/team-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Member } from '../models/member.model';

@Component({
  selector: 'app-team-list-container',
  templateUrl: './team-list-container.component.html',
  styleUrls: ['./team-list-container.component.scss'],
})
export class TeamListContainerComponent implements OnInit {

  isExpanded: boolean = false;
  selectedTeamName: string = "";
  selectedMembers: Member[]=[];

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

  handleExpanded(isExpanded:boolean){
    this.isExpanded = isExpanded;
  }

  handleSelectedTeam(selectedTeamName:string){
    this.selectedTeamName = selectedTeamName;
  }

  handleSelectedMembers(selectedMembers: Member[]){
    this.selectedMembers = selectedMembers;
  }

}
