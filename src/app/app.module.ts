import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TodoComponent } from './todo/todo.component';
import { TodoFooterComponent } from './todo/todo-footer/todo-footer.component';
import { TodoHeaderComponent } from './todo/todo-header/todo-header.component';
import { AuthService } from './core/auth.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TodoComponent,
    TodoFooterComponent,
    TodoHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    {provide: 'auth', useClass: AuthService}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
