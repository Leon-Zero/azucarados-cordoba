import { Component, signal } from '@angular/core';
import { CrudControls } from '../../../../../shared/ui/crud-controls/crud-controls';
import { DestacadosAddForm } from "../../../../../shared/forms/destacados-add/destacados-add.form";
import { DisabledCrud } from '../../../../../data/interfaces/types/disabledCrud';
import { DestacadosDeleteForm } from "../../../../../shared/forms/destacados-delete/destacados-delete.form";
import { Destacado } from '../../../../../data/interfaces/database/destacado.interface';

@Component({
  selector: 'app-edit-destacados',
  imports: [CrudControls, DestacadosAddForm, DestacadosDeleteForm],
  templateUrl: './edit-destacados.page.html',
  styleUrl: './edit-destacados.page.css',
})
export class EditDestacadosPage {
  _selectOpt = signal<DisabledCrud>('');
  _object = signal<any>([]);

  selectOpt(opt: DisabledCrud): void {
    this._selectOpt.set(opt);
  }

}
