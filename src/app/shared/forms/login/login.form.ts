import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Btn } from "../../ui/btn/btn";
import { AuthService } from '../../../core/services/auth.service';
import { LoginRequest } from '../../../data/interfaces/auth/login-request.interface';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'app-login',
  imports: [Btn, ReactiveFormsModule],
  templateUrl: './login.form.html',
  styleUrl: './login.form.css',
})
export class LoginForm {

  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private toastService = inject(ToastService);
  private router = inject(Router);

  loginForm: FormGroup;
  showPassword = false;

  constructor() {
    this.loginForm = this.fb.group({
      username: [
        '',
        [Validators.required, Validators.minLength(4)]
      ],
      password: [
        '',
        [Validators.required, Validators.minLength(8)]
      ]
    });
  }

  /* GETTERS */
  get username() {
    return this.loginForm.get('username')!;
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
      next: () => {
        this.toastService.success('Sesión iniciada correctamente');
        this.loginForm.reset();
        this.router.navigate(['/admin']).then(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
});
      },
      error: (err) => {
        this.toastService.error('Usuario o contraseña incorrectos');
        console.error('Error en login', err);
      }
    });
  }
}
