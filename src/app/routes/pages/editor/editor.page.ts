import { Component, effect, input, output, signal } from '@angular/core';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { Btn } from '../../../shared/ui/btn/btn';

@Component({
  selector: 'app-editor',
  imports: [QuillModule, FormsModule, Btn],
  templateUrl: './editor.page.html',
  styleUrl: './editor.page.css',
})
export class EditorPage {
  editorQ = output<string>();
  initialContent = input<string>('');

  private quill: any = null;
  private pendingContent: string = "";

  modulesQuill = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      [{ font: [] }],
      [{ size: ['small', false, 'large', 'huge'] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      ['blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }],
      ['link', 'image', 'video'],
      ['clean'],
    ],
  };

  constructor() {
    effect(() => {
      const content = this.initialContent();
      if (this.quill) {
        this.quill.root.innerHTML = content || '';
      } else {
        this.pendingContent = content || '';
      }
    });
  }

  onEditorCreated(editor: any) {
    this.quill = editor;
    if (this.pendingContent !== "") {
      this.quill.root.innerHTML = this.pendingContent;
      this.pendingContent = "";
    }
  }

  onChangedEditor(event: any) {
    if (event?.html !== undefined) {
      this.editorQ.emit(event.html ?? '');
    }
  }

  cleanContent() {
    if (!this.quill) return;
    this.quill.setContents([]);
    this.editorQ.emit('');
  }
}
