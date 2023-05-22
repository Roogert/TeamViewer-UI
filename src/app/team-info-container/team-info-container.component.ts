import { Component, Input } from '@angular/core';
import { Member } from '../models/member.model';

@Component({
  selector: 'app-team-info-container',
  templateUrl: './team-info-container.component.html',
  styleUrls: ['./team-info-container.component.scss']
})
export class TeamInfoContainerComponent {

@Input() selectedTeamName: string;
@Input() members: Member[]
selectedMember: Member | null;

constructor() {
  this.selectedTeamName = 'Team Name';
  this.members = [];
  this.selectedMember = null;
}

openMemberDetails(member: Member) {
  this.selectedMember = member;
}

}
