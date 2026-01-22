import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'blog/pagina/:page',
    renderMode: RenderMode.Client
  },
  {
    path: 'blog/articulo/:slug',
    renderMode: RenderMode.Client
  },
  {
    path: 'nuestros-peludos/pagina/:page',
    renderMode: RenderMode.Client
  }, 
  {
    path: 'login',
    renderMode: RenderMode.Client
  },
  {
    path: 'admin',
    renderMode: RenderMode.Client
  },
    // {
  //   path: 'donaciones',
  //   renderMode: RenderMode.Server
  // },
 
];
