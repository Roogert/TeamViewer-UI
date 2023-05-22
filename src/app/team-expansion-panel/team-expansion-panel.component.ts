import { Component, OnInit, ChangeDetectorRef, EventEmitter, Output } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/models/team.model';
import { MatDialog } from '@angular/material/dialog';
import { MemberDialogComponent } from '../modals/member-dialog/member-dialog.component';
import { Member } from '../models/member.model';

@Component({
  selector: 'app-team-expansion-panel',
  templateUrl: './team-expansion-panel.component.html',
  styleUrls: ['./team-expansion-panel.component.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class TeamExpansionPanelComponent implements OnInit {
  teams: Team[] = [];
  selectedMember: Member | null = null;

  @Output() isExpanded:EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() selectedTeamName:EventEmitter<string> =new EventEmitter<string>();
  @Output() selectedMembers:EventEmitter<Member[]> =new EventEmitter<Member[]>();
  @Output() memberSelected:EventEmitter<Member> = new EventEmitter<Member>();

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

  members1: Member[] = [
    { first_name: 'James', last_name: 'smith', title: 'software engineer'},
    { first_name: 'Devin', last_name: 'smith', title: 'software engineer'},
    { first_name: 'Aosu', last_name: 'smith', title: 'software engineer'},
    { first_name: 'Tammy', last_name: 'smith', title: 'software engineer'},
    { first_name: 'Jane', last_name: 'smith', title: 'software engineer'},
    { first_name: 'Lucille', last_name: 'smith', title: 'software engineer'},
    { first_name: 'Desi', last_name: 'smith', title: 'software engineer'},
    { first_name: 'Kim', last_name: 'smith', title: 'software engineer'},
    { first_name: 'Apple', last_name: 'smith', title: 'software engineer'},
    { first_name: 'Moses', last_name: 'smith', title: 'software engineer'},
    { first_name: 'Bethany', last_name: 'smith', title: 'software engineer'},
    { first_name: 'Robert', last_name: 'smith', title: 'software engineer'},
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

  getMemberPhoto(member: Member): string {
    return this.defaultPhoto;
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

  openMemberDetails(member: Member) {
    this.selectedMember = member;
    this.memberSelected.emit(member);
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

  expandedPanel(team:any){
    this.isExpanded.emit(true);
    this.selectedTeamName.emit(team.name);
    this.selectedMembers.emit(this.members1);
  }

  closeExpanded(){
    this.isExpanded.emit(false);
  }

}

interface member {
  photo: string | null;
  name: string;
}
