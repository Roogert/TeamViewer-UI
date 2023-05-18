import { Component, OnInit } from '@angular/core';
import { TeamService } from 'src/app/services/team.service';
import { Team } from 'src/app/models/team.model';
@Component({
  selector: 'app-team-expansion-panel',
  templateUrl: './team-expansion-panel.component.html',
  styleUrls: ['./team-expansion-panel.component.scss'],
})
export class TeamExpansionPanelComponent implements OnInit {
  teams: Team[] = [];

  constructor(private team: TeamService) {}

  ngOnInit(): void {
    this.showTeams();
  }

  showTeams() {
    this.team.getAllTeams().subscribe((teams) => {
      console.log(teams);
      this.teams = teams;
    });
  }
}
