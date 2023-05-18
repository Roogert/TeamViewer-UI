import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-team-dialog',
  templateUrl: './team-dialog.component.html',
  styleUrls: ['./team-dialog.component.scss'],
})
export class TeamDialogComponent {
  teamForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  teamFormInvalid = false;

  constructor(
    private teamService: TeamService,
    public dialogRef: MatDialogRef<TeamDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  save() {
    if (this.teamForm.valid) {
      const team = {
        name: this.teamForm.get('name')?.value,
        description: this.teamForm.get('description')?.value,
      };
      this.teamService.createTeam(team).subscribe(() => {
        this.dialogRef.close();
        console.log(team);
      });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
