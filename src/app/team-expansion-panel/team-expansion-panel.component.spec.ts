import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamExpansionPanelComponent } from './team-expansion-panel.component';

describe('TeamExpansionPanelComponent', () => {
  let component: TeamExpansionPanelComponent;
  let fixture: ComponentFixture<TeamExpansionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeamExpansionPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
