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
    if(!square.flagged) {
      //Lose game if bombed
      if(square.bombed) {
        //NOTE: Call a gameLoss function which reveals all bombs, highlights your losing square, and turns off clicking forever and always amen.
        console.error('You lost the game.');
      } else {
        //Display adjacentBombs and change style (bg)
        square.clicked = true;
        //Cascade left click into empty squares.
        if(square.adjacentBombs === 0) {
          square.adjacents.forEach((adjSquare) => {
            if(!adjSquare.clicked) {
              this.clickSquare(adjSquare);
            }
          });
        }
        //Check for Win
        console.log(this.childBoard.checkForWin());
        this.childBoard.checkForWin();
      }
      // console.log(square);
    }
  }

  markBomb(square: Square): boolean {
    if(!square.clicked) {
      //Mark guess
      square.flagged = !square.flagged;
      //Check for Win
      console.log(this.childBoard.checkForWin());
      this.childBoard.checkForWin();
      // console.log(square);
    }
    return false;
  }
}
