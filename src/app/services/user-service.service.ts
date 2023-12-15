import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RegisterUser } from '../models/registerUser.interface';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(
    private httpClient: HttpClient,
    private jwtService: JwtHelperService,
    private router: Router
  ) {}

  private BASE_URL: string = 'https://dummyjson.com/users';
  private token: string = 'token';
  private userInfo: string = 'userInfo';

  register(userData: RegisterUser) {
    return this.httpClient.post(this.BASE_URL + '/add', userData, {
      headers: new HttpHeaders().set('Content-Type', 'application/json'),
    });
  }

  getUserById(id: number) {
    return this.httpClient.get(this.BASE_URL + `/${id}`);
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
