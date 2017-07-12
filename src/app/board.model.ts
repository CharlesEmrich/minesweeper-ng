import {Square} from './square.model';

export class Board {
  squares: Square[] = [];
  constructor(public height: number, public width: number, public bombs: number) {}

  populateAdjacents(square: Square) {
    var possibleAdjacentCoords = [[square.x - 1, square.y],
                                  [square.x + 1, square.y],
                                  [square.x, square.y - 1],
                                  [square.x, square.y + 1],
                                  [square.x - 1, square.y - 1],
                                  [square.x - 1, square.y + 1],
                                  [square.x + 1, square.y + 1],
                                  [square.x + 1, square.y - 1]]
                                  .filter((arr) => {
                                    return arr[0] > 0 && arr[1] > 0
                                        && arr[0] <= this.width
                                        && arr[1] <= this.height;
                                  });
    square.adjacents = this.squares.filter((currSquare) => {
      possibleAdjacentCoords.forEach((coordPair) => {
        return currSquare.x === coordPair[0] && currSquare.y === coordPair[1];
      });
    });
  }
}

//NOTE: Assumes four, not 8 possible adjacents.
// var width = 5,
//     height = 5;
// function isSquareOnGrid(square) {
//     var x = square[0],
//         y = square[1];
//     return x >= 1 && x <= width && y >= 1 && y <= height;
// }
// function getAdjacents(square) {
//     var x = square[0],
//         y = square[1],
//         adjacents = [[x-1,y],[x+1,y],[x,y+1],[x,y-1]];
//     return adjacents.filter(isSquareOnGrid);
// }
