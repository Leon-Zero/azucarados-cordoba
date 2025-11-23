import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarLayout } from './shared/layouts/navbar/navbar.layout';
import { FooterLayout } from './shared/layouts/footer/footer.layout';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarLayout, FooterLayout],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('mock');
}
