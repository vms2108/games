import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { TetrisModule } from './../../modules/tetris/tetris.module';
import { RouteTetrisComponent } from './route-tetris.component';

@NgModule({
  imports: [
    CommonModule,
    TetrisModule,
  ],
  declarations: [
    RouteTetrisComponent,
  ],
})
export class RouteTetrisModule { }
