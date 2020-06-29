import { Component, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Auth, Image } from '../domain/entities';
import { MdlDialogReference, MdlDialogService } from '@angular-mdl/core';
import { RegisterDialogComponent } from './register-dialog/register-dialog.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('loginState', [
      state('inactive', style({transform: 'scale(1)'})),
      state('active', style({transform: 'scale(1.1)'})),
      transition('inactive => active', animate('100ms ease-in')),
      transition('active => inactive', animate('100ms ease-out')),
    ])
  ]
})
export class LoginComponent implements OnDestroy {

  username = '请输入用户名';
  password = '请输入密码';
  defaultUsernameColor = true;
  defaultPasswordColor = true;
  auth: Auth;
  slides: Image[] = [];
  photo = '/assets/login_default_bg.jpg';
  subscription: Subscription;
  loginBtnState = 'inactive';
  constructor(@Inject('auth') private authService,
              @Inject('bing') private bingService,
              private dialogService: MdlDialogService,
              private router: Router) {
    this.bingService.getImageUrl().subscribe((images: Image[]) => {
      this.slides = [...images];
      this.rotateImages(this.slides);
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  onSubmit() {
    this.authService
      .loginWithCredentials(this.username, this.password)
      .subscribe(auth => {
        this.auth = Object.assign({}, auth);
        // const redirectUrl = (auth.redirectUrl === null) ? '/' : auth.redirectUrl;
        if (!auth.hasError) {
          this.router.navigate(['todo']);
        }
      }
    );
  }

  clearUsername() {
    this.username = '';
    this.defaultUsernameColor = false;
  }

  clearPassword() {
    this.password = '';
    this.defaultPasswordColor = false;
  }

  rotateImages(arr: Image[]) {
    const length = arr.length;
    let i = 0;
    setInterval(() => {
      i = (i + 1) % length;
      this.photo = this.slides[i].contentUrl;
    }, 4000);
  }

  toggleLoginState(btnState: boolean) {
    this.loginBtnState = btnState ? 'active' : 'inactive';
  }

  register($event: MouseEvent) {
    const pDialog = this.dialogService.showCustomDialog({
      component: RegisterDialogComponent,
      isModal: true,
      styles: {width: '350px'},
      clickOutsideToClose: true,
      enterTransitionDuration: 400,
      leaveTransitionDuration: 400
    });
    pDialog.pipe(map((dialogReference: MdlDialogReference) => {
      console.log('dialog visible', dialogReference);
    }));
  }
}
