import { Component, Input, OnDestroy } from '@angular/core';
import { Member } from '../models/member.model';
import { Team } from '../models/team.model';
import { TeamService } from '../services/team.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../modals/archive-team-dialog-modal/confirm-dialog/confirm-dialog.component';
import { EditDialogComponent } from '../modals/edit-team-dialog-modal/edit-dialog/edit-dialog.component';

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

  editTeamDialog(team: Team) {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '800px',
      height: '270px',
      data: { team: team },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Perform some action if the dialog was closed after clicking "Confirm"
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
}

/* Changed the way I do my Mat Dialog refrences here to try and see if it works TODO: KEEP Or DELETE??


This code introduces the takeUntil operator, which completes the subscription when unsubscribe$ emits a value. This happens in ngOnDestroy, which is called when the component is destroyed.

Now, when you call archiveTeamDialog, it should call the deleteTeam service method with the id of the team to be deleted. You should also see the console log message with the server response when a team is deleted, or an error message if the deletion fails ~Mike Notes TODO:REMOVE THIS */
