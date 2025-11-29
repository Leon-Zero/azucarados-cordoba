import { Component, signal } from '@angular/core';
import { Btn } from '../../../../shared/ui/btn/btn';
import { CrudControls } from '../../../../shared/ui/crud-controls/crud-controls';
import { DisabledCrud } from '../../../../data/interfaces/disabledCrud';

@Component({
  selector: 'app-edit-fotos',
  imports: [CrudControls],
  templateUrl: './edit-fotos.page.html',
  styleUrl: './edit-fotos.page.css',
})
export class EditFotosPage {
  _onDisabled = signal<DisabledCrud>('edit');
}
