import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-game-state',
  templateUrl: './game-state.component.html',
  styleUrls: ['./game-state.component.css']
})
export class GameStateComponent implements OnInit {
  @Input() childGameState: boolean;

  constructor() { }

  ngOnInit() {
  }

}
