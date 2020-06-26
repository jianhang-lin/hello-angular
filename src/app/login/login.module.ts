import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { BingImageService } from './bing-image.service';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterDialogComponent
  ],
  imports: [
    SharedModule,
    LoginRoutingModule
  ],
  providers: [
    {
      provide: 'bing', useClass: BingImageService
    }
  ]
})
export class LoginModule { }
