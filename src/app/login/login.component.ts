import { Component, Inject, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Auth, Image } from '../domain/entities';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
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
  constructor(@Inject('auth') private authService,
              @Inject('bing') private bingService,
              private router: Router) {
    this.bingService.getImageUrl().subscribe((images: Image[]) => {
      this.slides = [...images];
      this.rotateImages(this.slides);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
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
}
