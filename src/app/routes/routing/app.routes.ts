import { Routes } from '@angular/router';
import { HomePage } from '../pages/home/home.page';
import { DonationsPage } from '../pages/donations/donations.page';
import { ContactPage } from '../pages/contact/contact.page';
import { NotFoundPage } from '../pages/not-found/not-found.page';
import { adminGuard } from '../guards/auth-guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomePage },
  { path: 'donaciones', component: DonationsPage },
  { path: 'contacto', component: ContactPage },
  { path: 'blog', loadChildren: () => import('../routing/blog.routes')
    .then((m) => m.blogRoutes) 
  },
  { path: 'nuestros-peludos', loadChildren: () => import('../routing/gallery.routes')
    .then((m) => m.galleryRoutes),
  },
  { path: 'login', loadComponent: () => import('../pages/auth/auth.page').then((m) => m.AuthPage) },
  /* ADMIN acceso a crud */
  {
    path: 'admin',
    canActivate: [adminGuard],
    canActivateChild: [adminGuard],
    loadChildren: () => import('../routing/admin.routes').then((m) => m.adminRoutes),
  },
  { path: '**', component: NotFoundPage },
];
