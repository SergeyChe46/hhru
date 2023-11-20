import { Component } from '@angular/core';
import { StoredUser } from 'src/app/models/stored-user.interface';

@Component({
  selector: 'app-applicant-info',
  templateUrl: './applicant-info.component.html',
  styleUrls: ['./applicant-info.component.css'],
})
export class ApplicantInfoComponent {
  current: StoredUser | null = null;
}
