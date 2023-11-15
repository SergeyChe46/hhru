import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Job } from '../models/job.interface';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Job[]> {
    return this.httpClient.get<Job[]>('assets/jobs.json');
  }
}
