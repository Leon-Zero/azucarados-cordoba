import { Routes } from '@angular/router';
import { HomePage } from '../pages/home/home.page';
import { DonationsPage } from '../pages/donations/donations.page';
import { ContactPage } from '../pages/contact/contact.page';
import { GalleryPage } from '../pages/gallery/gallery.page';
import { NotFoundPage } from '../pages/not-found/not-found.page';
import { BlogPage } from '../pages/blog/blog.page';
import { EditorPage } from '../pages/editor/editor.page';
import { CrudAdminPage } from '../pages/crud-admin/crud-admin.page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomePage },
  { path: 'donaciones', component: DonationsPage },
  { path: 'nuestros-peludos', redirectTo: 'nuestros-peludos/pagina/1', pathMatch: 'full' },
  { path: 'nuestros-peludos/pagina/:page', component: GalleryPage },
  { path: 'contacto', component: ContactPage },
  { path: 'blog', redirectTo: 'blog/pagina/1', pathMatch: 'full' },
  { path: 'blog/pagina/:page', component: BlogPage },
  { path: 'admin', component: CrudAdminPage },
  { path: 'editor', component: EditorPage },
  { path: '**', component: NotFoundPage },
];
