import { Component, inject, signal } from '@angular/core';
import { GalleryService } from '../../../core/services/gallery.service';
import { Img } from '../../../data/interfaces/database/img.interface';
import { ToastService } from '../../../core/services/toast.service';
import { ModalConfirm } from '../../ui/modal-confirm/modal-confirm';

@Component({
  selector: 'form-photo-delete',
  imports: [ModalConfirm],
  templateUrl: './photo-delete.form.html',
  styleUrl: './photo-delete.form.css',
})
export class PhotoDelete {
  private imageService = inject(GalleryService);
  private toastService = inject(ToastService);

  images = signal<Img[]>([]);
  confirmOpen = signal(false);
  pendingDeleteId = signal<number | null>(null);

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

  async confirmDelete() {
    const id = this.pendingDeleteId();
    if (id === null) return;

    this.imageService.deleteImage(id).subscribe({
      next: () => {
        this.toastService.success('Imagen eliminada con éxito!');
        this.images.update((imgs) => imgs.filter((i) => i.id !== id));
        this.cancelDelete();
      },
      error: (err) => {
        console.error(err);
        this.toastService.error('ERROR al eliminar la imagen');
      },
    });
  }

  requestDelete(id: number) {
    this.pendingDeleteId.set(id);
    this.confirmOpen.set(true);
  }

  cancelDelete() {
    this.confirmOpen.set(false);
    this.pendingDeleteId.set(null);
  }
}
