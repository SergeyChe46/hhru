import { HttpClient } from '@angular/common/http';
import { Component, ViewChild } from '@angular/core';
import { StoredUser } from 'src/app/models/stored-user.interface';
import { AlertifyService } from 'src/app/services/alertify.service';
import { ApplicantsService } from 'src/app/services/applicants.service';
import { ApplicantInfoComponent } from '../applicant-info/applicant-info.component';

@Component({
  selector: 'app-applicants-list',
  templateUrl: './applicants-list.component.html',
  styleUrls: ['./applicants-list.component.css'],
})
export class ApplicantsListComponent {
  constructor(
    private httpClient: HttpClient,
    private applicantsService: ApplicantsService,
    private alertify: AlertifyService
  ) {}

  @ViewChild(ApplicantInfoComponent, { static: false })
  modal!: ApplicantInfoComponent;

  users: StoredUser[] = [];
  private skip: number = 0;
  private limit = 10;

  getAll(limit: number, skip: number) {
    this.applicantsService.getUsers(limit, skip).subscribe({
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
   * Обрезает адрес, если он больше 20 символов
   * @param address Адрес соискателя
   * @param addressLength Длина адреса
   * @returns В шаблон форматированный адрес соискателя
   */
  truncateAddress(address: string, addressLength: number) {
    if (address.length > addressLength) {
      return address.slice(0, addressLength) + '...';
    }
    return address;
  }
  /**
   * Отправляет информация о соискателе в модальное окно
   * @param user информация о соискателе
   */
  showUserInfo(user: StoredUser) {
    this.modal.current = user;
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
      this.getAll(this.limit, this.skip);
      this.skip += this.limit;
    }
  }
}
