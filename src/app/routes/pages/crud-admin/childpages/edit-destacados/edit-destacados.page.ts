import { Component, signal } from '@angular/core';
import { CrudControls } from '../../../../../shared/ui/crud-controls/crud-controls';
import { DestacadosAddForm } from "../../../../../shared/forms/destacados-add/destacados-add.form";
import { DisabledCrud } from '../../../../../data/interfaces/types/disabledCrud';

@Component({
  selector: 'app-edit-destacados',
  imports: [CrudControls, DestacadosAddForm],
  templateUrl: './edit-destacados.page.html',
  styleUrl: './edit-destacados.page.css',
})
export class EditDestacadosPage {
  _selectOpt = signal<DisabledCrud>('');

  selectOpt(opt: DisabledCrud): void {
    this._selectOpt.set(opt);
  }
}
