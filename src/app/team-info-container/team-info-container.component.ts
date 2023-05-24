import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../models/member.model';
import { Team } from '../models/team.model';

@Component({
  selector: 'app-team-info-container',
  templateUrl: './team-info-container.component.html',
  styleUrls: ['./team-info-container.component.scss'],
})
export class TeamInfoContainerComponent implements OnInit {
  @Input() selectedTeam: Team = {} as Team;
  @Input() members: Member[] = [];

  ngOnInit(): void {}
}
