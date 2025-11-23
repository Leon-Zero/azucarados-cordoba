import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  imports: [],
  templateUrl: './footer.layout.html',
  styleUrl: './footer.layout.css',
})
export class FooterLayout {
  actualRoute: string = '';

  constructor(private router: Router) {
    this.actualRoute = this.router.url;
  }
  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
