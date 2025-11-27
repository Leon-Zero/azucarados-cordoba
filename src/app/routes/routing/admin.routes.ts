import { Routes } from '@angular/router';
import { CrudAdminPage } from '../pages/crud-admin/crud-admin.page';
import { EditBlogPage } from '../pages/crud-admin/edit-blog/edit-blog.page';
import { EditFotosPage } from '../pages/crud-admin/edit-fotos/edit-fotos.page';
import { EditDestacadosPage } from '../pages/crud-admin/edit-destacados/edit-destacados.page';

export const admin: Routes = [
  {
    path: '',
    component: CrudAdminPage,
    children: [
      { path: 'edit-destacados', component: EditDestacadosPage },
      { path: 'edit-blog', component: EditBlogPage },
      { path: 'edit-fotos', component: EditFotosPage },
    ],
  },
];
