import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Team } from 'src/app/models/team.model';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-member-dialog',
  templateUrl: './member-dialog.component.html',
  styleUrls: ['./member-dialog.component.scss'],
})
export class MemberDialogComponent implements OnInit {
  memberForm: FormGroup = new FormGroup({
    first_name: new FormControl('', [Validators.required]),
    last_name: new FormControl('', [Validators.required]),
    title: new FormControl('', [Validators.required]),
    team: new FormControl('', [Validators.required]),
  });

  teams: Team[] = [];

  constructor(
    private memberService: MemberService,
    public dialogRef: MatDialogRef<MemberDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.teams = this.data.teams;
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  saveDialog(): void {
    if (this.memberForm.valid) {
      const member = {
        first_name: this.memberForm.get('first_name')?.value,
        last_name: this.memberForm.get('last_name')?.value,
        job_title: this.memberForm.get('title')?.value,
        team_id: this.memberForm.get('team')?.value.id,
      };

      this.memberService.createMember(member).subscribe(
        () => {
          location.reload();
          console.log(member);
          this.dialogRef.close();
        },
        (error) => {
          // Handle error during member creation
          console.error('Error creating member:', error);
        }
      );
    }
  }
}
