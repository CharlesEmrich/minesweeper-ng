import { Component, Output, EventEmitter, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  @Output() boardParamSender = new EventEmitter();
  @Input() childBoardDrawn: boolean;

  constructor() { }

  ngOnInit() {
  }
  sendBoard(height: number, width: number, bombs: number) {
    if (bombs > (height * width)) {
        bombs = height * width;
    }
    var objectToEmit = {height: height, width: width, bombs: bombs};
    this.boardParamSender.emit(objectToEmit);
  }
}
