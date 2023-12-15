import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RegisterUser } from 'src/app/models/registerUser.interface';
import { AlertifyService } from 'src/app/services/alertify.service';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserServiceService,
    private alertify: AlertifyService
  ) {}

  registerForm: FormGroup = this.formBuilder.group(
    {
      // fakeApi предоставляет пользователей без ролей. В качестве роли будет использован пол: 'male' - соискатель, 'female' - HR.
      isJobSeeker: [false, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', [Validators.required]],
    },
    { validators: this.passwordMatch }
  );
  /**
   * Возвращает true если пользователь соискатель. Иначе false.
   */
  get isJobSeeker() {
    return this.registerForm.get('isJobSeeker') as FormControl;
  }

  get email() {
    return this.registerForm.controls['email'];
  }

  get passwordConfirm() {
    return this.registerForm.controls['confirmPassword'];
  }

  get firstName() {
    return this.registerForm.controls['firstName'];
  }
  get lastName() {
    return this.registerForm.controls['lastName'];
  }

  onSubmit() {
    let newUser: RegisterUser = {
      firstName: this.firstName.value,
      lastName: this.lastName.value,
    };
    this.userService.register(newUser).subscribe({
      next: (result) => {
        this.alertify.success('Успешно');
        this.registerForm.reset();
      },
      error: (error) => this.alertify.error(`Неудача ${error.error}`),
    });
  }

  passwordMatch(control: AbstractControl) {
    let password: string = control.get('password')?.value;
    let confirmPassword: string = control.get('confirmPassword')?.value;

    if (!password || !confirmPassword) {
      return null;
    }
    password === confirmPassword
      ? null
      : control.get('confirmPassword')?.setErrors({ missmatch: true });

    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
}
