import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Client
  },
  // {
  //   path: 'donaciones',
  //   renderMode: RenderMode.Server
  // },
  // {
  //   path: 'blog/pagina/:page',
  //   renderMode: RenderMode.Server
  // },
  // {
  //   path: 'blog/articulo/:slug',
  //   renderMode: RenderMode.Server
  // },
  // {
  //   path: 'nuestros-peludos/pagina/:page',
  //   renderMode: RenderMode.Server
  // }, 
  // {
  //   path: 'login',
  //   renderMode: RenderMode.Client
  // },
  // {
  //   path: 'admin',
  //   renderMode: RenderMode.Client
  // }
 
];
