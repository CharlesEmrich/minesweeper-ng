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
    this.masterBoard = new Board(boardParams.height, boardParams.width, boardParams.bombs);

    for (var i = 0; i < this.masterBoard.height; i++) {
      for (var ii = 0; ii < this.masterBoard.width; ii++) {
        this.masterBoard.squares.push(new Square(ii + 1, i + 1));
      }
    }

    var currentBombs = 0;
    while(this.masterBoard.bombs > currentBombs) {
      var xCoord = Math.floor(Math.random() * (this.masterBoard.width - 1));
      var yCoord = Math.floor(Math.random() * (this.masterBoard.height - 1));

      var squareToBomb = this.masterBoard.squares.find((currentSquare: Square) => {
        return currentSquare.y === yCoord && currentSquare.x === xCoord;
      });

      if (squareToBomb.bomb === false) {
        squareToBomb.bomb = true;
        currentBombs ++;
      }
    }

    this.masterBoard.squares.forEach((square) => { this.masterBoard.populateAdjacents(square)});
    console.log(this.masterBoard);
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
}
