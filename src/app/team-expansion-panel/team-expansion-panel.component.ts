import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-team-expansion-panel',
  templateUrl: './team-expansion-panel.component.html',
  styleUrls: ['./team-expansion-panel.component.scss']
})
export class TeamExpansionPanelComponent {
@Output() isExpanded:EventEmitter<boolean> = new EventEmitter<boolean>();

  list: string[]=
  ["Red Jaguars",
  "Blue Barracudas",
  "Green Monkeys",
  "Orange Iguanas",
  "Purple Parrots",
  "Silver Snakes"];

expandedPanel(){
  this.isExpanded.emit(true);
  console.log("works")
}

closeExpanded(){
console.log("close");
}

}
