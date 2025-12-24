import { Routes } from '@angular/router';
import { CrudAdminPage } from '../pages/crud-admin/crud-admin.page';
import { EditDestacadosPage } from '../pages/crud-admin/childpages/edit-destacados/edit-destacados.page';
import { EditBlogPage } from '../pages/crud-admin/childpages/edit-blog/edit-blog.page';
import { EditFotosPage } from '../pages/crud-admin/childpages/edit-fotos/edit-fotos.page';


export const adminRoutes: Routes = [
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
