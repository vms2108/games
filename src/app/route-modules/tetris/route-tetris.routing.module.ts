import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RouteTetrisComponent } from './route-tetris.component';
import { RouteTetrisModule } from './route-tetris.module';

export const routes: Routes = [
  {
    path: '',
    component: RouteTetrisComponent,
  },
  {
    path: '*',
    redirectTo: '',
  },
];

@NgModule({
  imports: [
    RouteTetrisModule,
    RouterModule.forChild(routes),
  ],
})
export class RouteTetrisRoutingModule {
}
