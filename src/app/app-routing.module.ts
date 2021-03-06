import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'todo', redirectTo: 'todo/ALL'},
  {path: 'playground', loadChildren: () => import('./playground/playground.module').then(mod => mod.PlaygroundModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
