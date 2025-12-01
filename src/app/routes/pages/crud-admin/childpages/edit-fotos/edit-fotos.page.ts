import { Component, signal } from '@angular/core';
import { CrudControls } from '../../../../../shared/ui/crud-controls/crud-controls';
import { DisabledCrud } from '../../../../../data/interfaces/types/disabledCrud';
import { PhotoDelete } from "../../../../../shared/forms/photo-delete/photo-delete.form";
import { PhotoAddForm } from "../../../../../shared/forms/photo-add/photo-add.form";

@Component({
  selector: 'app-edit-fotos',
  imports: [CrudControls, PhotoDelete, PhotoAddForm],
  templateUrl: './edit-fotos.page.html',
  styleUrl: './edit-fotos.page.css',
})
export class EditFotosPage {
  _onDisabled = signal<DisabledCrud>('edit');
  _selectOpt = signal<DisabledCrud>('');

  selectOpt(opt: DisabledCrud): void {
    this._selectOpt.set(opt);
  }
}
