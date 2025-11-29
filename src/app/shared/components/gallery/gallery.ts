import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
import { Btn } from '../../ui/btn/btn';
import { SizeButton } from '../../../data/interfaces/size-button.interface';
import { Img } from '../../../data/interfaces/img.interface';
import { GalleryService } from '../../../core/services/gallery.service';

@Component({
  selector: 'app-gallery',
  imports: [Btn],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery {
  _size = signal<SizeButton>('large');
  private galleryService = inject(GalleryService);
  topImg = signal<Img[]>([]);

  ngOnInit() {
    this.galleryService.getLastImages(10).subscribe((items) => {
      this.topImg.set(items);
    });
  }
}
