import { Component, input, signal, SimpleChanges } from '@angular/core';
import { QuillViewHTMLComponent } from "ngx-quill";

@Component({
  selector: 'app-view',
  imports: [QuillViewHTMLComponent],
  templateUrl: './view.html',
  styleUrl: './view.css',
})
export class View {
  content = input('');
  html = signal<string>('');

  ngOnChanges(changes: SimpleChanges) {
    if (changes['content']) {
      this.html.set(this.content() || '');
    }
  }

}
