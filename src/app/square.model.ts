export class Square {
  adjacents: Square[] = [];
  adjacentBombs: number = 0;
  bombed: boolean = false;
  flagged: boolean = false;
  clicked: boolean = false;
  constructor(public x: number, public y: number) {}
}
