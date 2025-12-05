import { Component, inject, signal } from '@angular/core';
import { GalleryService } from '../../../core/services/gallery.service';
import { Img } from '../../../data/interfaces/database/img.interface';
import { ToastService } from '../../../core/services/toast.service';

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

  deleteImage(id: number) {
    this.imageService.deleteImage(id).subscribe({
      next: () => {
        this.toastService.success('Imagen eliminada con exito!');
        this.images.update((imgs) => imgs.filter((img) => img.id !== id));
      }, error: (err) => {
        this.toastService.error('ERROR al eliminar la imagen');
        console.log('error al eliminar', err);
      }
    });
  }
}
