import { Component, Input, Output, OnInit, EventEmitter } from '@angular/core';
import { Square } from './../square.model';
import { Board } from './../board.model';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css']
})
export class BoardComponent implements OnInit {
  @Input() childBoard: Board;
  @Output() winSender = new EventEmitter();
  @Output() lossSender = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  clickSquare(square: Square) {
    if(!square.flagged) {
      square.clicked = true;
      //Lose game if bombed
      if(square.bombed) {
        this.lossSender.emit(false);
        //NOTE: Call a gameLoss function which reveals all bombs, highlights your losing square, and turns off clicking forever and always amen.
        this.endGame();
        console.error('You lost the game.');
      } else {
        //Display adjacentBombs and change style (bg)
        //Cascade left click into empty squares.
        if(square.adjacentBombs === 0) {
          square.adjacents.forEach((adjSquare) => {
            if(!adjSquare.clicked) {
              this.clickSquare(adjSquare);
            }
          });
        }
        //Check for Win
        if(this.childBoard.checkForWin()) {
          this.winSender.emit(true);
          this.endGame();
        }
      }
    }
  }

  markBomb(square: Square): boolean {
    if(!square.clicked) {
      //Mark guess
      square.flagged = !square.flagged;
      //Check for Win
      if(this.childBoard.checkForWin()) {
        this.winSender.emit(true);
        this.endGame();
      }
    }
    return false;
  }

  endGame() {
    this.childBoard.gameOver = true;
  }
}
