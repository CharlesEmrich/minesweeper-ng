import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  @Output() boardParamSender = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }
  sendBoard(height: string, width: string, bombs: string) {
    //NOTE: Implement data validation to prevent infinite loops caused by bombs >= width * height.
    var objectToEmit = {height: height, width: width, bombs: bombs};
    this.boardParamSender.emit(objectToEmit);
  }
}
