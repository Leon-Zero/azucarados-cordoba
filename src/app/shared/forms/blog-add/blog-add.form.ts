import { Component, effect, inject, input, signal, ViewChild } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastService } from '../../../core/services/toast.service';
import { BlogService } from '../../../core/services/blog.service';
import { Blogs } from '../../../data/interfaces/database/blog.interface';
import { Btn } from '../../ui/btn/btn';
import { Editor } from '../../components/editor/editor';
import { ImagePicker } from '../../components/image-picker/image-picker';
import { QuillGlueService } from '../../../core/services/quillGlue.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'form-blog-add',
  imports: [ReactiveFormsModule, Btn, Editor, ImagePicker],
  templateUrl: './blog-add.form.html',
  styleUrl: './blog-add.form.css',
})
export class BlogAddForm {
  private fb = inject(FormBuilder);
  private blogsService = inject(BlogService);
  private toastService = inject(ToastService);
  private quillGlueService = inject(QuillGlueService);

  @ViewChild(Editor) editorComponent!: Editor;

  _editorQ = signal<any>([]);
  object = input<any>(null);
  onEdit = input<boolean>(false);
  imageBase64 = signal<string | null>(null);

  blogForm = this.fb.group({
    id: [null],
    title: ['', [Validators.required, Validators.minLength(8)]],
    resume: ['', Validators.required],
    img: ['', Validators.required],
    content: [''],
  });

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

  setInputs() {
    this.blogForm.setValue({
      id: this.object().id,
      title: this.object().title,
      resume: this.object().resume,
      content: this.object().content,
      img: this.object().img,
    });
    this.imageBase64.set(this.img.value);
    this.title.disable();
  }

  onImageSelected(data: { base64: string } | null) {
    if (!data) {
      this.imageBase64.set(null);
      this.img.reset();
      return;
    }

    this.imageBase64.set(data.base64);
    this.img.setValue('pending-upload');
    this.img.markAsDirty();
    this.img.markAsTouched();
  }

  constructor() {
    effect(() => {
      const obj = this.object();
      if (!obj || Object.keys(obj).length === 0) {
        this.title.enable();
        return;
      }

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
    const title = this.title.value!;
    const currentId = this.id.value ?? undefined;
    const exists = this.blogsService.titleExists(title, this.onEdit() ? currentId : undefined);

    if (exists) {
      this.toastService.error('Ya existe un blog con ese título');
      this.title.setErrors({ duplicated: true });
      return;
    }
    const ok = await this.setContentAndParse();
    if (!ok) return;
    const newBlog: any = this.blogForm.getRawValue();
    this.onEdit() ? this.sendPut(newBlog) : this.sendPost(newBlog);
  }

  async setContentAndParse(): Promise<boolean> {
    const contenido = this._editorQ();
    if (!contenido || contenido.trim() === '') {
      this.toastService.error('El contenido no puede estar vacío');
      return false;
    }

    const slug = this.blogsService.generatePath(this.title.value!);
    const profilePath = `blog-profile/${slug}`;
    const blogPath = `blogs/${slug}`;

    try {
      const preview = this.imageBase64();

      if (this.onEdit() && preview && this.isBase64Image(preview)) {
        await firstValueFrom(this.blogsService.deleteFolder(profilePath));
      }

      if (preview && this.isBase64Image(preview)) {
        const newUrl = await this.quillGlueService.uploadBase64(preview, profilePath);
        this.blogForm.patchValue({ img: newUrl });
      }

      const parsedHtml = await this.quillGlueService.transformQuillHtml(contenido, blogPath);

      this.blogForm.patchValue({ content: parsedHtml });
      return true;
    } catch (err) {
      console.error(err);
      this.toastService.error('Error procesando el contenido');
      return false;
    }
  }

  sendPost(newBlog: Blogs) {
    this.blogsService.addBlog(newBlog).subscribe({
      next: () => {
        this.toastService.success('Blog/noticia guardado correctamente');
        this.blogForm.reset();
        this._editorQ.set('');
        this.editorComponent?.cleanContent();
        this.imageBase64.set(null);
        this.blogsService.scrollToAdd();
      },
      error: () => {
        this.toastService.error('ERROR al guardar Blog/Noticia');
      },
    });
  }

  sendPut(newBlog: Blogs) {
    this.blogsService.editBlog(newBlog).subscribe({
      next: () => {
        this.toastService.success('Blog actualizado con exito');
        this.blogForm.reset({});
        this._editorQ.set('');
        this.editorComponent?.cleanContent();
        this.imageBase64.set(null);
        this.blogsService.scrollToDelete();
      },
      error: () => {
        this.toastService.error('ERROR al actualizar Blog/Noticia');
      },
    });
  }

  isBase64Image(value: string): boolean {
    return value.startsWith('data:image/');
  }
}
