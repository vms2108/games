import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BoardService } from './common/services/board.service';
import { TetrisBoardComponent } from './tetris-board/tetris-board.component';
import { TetrisComponent } from './tetris.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    TetrisComponent,
    TetrisBoardComponent,
  ],
  providers: [
    BoardService,
  ],
  exports: [
    TetrisComponent,
  ],
})
export class TetrisModule { }
