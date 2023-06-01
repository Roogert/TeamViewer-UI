import {
  Component,
  OnInit,
  ChangeDetectorRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { TeamService } from 'src/app/services/team.service';

import { MatDialog } from '@angular/material/dialog';
import { MemberDialogComponent } from '../modals/member-dialog/member-dialog.component';

import { MemberService } from '../services/member.service';

@Component({
  selector: 'app-team-expansion-panel',
  templateUrl: './team-expansion-panel.component.html',
  styleUrls: ['./team-expansion-panel.component.scss'],
  //encapsulation: ViewEncapsulation.None
})
export class TeamExpansionPanelComponent implements OnInit {
  teams: Team[] = [];
  members: Member[] = [];

  selectedMember: Member | null = null;

  @Output() isExpanded: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() selectedMembers: EventEmitter<Member[]> = new EventEmitter<
    Member[]
  >();
  @Output() allTeams: EventEmitter<Team[]> = new EventEmitter<Team[]>();
  @Output() memberSelected: EventEmitter<Member> = new EventEmitter<Member>();
  @Output() selectedTeam: EventEmitter<Team> = new EventEmitter<Team>();

  defaultPhoto: string = '/assets/images/avatar.png';

  maxTeamMembers = 12;
  showErrorMessage: boolean = false;
  panelOpenState = false;

  constructor(
    private memberService: MemberService,
    private dialog: MatDialog,
    private teamService: TeamService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.teamService
      .getAllTeams()
      .subscribe(
        (teams) => ((this.teams = teams), this.allTeams.next(this.teams))
      );
  }

  getMemberPhoto() {
    return this.defaultPhoto;
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(MemberDialogComponent, {
      width: '35rem',
      data: {
        teams: this.teams,
      },
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
      console.log('New team member added.');
    } else {
      console.log('Cannot add more team members. Maximum limit reached.');
    }
  }

  handleButtonClick(team: Team): void {
    if (team.members.length >= this.maxTeamMembers) {
      team.showErrorMessage = true;
      setTimeout(() => {
        team.showErrorMessage = false;
      }, 2000);
    } else {
      this.openDialog();
    }
  }

  removeTeamMember(index: number): void {
    this.members.splice(index, 1);
    console.log('Team member removed.');
  }

  expandedPanel(team: any) {
    this.isExpanded.emit(true);
    this.selectedTeam.emit(team);
    this.selectedMembers.emit(this.members);
  }

  closeExpanded() {
    this.isExpanded.emit(false);
  }
}

interface Member {
  first_name: string;
  last_name: string;
  job_title: string;
  team_id: number;
}
interface Team {
  id: number;
  name: string;
  description: string;
  members: Member[];
  showErrorMessage: boolean;
}
