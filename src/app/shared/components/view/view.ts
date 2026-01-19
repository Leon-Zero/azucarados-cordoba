import { Component, input, signal, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-view',
  imports: [],
  templateUrl: './view.html',
  styleUrl: './view.css',
})
export class View {
  content = input<string>('');
  html = signal<SafeHtml>('');

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['content']) {
      const value = this.content() || '';
      this.html.set(this.sanitizer.bypassSecurityTrustHtml(value));
    }
  }

}
