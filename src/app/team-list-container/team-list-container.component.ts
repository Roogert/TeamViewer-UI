import { TeamService } from 'src/app/services/team.service';
import { Component, OnDestroy, Input } from '@angular/core';
import { TeamDialogComponent } from '../modals/team-dialog-modal/team-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Member } from '../models/member.model';
import { Team } from '../models/team.model';
import { takeUntil } from 'rxjs';
import { Subject } from 'rxjs';
import { ConfirmDialogComponent } from '../modals/archive-team-dialog-modal/confirm-dialog/confirm-dialog.component';
import { EditDialogComponent } from '../modals/edit-team-dialog-modal/edit-dialog/edit-dialog.component';
@Component({
  selector: 'app-team-list-container',
  templateUrl: './team-list-container.component.html',
  styleUrls: ['./team-list-container.component.scss'],
})
export class TeamListContainerComponent implements OnDestroy {
  isExpanded: boolean = false;
  allTeams: Team[] = [];
  selectedTeam: Team = {} as Team;
  selectedMembers: Member[] = [];
  isMemberSelected: boolean = false;
  selectedMember: Member = {} as Member;

  private unsubscribe$ = new Subject<void>();

  constructor(public dialog: MatDialog, private teamService: TeamService) {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  editTeamDialog(team: Team) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '800px',
      height: '270px',
      data: { team: team },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.teamService
          .updateTeam(result)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(
            (response) => {
              console.log('Team edited successfully', response);
              location.reload();
            },
            (error) => {
              console.log('Failed to edit team', error);
            }
          );
      }
    });
  }
  openTeamDialog(): void {
    const dialogRef = this.dialog.open(TeamDialogComponent, {
      width: '800px',
      height: '270px',
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  archiveTeamDialog(team: Team) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: { teamName: team.name },
    });

    // handle the dialog result
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // if the result is true, delete the team
        this.teamService
          .deleteTeam(team.id)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(
            (response) => {
              console.log('Team deleted successfully', response);
              location.reload();
            },
            (error) => {
              console.log('Failed to delete team', error);
            }
          );
      }
    });
  }

  handleExpanded(isExpanded: boolean) {
    this.isExpanded = isExpanded;

    if (!isExpanded) {
      // panel is collapsing
      this.isMemberSelected = false;
      this.selectedMember = {} as Member;
      this.selectedTeam = {} as Team;
    }
  }
  handleAllTeams(teams: Team[]) {
    this.allTeams = teams;
  }
  handleSelectedTeam(selectedTeam: Team) {
    this.selectedTeam = selectedTeam;
  }

  handleSelectedMembers(selectedMembers: Member[]) {
    this.selectedMembers = selectedMembers;
  }

  handleIsMemberSelected(member: Member) {
    this.isMemberSelected = member !== null;
    this.selectedMember = member;
  }
}
