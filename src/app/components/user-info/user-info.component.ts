import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css'],
})
export class UserInfoComponent implements OnInit {
  user: any;
  userForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private userService: UserServiceService
  ) {}
  /**
   * Представялет информацию о пользователе в виде формы.
   */
  ngOnInit(): void {
    let userInfo: any = JSON.parse(localStorage.getItem('userInfo')!);

    this.userService.getUserById(userInfo['id']).subscribe((res) => {
      this.user = res;

      this.userForm = this.formBuilder.group({
        firstName: this.user['firstName'],
        lastName: this.user['lastName'],
        maidenName: this.user['maidenName'],
        age: this.user['age'],
        gender: this.user['gender'],
        email: this.user['email'],
        phone: this.user['phone'],
        username: this.user['username'],
        password: this.user['password'],
        birthDate: this.user['birthDate'],
        vacancy: userInfo['interestingJob'],
      });
    });
  }
  /**
   * Сохраняет данные, если они были изменены.
   */
  onSubmit() {
    let u = JSON.parse(localStorage.getItem('userInfo')!);
    if (u) {
      u['interestingJob'] = this.userForm.controls['vacancy'].value;
      localStorage.setItem('userInfo', JSON.stringify(u));
    }
  }
}
