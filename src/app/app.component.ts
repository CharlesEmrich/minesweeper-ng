import { Component } from '@angular/core';
import { Square } from './square.model';
import { Board } from './board.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  gameState: boolean = null;
  masterBoard: Board;
  boardDrawn: boolean = false;

  makeBoard(boardParams) {
    //Reset Win/Loss
    this.gameState = null;
    //Instantiate a new Board object.
    this.masterBoard = new Board(parseInt(boardParams.height), parseInt(boardParams.width), parseInt(boardParams.bombs));

    //Generate squares for the Board.
    for (var i = 0; i < this.masterBoard.height; i++) {
      for (var ii = 0; ii < this.masterBoard.width; ii++) {
        this.masterBoard.squares.push(new Square(ii + 1, i + 1));
      }
    }

    //Place bombs on randomly picked squares.
    var currentBombs = 0;
    while(this.masterBoard.bombs > currentBombs) {
      var xCoord = Math.floor(Math.random() * (this.masterBoard.width) + 1);
      var yCoord = Math.floor(Math.random() * (this.masterBoard.height) + 1);

      var squareToBomb = this.masterBoard.squares.find((currentSquare: Square) => {
        return currentSquare.y === yCoord && currentSquare.x === xCoord;
      });

      if (squareToBomb.bombed === false) {
        squareToBomb.bombed = true;
        //Add newly-bombed square to board's array of bombed squares.
        this.masterBoard.bombedSquares.push(squareToBomb);
        currentBombs ++;
      }
    }

    //NOTE: Refactor populateAdjacents so that the function loops and the call here doesn't need to.
    this.masterBoard.squares.forEach((square) => {
      this.masterBoard.populateAdjacents(square);
      if (!square.bombed) {
        this.masterBoard.unbombedSquares.push(square);
      }
    });

    console.log(this.masterBoard);
    this.boardDrawn = true;
  }

  checkForBoard() {
    if (this.boardDrawn === true) {
      return 'board-drawn';
    } else {
      return '';
    }
  }
}
