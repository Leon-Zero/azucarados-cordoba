import { Component, signal } from '@angular/core';
import { LoginForm } from "../../../shared/forms/login/login.form";
import { RegisterForm } from "../../../shared/forms/register/register.form";

@Component({
  selector: 'app-auth',
  imports: [LoginForm, RegisterForm],
  templateUrl: './auth.page.html',
  styleUrl: './auth.page.css',
})
export class AuthPage {

  changeForm = signal(false);

}
