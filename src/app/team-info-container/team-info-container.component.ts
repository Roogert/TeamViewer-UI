import { Component, Input, OnDestroy } from '@angular/core';
import { Member } from '../models/member.model';
import { Team } from '../models/team.model';
import { TeamService } from '../services/team.service';
import { Subject } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-team-info-container',
  templateUrl: './team-info-container.component.html',
  styleUrls: ['./team-info-container.component.scss'],
})
export class TeamInfoContainerComponent implements OnDestroy {
  @Input() selectedTeam: Team = {} as Team;
  @Input() members: Member[] = [];

  selectedMember: Member = {} as Member;
  private unsubscribe$ = new Subject<void>();

  constructor(private teamService: TeamService, private dialog: MatDialog) {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  openMemberDetails(member: Member) {
    this.selectedMember = member;
  }
}

/* Changed the way I do my Mat Dialog refrences here to try and see if it works TODO: KEEP Or DELETE??


This code introduces the takeUntil operator, which completes the subscription when unsubscribe$ emits a value. This happens in ngOnDestroy, which is called when the component is destroyed.

Now, when you call archiveTeamDialog, it should call the deleteTeam service method with the id of the team to be deleted. You should also see the console log message with the server response when a team is deleted, or an error message if the deletion fails ~Mike Notes TODO:REMOVE THIS */
