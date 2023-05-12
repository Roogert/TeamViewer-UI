import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-list-container',
  templateUrl: './team-list-container.component.html',
  styleUrls: ['./team-list-container.component.scss']
})
export class TeamListContainerComponent implements OnInit {
isExpanded:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

  handleExpanded(isExpanded:boolean){
    this.isExpanded=isExpanded;
  }

  
}
