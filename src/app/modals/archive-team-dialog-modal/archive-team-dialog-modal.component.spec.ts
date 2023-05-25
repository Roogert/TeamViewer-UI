import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchiveTeamDialogModalComponent } from './archive-team-dialog-modal.component';

describe('ArchiveTeamDialogModalComponent', () => {
  let component: ArchiveTeamDialogModalComponent;
  let fixture: ComponentFixture<ArchiveTeamDialogModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ArchiveTeamDialogModalComponent]
    });
    fixture = TestBed.createComponent(ArchiveTeamDialogModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
