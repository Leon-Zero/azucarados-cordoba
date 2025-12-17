import { Component, inject } from '@angular/core';
import { Btn } from "../../ui/btn/btn";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GalleryService } from '../../../core/services/gallery.service';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'form-photo-add',
  imports: [Btn, ReactiveFormsModule],
  templateUrl: './photo-add.form.html',
  styleUrl: './photo-add.form.css',
})
export class PhotoAddForm {
 private fb = inject(FormBuilder);
  private imgService = inject(GalleryService);
  private toastService = inject(ToastService);

  imgForm = this.fb.group({
    id: [null],
    alt: ['', [Validators.required, Validators.minLength(5)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    src: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))/i
        ),
      ],
    ],
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

  onSubmit() {
    if (this.imgForm.invalid) {
      this.imgForm.markAllAsTouched();
      return;
    }

    const payload: any = this.imgForm.getRawValue();

    this.imgService.addImage(payload).subscribe({
      next: () => {
        this.toastService.success('Imagen añadida correctamente');
        this.imgForm.reset();
      },
      error: (err) => {
        this.toastService.error('ERROR al guardar la imagen');
        console.error('Error al guardar imagen', err);
      },
    });
  }
}
