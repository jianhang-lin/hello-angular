import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardService } from '../core/auth-guard.service';
import { TodoComponent } from './todo.component';

export const routes: Routes = [
  {path: 'todo/:filter', canActivate: [AuthGuardService], component: TodoComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TodoRoutingModule { }
