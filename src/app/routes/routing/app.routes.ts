import { Routes } from '@angular/router';
import { HomePage } from '../pages/home/home.page';
import { DonationsPage } from '../pages/donations/donations.page';
import { ContactPage } from '../pages/contact/contact.page';
import { GalleryPage } from '../pages/gallery/gallery.page';
import { NotFoundPage } from '../pages/not-found/not-found.page';
import { BlogPage } from '../pages/blog/blog.page';
import { adminGuard } from '../guards/auth-guard';
import { AuthPage } from '../pages/auth/auth.page';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },

  { path: 'home', component: HomePage },
  { path: 'donaciones', component: DonationsPage },
  { path: 'nuestros-peludos', redirectTo: 'nuestros-peludos/pagina/1', pathMatch: 'full' },
  { path: 'nuestros-peludos/pagina/:page', component: GalleryPage },
  { path: 'contacto', component: ContactPage },
  { path: 'blog', redirectTo: 'blog/pagina/1', pathMatch: 'full' },
  { path: 'blog/pagina/:page', component: BlogPage },
  {
    path: 'blog/articulo/:slug',
    loadComponent: () =>
      import('../pages/article/article.page')
        .then(m => m.ArticlePage)
  },

  { path: 'login', component: AuthPage },

  /* ADMIN acceso a crud */
  {
    path: 'admin',
    canActivate: [adminGuard],
    canActivateChild: [adminGuard],
    loadChildren: () =>
      import('../routing/admin.routes').then(m => m.admin),
  },
  { path: '**', component: NotFoundPage },
];
