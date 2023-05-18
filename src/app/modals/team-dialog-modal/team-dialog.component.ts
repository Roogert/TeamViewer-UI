import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-dialog',
  templateUrl: './team-dialog.component.html',
  styleUrls: ['./team-dialog.component.scss'],
})
export class TeamDialogComponent {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private teamService: TeamService,
    public dialogRef: MatDialogRef<TeamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
    });
  }

  save() {
    if (this.form.valid) {
      this.teamService.createTeam(this.form.value).subscribe(() => {
        this.dialogRef.close();
      });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
