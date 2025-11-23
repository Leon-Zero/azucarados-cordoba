import { Component, signal } from '@angular/core';
import { QuillEditor } from '../../../data/interfaces/quill-editor.interface';
import { QuillModule } from 'ngx-quill';
import { FormsModule, NgForm } from '@angular/forms';
import { Btn } from '../../../shared/ui/btn/btn';
import { SizeButton } from '../../../data/interfaces/size-button.interface';
import { View } from '../../../shared/components/view/view';

@Component({
  selector: 'app-editor',
  imports: [QuillModule, FormsModule, Btn, View],
  templateUrl: './editor.page.html',
  styleUrl: './editor.page.css',
})
export class EditorPage {
  _size = signal<SizeButton>('medium');
  viewContent = signal<string>('');

  blog = signal<QuillEditor>({
    title: '',
    content: '',
  });

  htmlContent = signal<string>('');

  modulesQuill = {
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'], // botones de formato
      [{ font: [] }],
      [{ size: ['small', false, 'large', 'huge'] }], // tamaño de fuente personalizado
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ align: [] }],
      [{ color: [] }, { background: [] }], // colores de texto y fondo
      ['blockquote'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ indent: '-1' }, { indent: '+1' }], // aumentar/disminuir sangría
      ['link', 'image', 'video'],
      ['clean'], // botón para limpiar formato
    ],
  };

  onChangedEditor(event: any) {
    if (event.html) {
      this.htmlContent.set(event.html);
    }
  }

  saveEditor(formEditor: NgForm) {
    if (formEditor.value.titulo !== '' && formEditor.value.contenido !== '') {
      console.log(formEditor.value.content);
      this.viewContent.set(formEditor.value.content);
    } else {
      window.alert('Debe Completar Los Campos');
    }
  }

  cleanForm(formEditor: NgForm) {
    formEditor.resetForm([{}]);
  }
}
