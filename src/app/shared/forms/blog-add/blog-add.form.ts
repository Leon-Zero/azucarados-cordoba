import { Component, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';
import { BlogService } from '../../../core/services/blog.service';
import { Blogs } from '../../../data/interfaces/database/blog.interface';
import { Btn } from "../../ui/btn/btn";
import { transformQuillHtml } from '../../../core/utils/quill-glue';
import { Editor } from "../../components/editor/editor";

@Component({
  selector: 'form-blog-add',
  imports: [ReactiveFormsModule, Btn, Editor],
  templateUrl: './blog-add.form.html',
  styleUrl: './blog-add.form.css',
})
export class BlogAddForm {
  private fb = inject(FormBuilder);
  private blogsService = inject(BlogService);
  private toastService = inject(ToastService);
  _editorQ = signal<any>([]);
  object = input<any>(null);
  onEdit = input<boolean>(false);

  blogForm = this.fb.group({
    id: [null,],
    title: ['', [Validators.required, Validators.minLength(8)]],
    resume: ['', Validators.required],
    img: ['',
      [
        Validators.required,
        Validators.pattern(
          // patrón simple para URL
          /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))/i
        ),
      ],
    ],
    content: [''],
  });

  // getters para validaciones
  get id() {
    return this.blogForm.get('id')!;
  }
  get title() {
    return this.blogForm.get('title')!;
  }
  get resume() {
    return this.blogForm.get('resume')!;
  }
  get img() {
    return this.blogForm.get('img')!;
  }
  get content() {
    return this.blogForm.get('content')!;
  }

  //setter en edit mode
  setInputs() {
    this.blogForm.setValue({
      id: this.object().id,
      title: this.object().title,
      resume: this.object().resume,
      content: this.object().content,
      img: this.object().img
    });
  }

  constructor() {
    effect(() => {
      const obj = this.object();
      if (!obj || Object.keys(obj).length === 0) return;
      if (this.onEdit()) {
        this.setInputs();
      }
    });
  }

  async onSubmit() {
    if (this.blogForm.invalid) {
      this.blogForm.markAllAsTouched();
      return;
    }

    const ok = await this.setContentAndParse();
    if (!ok) return;

    const newBlog: any = this.blogForm.getRawValue();

    if (this.onEdit()) {
      const id = this.id.value;
      if (id == null) {
        this.toastService.error('ID inválido para edición');
        return;
      }
      this.sendPut(newBlog);
    } else {
      this.sendPost(newBlog);
    }
  }


  async setContentAndParse(): Promise<boolean> {
    const contenido = this._editorQ();

    if (!contenido || contenido.trim() === '') {
      this.toastService.error('El contenido no puede estar vacío');
      return false;
    }
    try {
      const parsedHtml = await transformQuillHtml(contenido);

      this.blogForm.patchValue({
        content: parsedHtml
      });
      return true;
    } catch (err) {
      console.error('Error procesando contenido de Quill', err);
      this.toastService.error('Error procesando el contenido');
      return false;
    }
  }

  sendPost(newBlog: Blogs) {
    this.blogsService.addBlog(newBlog).subscribe({
      next: (res) => {
        console.log('Blog guardado:', res);
        this.toastService.success('Blog/noticia guardado correctamente');
        this.blogForm.reset();
      },
      error: (err) => {
        this.toastService.error('ERROR al guardar Blog/Noticia')
        console.error('Error al guardar Blog', err);
      }
    });
  }

  sendPut(newBlog: Blogs) {
    this.blogsService.editBlog(newBlog).subscribe({
      next: (res) => {
        console.log('Blog/Noticia actualizado:', res);
        this.toastService.success('Blog actualizado con exito')
        this.blogForm.reset({});
        this.blogsService.scrollToDelete();
      }, error: (err => {
        this.toastService.error('ERROR al actualizar Blog/Noticia');
        console.error('error al actualizar Blog/Noticia', err);
      })
    })
  }

}
