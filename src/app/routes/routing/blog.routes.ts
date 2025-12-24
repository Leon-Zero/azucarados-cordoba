import { Routes } from '@angular/router';
import { BlogPage } from '../pages/blog/blog.page';

export const blogRoutes: Routes = [
  { path: '', redirectTo: 'pagina/1', pathMatch: 'full' },

  {
    path: 'pagina/:page',
    component: BlogPage
  },

  {
    path: 'articulo/:slug',
    loadComponent: () =>
      import('../pages/article/article.page')
        .then(m => m.ArticlePage)
  }
];
