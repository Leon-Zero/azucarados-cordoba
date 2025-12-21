import { NgClass } from '@angular/common';
import { Component, effect, inject, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgClass, RouterLinkActive],
  templateUrl: './navbar.layout.html',
  styleUrl: './navbar.layout.css',
})
export class NavbarLayout {
  isOpen = signal<boolean>(false);
  authService = inject(AuthService);
  private router = inject(Router);


  logOut(){
    this.authService.logout();
    this.router.navigate(['/home'])
  }
}
