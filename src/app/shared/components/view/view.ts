import { Component, input, signal, SimpleChanges } from '@angular/core';
import { transformQuillHtml } from '../../../data/utils/iframe-video';
import { QuillViewHTMLComponent } from "ngx-quill";

@Component({
  selector: 'app-view',
  imports: [QuillViewHTMLComponent],
  templateUrl: './view.html',
  styleUrl: './view.css',
})
export class View {
  content = input('');
  html = signal<any>('');


  // constructor(private sanitizer: DomSanitizer) { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['content']) {
      const transformed = transformQuillHtml(this.content() || '');
      this.html.set(transformed);
    }
  }

}
