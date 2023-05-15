import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-team-expansion-panel',
  templateUrl: './team-expansion-panel.component.html',
  styleUrls: ['./team-expansion-panel.component.scss'],
})
export class TeamExpansionPanelComponent {
@Output() isExpanded:EventEmitter<boolean> = new EventEmitter<boolean>();
  // TODO: Get Team names from backend
  list: string[] = [
    'Red Jaguars',
    'Blue Barracudas',
    'Green Monkeys',
    'Orange Iguanas',
    'Purple Parrots',
    'Silver Snakes',
  ];

  defaultPhoto: string = '/assets/images/avatar.png';

  members: member[] = [
    { name: 'James Halfhill', photo: '' },
    { name: 'Devin Gamestop', photo: '' },
    { name: 'Aosu Yakoma', photo: '' },
    { name: 'Tammy Panel', photo: '' },
    { name: 'Jane Smith', photo: '' },
    { name: 'Lucille Ball', photo: '' },
    { name: 'Desi Arnaz', photo: '' },
    { name: 'Kim Danger', photo: '' },
    { name: 'Apple Coldplay', photo: '' },
    { name: 'Moses Bean', photo: '' },
    { name: 'Bethany Culver', photo: '' },
    { name: 'Robert Bob', photo: '' },
  ];
  getMemberPhoto(member: member): string {
    return member.photo || this.defaultPhoto;
  }

  expandedPanel(){
    this.isExpanded.emit(true);
    console.log("works")
  }

  closeExpanded(){
  console.log("close");
  }

}


interface member {
  photo: string | null;
  name: string;
}
