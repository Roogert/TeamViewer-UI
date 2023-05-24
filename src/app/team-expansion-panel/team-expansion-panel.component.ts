import {
  Component,
  OnInit,
  ChangeDetectorRef,
  EventEmitter,
  Output,
} from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/models/team.model';
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

  @Output() isExpanded: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() selectedTeam: EventEmitter<Team> = new EventEmitter<Team>();
  @Output() selectedMembers: EventEmitter<Member[]> = new EventEmitter<
    Member[]
  >();

  defaultPhoto: string = '/assets/images/avatar.png';

  maxTeamMembers = 12;
  panelOpenState = false;

  constructor(
    private memberService: MemberService,
    private dialog: MatDialog,
    private teamService: TeamService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.teamService.getAllTeams().subscribe((teams) => (this.teams = teams));
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

  addTeamMember(): void {
    if (this.members.length < this.maxTeamMembers) {
      console.log('New team member added.');
    } else {
      console.log('Cannot add more team members. Maximum limit reached.');
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
    console.log('close');
  }
}

interface Member {
  first_name: string;
  last_name: string;
  job_title: string;
  team_id: number;
}
