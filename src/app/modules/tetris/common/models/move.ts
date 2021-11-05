import { IPiece } from './../interfaces/piece.json-interface';

export class Move {
  constructor(
    public key: number,
    public piece: (p: IPiece) => IPiece,
  ) {}
}
