import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(
    private httpClient: HttpClient,
    private jwtService: JwtHelperService,
    private router: Router
  ) {}

  private url: string = 'https://dummyjson.com/auth/login';
  private token: string = 'token';
  private userInfo: string = 'userInfo';

  authUser(username: string, password: string) {
    let credentials = {
      username: username,
      password: password,
    };
    return this.httpClient.post(this.url, credentials).subscribe(
      (res: any) => {
        localStorage.setItem(this.token, res.token);
        res['interestingJob'] = 'worker';
        localStorage.setItem(this.userInfo, JSON.stringify(res));
        this.router.navigate(['/']);
      },
      (err) => {
        console.log(err.error);
      }
    );
  }

  getUserInfo() {
    let userInfo = JSON.parse(localStorage.getItem(this.userInfo)!);
    return userInfo;
  }

  isUserAuthenticated() {
    let token = localStorage.getItem(this.token);
    if (token && !this.jwtService.isTokenExpired(token)) {
      return true;
    }
    return true;
  }

  logout() {
    localStorage.removeItem(this.userInfo);
    return localStorage.removeItem(this.token);
  }
}
