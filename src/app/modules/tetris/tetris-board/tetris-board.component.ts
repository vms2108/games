import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

import {
  BLOCK_SIZE,
  COLORS,
  COLS,
  KEY,
  LEVELS,
  LINES_PER_LEVEL,
  POINTS,
  ROWS,
} from '../common/constants/tetris-canvas-size';
import { IPiece } from '../common/interfaces/piece.json-interface';
import { Piece } from '../common/models/piece';
import { BoardService } from '../common/services/board.service';

import { Move } from './../common/models/move';

@Component({
  selector: 'app-tetris-board',
  templateUrl: './tetris-board.component.html',
  styleUrls: ['./tetris-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TetrisBoardComponent implements OnInit {

  @ViewChild('board', { static: true })
  public canvas!: ElementRef<HTMLCanvasElement>;

  @ViewChild('next', { static: true })
  public canvasNext!: ElementRef<HTMLCanvasElement>;

  public ctx!: CanvasRenderingContext2D | null;

  public ctxNext!: CanvasRenderingContext2D | null;

  public points!: number;

  public lines!: number;

  public level!: number;

  public board!: number[][];

  public piece!: Piece;

  public next!: Piece;

  public requestId!: number;

  public time!: { start: number; elapsed: number; level: number };

  public moves = [
    new Move(KEY.LEFT, (p: IPiece): IPiece => ({ ...p, x: p.x - 1 })),
    new Move(KEY.RIGHT, (p: IPiece): IPiece => ({ ...p, x: p.x + 1 })),
    new Move(KEY.DOWN, (p: IPiece): IPiece => ({ ...p, y: p.y + 1 })),
    new Move(KEY.SPACE, (p: IPiece): IPiece => ({ ...p, y: p.y + 1 })),
    new Move(KEY.UP, (p: IPiece): IPiece => this.boardService.rotate(p)),
  ];
  constructor(
    private boardService: BoardService,
    private changeDetectorRef: ChangeDetectorRef,
  ) {}

  @HostListener('window:keydown', ['$event'])
  public keyEvent(event: KeyboardEvent): void {
    console.log(event.keyCode);
    if (event.keyCode === KEY.ESC) {
      this.gameOver();
    } else if (this.moves.find(item => item.key === event.keyCode)) {
      event.preventDefault();
      this.doSomethingByCode(event.keyCode);
    }
  }

  public ngOnInit(): void {
    this.initBoard();
    this.initNext();
    this.resetGame();
  }

  public doSomethingByCode(keyCode: number): void {
    let p = this.moves.find(item => item.key === keyCode)!.piece(this.piece);
    if (keyCode === KEY.SPACE) {
      while (this.boardService.valid(p, this.board)) {
        this.points += POINTS.HARD_DROP;
        this.piece.move(p);
        p = this.moves.find(item => item.key === KEY.DOWN)!.piece(this.piece);
      }
    } else if (this.boardService.valid(p, this.board)) {
      this.piece.move(p);
      if (keyCode === KEY.DOWN) {
        this.points += POINTS.SOFT_DROP;
      }
    }
  }

  public initBoard(): void {
    this.ctx = this.canvas.nativeElement.getContext('2d');

    if (this.ctx) {
      this.ctx.canvas.width = COLS * BLOCK_SIZE;
      this.ctx.canvas.height = ROWS * BLOCK_SIZE;
      this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
    }
  }

  public initNext(): void {
    this.ctxNext = this.canvasNext.nativeElement.getContext('2d')!;
    this.ctxNext.canvas.width = 4 * BLOCK_SIZE;
    this.ctxNext.canvas.height = 4 * BLOCK_SIZE;
    this.ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);
  }

  public getEmptyBoard(): number[][] {
    return Array.from({ length: ROWS }, () => Array(COLS).fill(0));
  }

  public play(): void {
    this.resetGame();
    this.next = new Piece(this.ctx!);
    this.piece = new Piece(this.ctx!);
    this.next.drawNext(this.ctxNext!);
    this.time.start = performance.now();

    if (this.requestId) {
      cancelAnimationFrame(this.requestId);
    }

    this.animate();
  }

  public resetGame(): void {
    this.points = 0;
    this.lines = 0;
    this.level = 1;
    this.board = this.getEmptyBoard();
    this.time = { start: 0, elapsed: 0, level: LEVELS.find(item => item.num === this.level)!.speed };
  }

  public animate(now = 0): void {
    this.time.elapsed = now - this.time.start;
    if (this.time.elapsed > this.time.level) {
      this.time.start = now;
      if (!this.drop()) {
        this.gameOver();
        return;
      }
    }
    this.draw();
    this.requestId = requestAnimationFrame(this.animate.bind(this));
  }

  public draw(): void {
    this.ctx!.clearRect(0, 0, this.ctx!.canvas.width, this.ctx!.canvas.height);
    this.piece.draw();
    this.drawBoard();
  }

  public drop(): boolean {
    const p = this.moves.find(item => item.key === KEY.DOWN)!.piece(this.piece);
    if (this.boardService.valid(p, this.board)) {
      this.piece.move(p);
    } else {
      this.freeze();
      this.clearLines();
      if (this.piece.y === 0) {
        // Game over
        return false;
      }
      this.piece = this.next;
      this.next = new Piece(this.ctx!);
      this.next.drawNext(this.ctxNext!);
    }
    return true;
  }

  public clearLines(): void {
    let lines = 0;
    this.board.forEach((row, y) => {
      if (row.every(value => value !== 0)) {
        lines++;
        this.board.splice(y, 1);
        this.board.unshift(Array(COLS).fill(0));
      }
    });
    if (lines > 0) {
      this.points += this.boardService.getLinesClearedPoints(lines, this.level);
      this.lines += lines;
      if (this.lines >= LINES_PER_LEVEL) {
        this.level++;
        this.lines -= LINES_PER_LEVEL;
        this.time.level = LEVELS.find(item => item.num === this.level)!.speed;
      }
      this.changeDetectorRef.markForCheck();
    }
  }

  public freeze(): void {
    this.piece.shape.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.board[y + this.piece.y][x + this.piece.x] = value;
        }
      });
    });
  }

  public drawBoard(): void {
    this.board.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value > 0) {
          this.ctx!.fillStyle = COLORS[value];
          this.ctx!.fillRect(x, y, 1, 1);
        }
      });
    });
  }

  public gameOver(): void {
    cancelAnimationFrame(this.requestId);
    this.ctx!.fillStyle = 'black';
    this.ctx!.fillRect(1, 3, 8, 1.2);
    this.ctx!.font = '1px Arial';
    this.ctx!.fillStyle = 'red';
    this.ctx!.fillText('GAME OVER', 1.8, 4);
  }

}
