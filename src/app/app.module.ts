import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MdlModule } from '@angular-mdl/core';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { TodoModule } from './todo/todo.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MdlModule,
    AppRoutingModule,
    CoreModule,
    TodoModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
