import { Component, output, signal } from '@angular/core';
import { QuillEditor } from '../../../data/interfaces/dynamic-form/quill-editor.interface';
import { QuillModule } from 'ngx-quill';
import { FormsModule, NgForm } from '@angular/forms';
import { Btn } from '../../../shared/ui/btn/btn';
// import { View } from '../../../shared/components/view/view';

@Component({
  selector: 'app-editor',
  imports: [QuillModule, FormsModule, Btn],
  templateUrl: './editor.page.html',
  styleUrl: './editor.page.css',
})
export class EditorPage {
  editorQ = output<string>();

  // Guardamos la instancia real de Quill acá
  private quill!: any;

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

  onEditorCreated(editor: any) {
    console.log('EDITOR CREATED:', editor);
    this.quill = editor;
  }

  onChangedEditor(event: any) {
    console.log("EVENT QUILL:", event);

    if (event?.html !== undefined) {
      this.editorQ.emit(event.html ?? '');
    }
  }

  cleanContent() {
    if (!this.quill) {
      console.warn('Quill todavía no está inicializado.');
      return;
    }

    this.quill.setContents([]);
    this.editorQ.emit('');
  }
}
