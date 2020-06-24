import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MdlModule } from '@angular-mdl/core';
import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { LoginModule } from './login/login.module';
import { TodoModule } from './todo/todo.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MdlModule,
    AppRoutingModule,
    CoreModule,
    LoginModule,
    TodoModule,
  ],
  providers: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
