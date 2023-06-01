import { MemberService } from './../services/member.service';
import { Component, Input, OnDestroy } from '@angular/core';
import { Member } from '../models/member.model';
import { Team } from '../models/team.model';
import { takeUntil } from 'rxjs';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { TeamService } from '../services/team.service';
import { EditMemberDialogComponent } from '../modals/edit-member-dialog/edit-member-dialog.component';
import { ConfirmMemberDialogComponent } from '../modals/edit-member-dialog/confirm-member-dialog/confirm-member-dialog';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss'],
})
export class MemberDetailsComponent implements OnDestroy {
  @Input() member: Member = {} as Member;
  @Input() selectedTeam: Team | null = null;
  @Input() teams: Team[] | null = null;

  isMemberSelected: boolean = false;
  selectedMembers: Member[] = [];
  selectedMember: Member = {} as Member;

  private unsubscribe$ = new Subject<void>();

  constructor(
    public dialog: MatDialog,
    private memberService: MemberService,
    private teamService: TeamService
  ) {}

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  editMemberDialog(member: Member) {
    const dialogRef = this.dialog.open(EditMemberDialogComponent, {
      width: '35rem',
      data: { member: member, teams: this.teams },
    });
    console.log(this.member);

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);
        // Perform some action if the dialog was closed after clicking "Confirm"
        this.memberService
          .updateMember(result, this.member.id!)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(
            (response) => {
              console.log('Member edited successfully', response);
              location.reload();
            },
            (error) => {
              console.log('Failed to edit Member', error);
            }
          );
      }
    });
  }

  archiveMember(member: Member) {
    const dialogRef = this.dialog.open(ConfirmMemberDialogComponent, {
      data: { memberName: member.first_name },
    });

    // handle the dialog result
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // if the result is true, delete the member
        this.memberService
          .deleteMember(this.member.id!)
          .pipe(takeUntil(this.unsubscribe$))
          .subscribe(
            (response) => {
              console.log('Member deleted successfully', response);
              location.reload();
            },
            (error) => {
              console.log('Failed to delete member', error);
            }
          );
      }
    });
  }
}
