import { Component, inject, signal } from '@angular/core';
import { GalleryService } from '../../../core/services/gallery.service';
import { Img } from '../../../data/interfaces/database/img.interface';
import { ToastService } from '../../../core/services/toast.service';
import { deleteFileByUrl } from '../../../core/utils/firebase-delete';

@Component({
  selector: 'form-photo-delete',
  imports: [],
  templateUrl: './photo-delete.form.html',
  styleUrl: './photo-delete.form.css',
})
export class PhotoDelete {
  private imageService = inject(GalleryService);
  private toastService = inject(ToastService);
  images = signal<Img[]>([]);

  ngOnInit() {
    this.loadImages();
  }

  loadImages() {
    this.imageService.getAllImages().subscribe({
      next: (res) => {
        const sorted = [...res].sort((a, b) => b.id - a.id);
        this.images.set(sorted);
      },
    });
  }

  async deleteImage(id: number) {
    const img = this.images().find((i) => i.id === id);
    if (!img) return;

    try {
      await deleteFileByUrl(img.src);
      this.imageService.deleteImage(id).subscribe({
        next: () => {
          this.toastService.success('Imagen eliminada con éxito!');
          this.images.update((imgs) => imgs.filter((i) => i.id !== id));
        },
        error: (err) => {
          this.toastService.error('ERROR al eliminar la imagen');
          console.error(err);
        },
      });
    } catch (err) {
      console.error(err);
      this.toastService.error('Error eliminando imagen del bucket');
    }
  }
}
