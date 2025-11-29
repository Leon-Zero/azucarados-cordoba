import { Component, computed, inject, signal } from '@angular/core';
import { HeaderLayout } from '../../../shared/layouts/header/header.layout';
import { PagControl } from '../../../shared/ui/pag-control/pag-control';
import { ActivatedRoute, Router } from '@angular/router';
import { PaginationService } from '../../../core/services/pagination.service';
import { MainGaleryComponent } from '../../../shared/components/main-galery/main-galery.component';
import { GalleryService } from '../../../core/services/gallery.service';
import { Img } from '../../../data/interfaces/img.interface';

@Component({
  selector: 'app-gallery',
  imports: [HeaderLayout, PagControl, MainGaleryComponent],
  templateUrl: './gallery.page.html',
  styleUrl: './gallery.page.css',
})
export class GalleryPage {
  private galleryService = inject(GalleryService);
  private pagination = inject(PaginationService);
  _imgBanner = signal<string>('/banner-galeria.png');

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.loadImages();

    this.route.paramMap.subscribe((params) => {
      const page = Number(params.get('page')) || 1;
      this.pagination.setPage(page);
    });
  }

  loadImages() {
    this.galleryService.getAllImages().subscribe((items: Img[]) => {
      this.pagination.setItems(items);
      this.pagination.setItemsPerPage(12);
    });
  }

  get currentPage() {
    return this.pagination.currentPage();
  }
  get totalPages() {
    return this.pagination.totalPages();
  }
  get paginatedItems() {
    return this.pagination.paginatedItems();
  }

  goToPage(page: number) {
    this.pagination.setPage(page);
    this.router.navigate(['/nuestros-peludos/pagina', page]);
  }
}
