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

  private getUserUrl: string = 'https://dummyjson.com/users';
  private token: string = 'token';
  private userInfo: string = 'userInfo';

  getUserById(id: number) {
    return this.httpClient.get(this.getUserUrl + `/${id}`);
  }

  getUserInfo() {
    let userInfo: string | null = JSON.parse(localStorage.getItem('userInfo')!);
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
