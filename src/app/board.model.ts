import {Square} from './square.model';

export class Board {
  squares: Square[] = [];
  constructor(public height: number, public width: number, public bombs: number) {}
}
