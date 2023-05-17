import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
@Component({
  selector: 'app-team-expansion-panel',
  templateUrl: './team-expansion-panel.component.html',
  styleUrls: ['./team-expansion-panel.component.scss'],
})
export class TeamExpansionPanelComponent implements OnInit {
  ngOnInit(): void {
    this.showTeams();
  }
  // TODO: Get Team names from backend
  list: string[] = [];

  constructor(private team: TeamService) {}

  showTeams() {
    return this.team.getAllTeams().subscribe((res) => {
      console.log(res);
      this.list = res;
    });
  }
}
