import { Component, OnInit, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/models/team.model';
import { MatDialog } from '@angular/material/dialog';
import { MemberDialogComponent } from '../modals/member-dialog/member-dialog.component';

@Component({
  selector: 'app-team-expansion-panel',
  templateUrl: './team-expansion-panel.component.html',
  styleUrls: ['./team-expansion-panel.component.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class TeamExpansionPanelComponent implements OnInit {
  teams: Team[] = [];

  @Output() isExpanded:EventEmitter<boolean> = new EventEmitter<boolean>();

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
  defaultPhoto: string = '/assets/images/avatar.png';

  maxTeamMembers = 12;
  panelOpenState = false;
  constructor(
    private dialog: MatDialog,
    private teamService: TeamService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.showTeams();
  }

  showTeams() {
    this.teamService.getAllTeams().subscribe((teams) => {
      console.log(teams);
      this.teams = teams;
      this.changeDetectorRef.detectChanges();
    });
  }

  getMemberPhoto(member: member): string {
    return member.photo || this.defaultPhoto;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MemberDialogComponent, {
      width: '35rem',
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      // This is where the dialog close event is handled.
    });
  }

  addTeamMember(): void {
    if (this.members.length < this.maxTeamMembers) {
      this.members.push({ name: 'New Member', photo: '' });
      console.log('New team member added.');
    } else {
      console.log('Cannot add more team members. Maximum limit reached.');
    }
  }

  removeTeamMember(index: number): void {
    this.members.splice(index, 1);
    console.log('Team member removed.');
  }

  expandedPanel(){
    this.isExpanded.emit(true);
    console.log("works")
  }

  closeExpanded(){
  console.log("close");
  }

}


interface member {
  photo: string | null;
  name: string;
}
