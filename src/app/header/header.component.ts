import { Component, OnInit } from '@angular/core';
import { SignInModalComponent } from '../modals/sign-in-modal/sign-in-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(
    public dialog: MatDialog,
    public authService: AuthServiceService
  ) {}

  ngOnInit(): void {}

  //modal functions
  openDialog(): void {
    const dialogRef = this.dialog.open(SignInModalComponent, {
      width: '500px',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // You can get your data back from the dialog here
    });
  }

  confirmSignOut() {
    const confirmed = window.confirm('Are you sure you want to sign out?');
    if (confirmed) {
      this.authService.logout();
    }
  }
}
