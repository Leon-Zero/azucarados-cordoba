import { Component, inject } from '@angular/core';
import { Btn } from "../../ui/btn/btn";
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth.service';
import { LoginRequest } from '../../../data/interfaces/auth/login-request.interface';

@Component({
  selector: 'app-login',
  imports: [Btn, ReactiveFormsModule],
  templateUrl: './login.form.html',
  styleUrl: './login.form.css',
})
export class LoginForm {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);

  loginForm: FormGroup;
  showPassword = false;

  constructor() {
    this.loginForm = this.fb.group({
      identifier: [
        '',
        [
          Validators.required,
          Validators.minLength(4)
        ]
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8)
        ]
      ]
    });
  }

  /* GETTERS */
  get identifier() {
    return this.loginForm.get('identifier')!;
  }
  get password() {
    return this.loginForm.get('password')!;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const payload: LoginRequest = this.loginForm.value;

    this.authService.login(payload).subscribe({
      next: (res) => {
        console.log('Login correcto', res);
        this.loginForm.reset();
      },
      error: (err) => {
        console.error('Error en login', err);
      }
    });
  }
}
