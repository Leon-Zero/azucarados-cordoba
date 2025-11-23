import { Component, Input, signal, SimpleChanges } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { transformQuillHtml } from '../../../data/utils/iframe-video';

@Component({
  selector: 'app-view',
  imports: [],
  templateUrl: './view.html',
  styleUrl: './view.css',
})
export class View {
  @Input() content = ''; // HTML que recibes del editor / store
  safeHtml: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['content']) {
      const transformed = transformQuillHtml(this.content || '');
      // Sanitize para Angular (bypass con conocimiento del contenido)
      this.safeHtml = this.sanitizer.bypassSecurityTrustHtml(transformed);
    }
  }
}
