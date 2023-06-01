import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TeamService } from 'src/app/services/team.service';

@Component({
  selector: 'app-edit-team-dialog-modal',
  templateUrl: './edit-team-dialog-modal.component.html',
  styleUrls: ['./edit-team-dialog-modal.component.scss'],
})
export class EditTeamDialogModalComponent {
  teamForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  teamFormInvalid = false;

  constructor(
    private teamService: TeamService,
    public dialogRef: MatDialogRef<EditTeamDialogModalComponent>,
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
        location.reload();
      });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
