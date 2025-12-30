import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
import { Btn } from '../../ui/btn/btn';
import { GalleryService } from '../../../core/services/gallery.service';
import { Img } from '../../../data/interfaces/database/img.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-gallery',
  imports: [Btn, RouterLink],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery {
  private galleryService = inject(GalleryService);
  topImg = signal<Img[]>([]);

  ngOnInit() {
    this.galleryService.getLastImages(10).subscribe((items) => {
      this.topImg.set(items);
    });
  }
}
