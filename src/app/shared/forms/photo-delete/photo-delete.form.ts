import { Component, inject, signal } from '@angular/core';
import { GalleryService } from '../../../core/services/gallery.service';
import { Img } from '../../../data/interfaces/database/img.interface';

@Component({
  selector: 'form-photo-delete',
  imports: [],
  templateUrl: './photo-delete.form.html',
  styleUrl: './photo-delete.form.css',
})
export class PhotoDelete {
  private imageService = inject(GalleryService);
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
        this.images.update((imgs) => imgs.filter((img) => img.id !== id));
      },
    });
  }
}
