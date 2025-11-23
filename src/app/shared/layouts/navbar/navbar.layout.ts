import { NgClass } from '@angular/common';
import { Component, effect, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, NgClass, RouterLinkActive],
  templateUrl: './navbar.layout.html',
  styleUrl: './navbar.layout.css',
})
export class NavbarLayout {
  isOpen = signal<boolean>(false);
}
