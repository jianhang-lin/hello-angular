import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { routing } from './todo.routes';
import { TodoComponent } from './todo.component';
import { TodoFooterComponent } from './todo-footer/todo-footer.component';
import { TodoHeaderComponent } from './todo-header/todo-header.component';
import { TodoService } from './todo.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    routing
  ],
  declarations: [
    TodoComponent,
    TodoFooterComponent,
    TodoHeaderComponent
  ],
  providers: [
    {provide: 'todoService', useClass: TodoService}
  ]
})
export class TodoModule {
}