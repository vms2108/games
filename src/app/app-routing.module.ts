import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'tetris',
    loadChildren: () => import('./route-modules/tetris/route-tetris.routing.module').then(m => m.RouteTetrisRoutingModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
