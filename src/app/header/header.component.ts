import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SignInModalComponent } from '../modals/sign-in-modal/sign-in-modal.component';
import { SignUpModalComponent } from '../modals/sign-up-modal/sign-up-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthServiceService } from '../services/auth-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userNotLogged: boolean = true;
  constructor(
    public dialog: MatDialog,
    public authService: AuthServiceService,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.isLoggedIn().subscribe((isLoggedIn) => {
      this.userNotLogged = !isLoggedIn;
      this.changeDetectorRef.detectChanges();
    });
  }

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

  openSignupDialog(): void {
    const dialogRef = this.dialog.open(SignUpModalComponent, {
      width: '500px',
      height: '500px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      // You can get your data back from the dialog here
    });
  }

  closeDialog(): void {
    this.dialog.closeAll;
  }

  confirmSignOut() {
    const confirmed = window.confirm('Are you sure you want to sign out?');
    if (confirmed) {
      this.authService.logout();
    }
  }
}
