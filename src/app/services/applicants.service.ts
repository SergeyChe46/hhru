import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StoredUser } from '../models/stored-user.interface';

@Injectable({
  providedIn: 'root',
})
export class ApplicantsService {
  constructor(private httpClient: HttpClient) {}

  private URL: string = 'https://dummyjson.com/users';

  getUsers(limit: number, skip: number) {
    return this.httpClient.get<StoredUser>(
      this.URL + `?limit=${limit}&skip=${skip}`
    );
  }
}
