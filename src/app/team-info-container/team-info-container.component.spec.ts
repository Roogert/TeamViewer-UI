import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamInfoContainerComponent } from './team-info-container.component';

describe('TeamInfoContainerComponent', () => {
  let component: TeamInfoContainerComponent;
  let fixture: ComponentFixture<TeamInfoContainerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TeamInfoContainerComponent]
    });
    fixture = TestBed.createComponent(TeamInfoContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
