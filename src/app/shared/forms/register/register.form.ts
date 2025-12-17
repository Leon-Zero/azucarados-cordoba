import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { Btn } from "../../ui/btn/btn";
import { AuthService } from '../../../core/services/auth.service';
import { RegisterAdmin } from '../../../data/interfaces/auth/register-admin.interface';

@Component({
  selector: 'app-register',
  imports: [Btn, ReactiveFormsModule],
  templateUrl: './register.form.html',
  styleUrl: './register.form.css',
})
export class RegisterForm {

  registerForm: FormGroup;
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  showSecret = signal<boolean>(false);
  showPassword = signal<boolean>(false);
  showRepeatPassword = signal<boolean>(false);

  constructor() {
    this.registerForm = this.fb.group(
      {
        name: ['', [
          Validators.required,
          Validators.minLength(6)
        ]],

        username: ['', [
          Validators.required,
          Validators.minLength(4)
        ]],

        email: ['', [
          Validators.required,
          Validators.email
        ]],

        adminSecret: ['', [
          Validators.required,
          Validators.minLength(8)
        ]],

        password: ['', [
          Validators.required,
          Validators.minLength(8)
        ]],

        repeatPassword: ['', Validators.required]
      },
      {
        validators: this.passwordMatchValidator
      }
    );
  }

  private passwordMatchValidator(
    form: AbstractControl
  ): ValidationErrors | null {

    const password = form.get('password')?.value;
    const repeatPassword = form.get('repeatPassword')?.value;

    if (!password || !repeatPassword) {
      return null;
    }

    return password === repeatPassword
      ? null
      : { passwordMismatch: true };
  }

  /* GETTERS */
  get name() {
    return this.registerForm.get('name')!;
  }
  get username() {
    return this.registerForm.get('username')!;
  }
  get email() {
    return this.registerForm.get('email')!;
  }
  get adminSecret() {
    return this.registerForm.get('adminSecret')!;
  }
  get password() {
    return this.registerForm.get('password')!;
  }
  get repeatPassword() {
    return this.registerForm.get('repeatPassword')!;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    const payload: RegisterAdmin = this.buildPayload();

    this.authService.registerAdmin(payload).subscribe({
      next: () => {
        console.log('Administrador creado correctamente');
        this.registerForm.reset();
      },
      error: (err) => {
        console.error('Error al registrar admin', err);
      }
    });
  }

  private buildPayload() {
    const {
      name,
      username,
      email,
      password,
      adminSecret
    } = this.registerForm.value;

    return {
      name,
      username,
      email,
      password,
      adminSecret
    };
  }

}
