import { Square } from './square.model';

export class Board {
  squares: Square[] = [];
  bombedSquares: Square[] = [];
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
    this.squares.forEach((currSquare) => {
      possibleAdjacentCoords.forEach((coordPair) => {
        if(currSquare.x === coordPair[0] && currSquare.y === coordPair[1]) {
          square.adjacents.push(currSquare);
        }
      });
    });

    square.adjacents.forEach((currentSquare) => {
      if (currentSquare.bomb) {
        square.adjacentBombs ++;
      }
    });
  }
}
