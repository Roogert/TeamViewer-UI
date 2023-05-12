import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-info-container',
  templateUrl: './team-info-container.component.html',
  styleUrls: ['./team-info-container.component.scss']
})
export class TeamInfoContainerComponent implements OnInit {

@Input() TeamName:string="Red Jaguars";

ngOnInit(): void {

}

}
