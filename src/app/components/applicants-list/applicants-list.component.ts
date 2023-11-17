import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { StoredUser } from 'src/app/models/stored-user.interface';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-applicants-list',
  templateUrl: './applicants-list.component.html',
  styleUrls: ['./applicants-list.component.css'],
})
export class ApplicantsListComponent implements OnInit {
  private URL: string = 'https://dummyjson.com/users';

  users: StoredUser[] = [];

  constructor(
    private httpClient: HttpClient,
    private alertify: AlertifyService
  ) {}

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    return this.httpClient.get<StoredUser>(this.URL).subscribe(
      (res: any) => {
        this.users = res['users'];
      },
      (error) => {
        this.alertify.error('Ошибка ' + error);
      },
      () => {
        this.alertify.success('Загружено');
      }
    );
  }

  getUserName(firstName: string, lastName: string) {
    return `${firstName} ${lastName}`;
  }
}
