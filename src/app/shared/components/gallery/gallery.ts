import { Component, inject, Input, signal, SimpleChanges } from '@angular/core';
import { Btn } from '../../ui/btn/btn';
import { GalleryService } from '../../../core/services/gallery.service';
import { Img } from '../../../data/interfaces/database/img.interface';
import { Router} from "@angular/router";
import { ScrollTransition } from '../../features/directives/scroll-transition';

@Component({
  selector: 'app-gallery',
  imports: [Btn, ScrollTransition],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery {
  private galleryService = inject(GalleryService);
  private router = inject(Router);
  topImg = signal<Img[]>([]);

  ngOnInit() {
    this.galleryService.getLastImages(10).subscribe((items) => {
      this.topImg.set(items);
    });
  }

  goToGallery(){
    this.router.navigate(['/nuestros-peludos']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
