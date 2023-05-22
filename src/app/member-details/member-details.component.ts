import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../models/member.model';

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.scss']
})

export class MemberDetailsComponent implements OnInit {
  @Input() member: Member | null = null;


  ngOnInit(): void {
  }

}
