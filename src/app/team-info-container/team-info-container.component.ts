import { Component, Input } from '@angular/core';
import { Member } from '../models/member.model';
import { Team } from '../models/team.model';

@Component({
  selector: 'app-team-info-container',
  templateUrl: './team-info-container.component.html',
  styleUrls: ['./team-info-container.component.scss'],
})

export class TeamInfoContainerComponent {
 @Input() selectedTeam: Team = {} as Team;
 @Input() members: Member[] = [];
  
selectedMember: Member | null;



openMemberDetails(member: Member) {
  this.selectedMember = member;
}


 



}
