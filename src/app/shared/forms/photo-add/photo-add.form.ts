import { Component, inject } from '@angular/core';
import { Btn } from "../../ui/btn/btn";
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { GalleryService } from '../../../core/services/gallery.service';

@Component({
  selector: 'form-photo-add',
  imports: [Btn, ReactiveFormsModule],
  templateUrl: './photo-add.form.html',
  styleUrl: './photo-add.form.css',
})
export class PhotoAddForm {
  private fb = inject(FormBuilder);
  private imgService = inject(GalleryService);

  imgForm = this.fb.group({
    id: ["", Validators.required],
    alt: ['', [Validators.required, Validators.minLength(5)]],
    src: [
      '',
      [
        Validators.required,
        Validators.pattern(
          // patrón simple para URL
          /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))/i
        ),
      ],
    ],
  });

  // getters para validaciones
  get alt() {
    return this.imgForm.get('alt')!;
  }
  get src() {
    return this.imgForm.get('src')!;
  }
  get id() {
    return this.imgForm.get('id')!;
  }

  onSubmit() {
    if (this.imgForm.invalid) {
      this.imgForm.markAllAsTouched();
      return;
    }
    const newImage: any = this.imgForm.value;
    console.log('POST a json-server:', newImage);

    this.imgService.addImage(newImage).subscribe({
      next: (res) => {
        console.log('Imagen guardada:', res);
        this.imgForm.reset();
      },
      error: (err) => {
        console.error('Error al guardar imagen', err);
      }
    });
  }

}
