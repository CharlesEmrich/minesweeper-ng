import { Component } from '@angular/core';
import { Square } from './square.model';
import { Board } from './board.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  masterBoard: Board;
  makeBoard(boardParams) {
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
    //NOTE: This variable is only there to catch infinite loops. Remove from final version.
    var loopCounter = 0;
    while(this.masterBoard.bombs > currentBombs || loopCounter > 10000) {
      var xCoord = Math.floor(Math.random() * (this.masterBoard.width) + 1);
      var yCoord = Math.floor(Math.random() * (this.masterBoard.height) + 1);

      var squareToBomb = this.masterBoard.squares.find((currentSquare: Square) => {
        return currentSquare.y === yCoord && currentSquare.x === xCoord;
      });

      if (squareToBomb.bomb === false) {
        squareToBomb.bomb = true;
        //Add newly-bombed square to board's array of bombed squares.
        this.masterBoard.bombedSquares.push(squareToBomb);
        currentBombs ++;
      }
      loopCounter ++;
      if(loopCounter > 10000) {console.log('Oh no.')}
    }

    //NOTE: Refactor populateAdjacents so that the function loops and the call here doesn't need to.
    this.masterBoard.squares.forEach((square) => { this.masterBoard.populateAdjacents(square)});

    console.log(this.masterBoard);
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
