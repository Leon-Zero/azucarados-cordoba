import { Component, signal } from '@angular/core';
import { CrudControls } from '../../../../../shared/ui/crud-controls/crud-controls';
import { DisabledCrud } from '../../../../../data/interfaces/types/disabledCrud';
import { BlogAddForm } from "../../../../../shared/forms/blog-add/blog-add.form";
import { BlogDeleteForm } from "../../../../../shared/forms/blog-delete/blog-delete.form";

@Component({
  selector: 'app-edit-blog',
  imports: [CrudControls, BlogAddForm, BlogDeleteForm],
  templateUrl: './edit-blog.page.html',
  styleUrl: './edit-blog.page.css',
})
export class EditBlogPage {

  _selectOpt = signal<DisabledCrud>('');
  _object = signal<any>([]);

  selectOpt(opt: DisabledCrud): void {
    this._selectOpt.set(opt);
  }
}
