import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTeamDialogModalComponent } from './edit-team-dialog-modal.component';

describe('EditTeamDialogModalComponent', () => {
  let component: EditTeamDialogModalComponent;
  let fixture: ComponentFixture<EditTeamDialogModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTeamDialogModalComponent]
    });
    fixture = TestBed.createComponent(EditTeamDialogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
