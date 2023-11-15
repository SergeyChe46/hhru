import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServiceService } from './services/user-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  constructor(
    private userService: UserServiceService,
    private router: Router
  ) {}
  title = 'hhru';

  onLogin() {
    return localStorage.getItem('token');
  }
  onLogout() {
    localStorage.removeItem('token');
  }
  isLoggedIn() {
    return this.userService.isUserAuthenticated();
  }
}
