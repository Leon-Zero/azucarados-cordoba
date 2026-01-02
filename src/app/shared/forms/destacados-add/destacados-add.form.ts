import { Component, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DestacadoService } from '../../../core/services/destacado.service';
import { Btn } from '../../ui/btn/btn';
import { Destacado } from '../../../data/interfaces/database/destacado.interface';
import { ToastService } from '../../../core/services/toast.service';
import { ImagePicker } from '../../components/image-picker/image-picker';
import { uploadBase64 } from '../../../core/utils/quill-glue';

@Component({
  selector: 'form-destacados-add',
  imports: [Btn, ReactiveFormsModule, ImagePicker],
  templateUrl: './destacados-add.form.html',
  styleUrl: './destacados-add.form.css',
})
export class DestacadosAddForm {
  private fb = inject(FormBuilder);
  private destacadosService = inject(DestacadoService);
  private toastService = inject(ToastService);

  object = input<any>(null);
  onEdit = input<boolean>(false);
  imageBase64 = signal<string | null>(null);

  destacadosForm = this.fb.group({
    id: [null],
    text: ['', [Validators.required, Validators.minLength(8)]],
    img: ['', Validators.required],
    url: ['', [Validators.required, Validators.pattern(/https?:\/\/.+/i)]],
    ico: ['', Validators.required],
  });

  icons = signal([
    { id: 'logo azucarados', src: '/icons/logo azucarados.svg' },
    { id: 'news', src: '/icons/news.png' },
    { id: 'gota', src: '/icons/gota.png' },
    { id: 'info', src: '/icons/info.png' },
  ]);

  /* GETTERS */
  get id() {
    return this.destacadosForm.get('id')!;
  }
  get text() {
    return this.destacadosForm.get('text')!;
  }
  get img() {
    return this.destacadosForm.get('img')!;
  }
  get url() {
    return this.destacadosForm.get('url')!;
  }
  get ico() {
    return this.destacadosForm.get('ico')!;
  }

  /* seteo onEdit */
  setInputs() {
    this.destacadosForm.setValue({
      id: this.object().id,
      text: this.object().text,
      img: this.object().img,
      url: this.object().url ?? '',
      ico: this.object().ico ?? '',
    });
    this.imageBase64.set(this.img.value);
  }

  constructor() {
    effect(() => {
      const obj = this.object();
      if (!obj || Object.keys(obj).length === 0) return;
      if (this.onEdit()) this.setInputs();
    });
  }

  async onSubmit() {
    if (this.destacadosForm.invalid) {
      this.destacadosForm.markAllAsTouched();
      return;
    }

    const payload: any = this.destacadosForm.getRawValue();

    if (this.imageBase64()) {
      const folder = this.onEdit()
        ? `destacados/${this.id.value}`
        : `destacados/${crypto.randomUUID()}`;

      const url = await uploadBase64(this.imageBase64()!, folder);
      payload.img = url;
    }

    if (this.onEdit()) {
      this.sendPut(this.id.value!, payload);
    } else {
      this.sendPost(payload);
    }
  }

  sendPost(data: Destacado) {
    this.destacadosService.addDestacado(data).subscribe({
      next: () => {
        this.toastService.success('Destacado guardado correctamente');
        this.destacadosForm.reset();
        this.imageBase64.set(null);
      },
      error: (err) => {
        this.toastService.error('ERROR al guardar Destacado');
        console.error(err);
      },
    });
  }

  sendPut(id: number, data: Destacado) {
    this.destacadosService.editDestacado(data).subscribe({
      next: () => {
        this.toastService.success('Destacado actualizado con éxito');
        this.destacadosForm.reset();
        this.imageBase64.set(null);
        this.destacadosService.scrollToDelete();
      },
      error: (err) => {
        this.toastService.error('ERROR al actualizar Destacado');
        console.error(err);
      },
    });
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
}
