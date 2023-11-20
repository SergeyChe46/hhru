import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private formBuilder: FormBuilder) {}

  registerForm: FormGroup = this.formBuilder.group({
    // fakeApi предоставляет пользователей без ролей. В качестве роли будет использован пол: 'male' - соискатель, 'female' - HR.
    isJobSeeker: [false, Validators.required],
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: [''],
    confirmPassword: [''],
  });
  /**
   * Возвращает true если пользователь соискатель. Иначе false.
   */
  get isJobSeeker() {
    return this.registerForm.get('isJobSeeker') as FormControl;
  }
}
