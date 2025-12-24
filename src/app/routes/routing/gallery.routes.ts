import { Routes } from '@angular/router';
import { GalleryPage } from '../pages/gallery/gallery.page';

export const galleryRoutes: Routes = [
  { path: '', redirectTo: 'pagina/1', pathMatch: 'full' },

  {
    path: 'pagina/:page',
    component: GalleryPage
  }
];
