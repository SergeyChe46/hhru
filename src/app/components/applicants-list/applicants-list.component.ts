import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { StoredUser } from 'src/app/models/stored-user.interface';
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-applicants-list',
  templateUrl: './applicants-list.component.html',
  styleUrls: ['./applicants-list.component.css'],
})
export class ApplicantsListComponent {
  constructor(
    private httpClient: HttpClient,
    private alertify: AlertifyService
  ) {}

  users: StoredUser[] = [];

  private skip: number = 0;
  private limit = 10;
  private URL: string = 'https://dummyjson.com/users';

  getUsers() {
    return this.httpClient
      .get<StoredUser>(this.URL + `?limit=${this.limit}&skip=${this.skip}`)
      .subscribe({
        next: (res: any) => {
          this.alertify.warning('Загружается');
          res['users'].forEach((element: any) => {
            this.users.push(element);
          });
        },
        error: (error) => {
          this.alertify.error('Ошибка ' + error);
        },
        complete: () => {
          this.alertify.success('Загружено');
        },
      });
  }
  /**
   * Возвращает форматированное имя пользователя
   * @param firstName
   * @param lastName
   * @returns
   */
  getUserName(firstName: string, lastName: string) {
    return `${firstName} ${lastName}`;
  }
  /**
   * Обновляет параметры загрузки, загружает обновлённые данные
   * @param e Событие - срабатывает в конце списка.
   */
  onScroll(e: any) {
    if (e) {
      this.skip += this.limit;
      this.getUsers();
    }
  }
}
