import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { IndexComponent } from './index.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],

  declarations: [
    IndexComponent,
  ],

  exports: [
    IndexComponent,
  ],
})
export class IndexModule {}
