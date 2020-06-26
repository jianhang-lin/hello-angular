import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { BingImageService } from './bing-image.service';

@NgModule({
  declarations: [
    LoginComponent
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
