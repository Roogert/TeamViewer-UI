import { Component } from '@angular/core';

@Component({
  selector: 'app-team-expansion-panel',
  templateUrl: './team-expansion-panel.component.html',
  styleUrls: ['./team-expansion-panel.component.scss'],
})
export class TeamExpansionPanelComponent {
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
    { name: 'Devin Gamestop', photo: '/assets/images/pexels-dominika-roseclay-977878.jpg' },
    { name: 'Aosu Yakoma', photo: '/assets/images/pexels-fauxels-3183198.jpg' },
    { name: 'Tammy Panel', photo: '/assets/images/pexels-igor-haritanovich-1695052.jpg' },
    { name: 'Jane Smith', photo: '/assets/images/pexels-moose-photos-1037992.jpg' },
    { name: 'Lucille Ball', photo: '/assets/images/pexels-philippe-donn-1114690.jpg' },
    { name: 'Desi Arnaz', photo: '/assets/images/pexels-pixabay-259915.jpg' },
    { name: 'Kim Danger', photo: '/assets/images/pexels-pixabay-461940.jpg' },
    { name: 'Apple Coldplay', photo: '/assets/images/pexels-polina-tankilevitch-4110008.jpg' },
    { name: 'Moses Bean', photo: '/assets/images/pexels-scott-webb-28080.jpg' },
    { name: 'Bethany Culver', photo: '/assets/images/pexels-simon-berger-1323550.jpg' },
    { name: 'Robert Bob', photo: '/assets/images/pexels-tan-danh-1329711.jpg' },
    // Add more member objects here
  ];
  getMemberPhoto(member: member): string {
    return member.photo || this.defaultPhoto;
  }
}

interface member {
  photo: string | null;
  name: string;
}
