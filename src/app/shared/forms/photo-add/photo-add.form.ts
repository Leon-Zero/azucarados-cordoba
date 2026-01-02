import { Component, inject, signal } from '@angular/core';
import { Btn } from '../../ui/btn/btn';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GalleryService } from '../../../core/services/gallery.service';
import { ToastService } from '../../../core/services/toast.service';
import { ImagePicker } from '../../components/image-picker/image-picker';
import { uploadBase64 } from '../../../core/utils/quill-glue';

@Component({
  selector: 'form-photo-add',
  imports: [Btn, ReactiveFormsModule, ImagePicker],
  templateUrl: './photo-add.form.html',
  styleUrl: './photo-add.form.css',
})
export class PhotoAddForm {
  private fb = inject(FormBuilder);
  private imgService = inject(GalleryService);
  private toastService = inject(ToastService);

  imageBase64 = signal<string | null>(null);

  imgForm = this.fb.group({
    id: [null],
    alt: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    src: ['', Validators.required],
  });

  /* GETTERS */
  get id() {
    return this.imgForm.get('id')!;
  }
  get alt() {
    return this.imgForm.get('alt')!;
  }
  get description() {
    return this.imgForm.get('description')!;
  }
  get src() {
    return this.imgForm.get('src')!;
  }

  async onSubmit() {
    if (this.imgForm.invalid) {
      this.imgForm.markAllAsTouched();
      return;
    }
    if (!this.imageBase64()) {
      this.toastService.error('Debe seleccionar una imagen');
      return;
    }

    try {
      const url = await uploadBase64(this.imageBase64()!, 'gallery');
      this.imgForm.patchValue({ src: url });
      const payload: any = this.imgForm.getRawValue();

      this.imgService.addImage(payload).subscribe({
        next: () => {
          this.toastService.success('Imagen añadida correctamente');
          this.src.setValue(null);
          this.imgForm.reset();
          this.imageBase64.set(null);
        },
        error: (err) => {
          this.toastService.error('ERROR al guardar la imagen');
          console.error(err);
        },
      });
    } catch (err) {
      console.error(err);
      this.toastService.error('Error subiendo la imagen');
    }
  }

  onImageSelected(data: { base64: string } | null) {
    if (!data) {
      this.imageBase64.set(null);
      this.src.reset();
      return;
    }

    this.imageBase64.set(data.base64);
    this.src.setValue('pending-upload');
    this.src.markAsDirty();
    this.src.markAsTouched();
  }
}
