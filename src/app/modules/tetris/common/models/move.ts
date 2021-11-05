import { IPiece } from './../interfaces/piece.json-interface';

export class Move {
  constructor(
    public key: string,
    public piece: (p: IPiece) => IPiece,
  ) {}
}
