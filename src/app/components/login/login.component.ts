import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  private url: string = 'https://dummyjson.com/auth/login';

  constructor(
    private formBuilder: FormBuilder,
    private jwtHelper: JwtHelperService,
    private router: Router,
    private httpClient: HttpClient,
    private alertify: AlertifyService
  ) {}

  loginForm: FormGroup = this.formBuilder.group({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  get username() {
    return this.loginForm.get('username') as FormControl;
  }
  get password() {
    return this.loginForm.get('password') as FormControl;
  }

  /**
   * Авторизует пользователя
   * @param username
   * @param password
   * @returns
   */
  onLogin() {
    let credentials = {
      username: this.username.value,
      password: this.password.value,
    };
    return this.httpClient.post(this.url, credentials).subscribe(
      (res: any) => {
        localStorage.setItem('token', res.token);
        res['interestingJob'] = 'worker';
        localStorage.setItem('userInfo', JSON.stringify(res));
        this.router.navigate(['/']);
      },
      (err) => {
        this.alertify.error(err.error.message);
      }
    );
  }
}
