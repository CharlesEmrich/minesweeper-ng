import { Component, Input, OnInit } from '@angular/core';
import { Square } from './../square.model';
import { Board } from './../board.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() childBoard: Board;

  constructor() { }

  ngOnInit() {
  }

  clickSquare(square: Square) {
    if(!square.flag) {
      console.log(square);
    }
  }

  markBomb(square: Square): boolean {
    //Mark Guess
    square.flag = !square.flag;

    console.log(square);
    return false;
  }


}
