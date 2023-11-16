import { Component, OnInit } from '@angular/core';
import { Job } from 'src/app/models/job.interface';
import { JobService } from 'src/app/services/job.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-jobs-list',
  templateUrl: './jobs-list.component.html',
  styleUrls: ['./jobs-list.component.css'],
})
export class JobsListComponent implements OnInit {
  jobsList: Job[] = [];

  constructor(
    private jobService: JobService,
    private userService: UserServiceService
  ) {}

  ngOnInit(): void {
    this.getAll();
  }

  getFiltered() {
    let userInfo: any = this.userService.getUserInfo();
    let userVacancy = userInfo['interestingJob'];
    this.jobsList = userVacancy
      ? this.jobsList.filter((job) =>
          job.vacancies.includes(userInfo['interestingJob'])
        )
      : this.jobsList;
  }

  getAll() {
    return this.jobService.getAll().subscribe((data: any) => {
      this.jobsList = data['jobs'];
    });
  }
}
