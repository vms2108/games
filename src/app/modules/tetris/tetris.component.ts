import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-tetris',
  templateUrl: './tetris.component.html',
  styleUrls: ['./tetris.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TetrisComponent {

}
