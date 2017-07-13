export class Square {
  adjacents: Square[] = [];
  adjacentBombs: number = 0;
  bomb: boolean = false;
  flag: boolean = false;
  constructor(public x: number, public y: number) {}
}
