import { Component, input, output } from '@angular/core';
import { DisabledCrud } from '../../../data/interfaces/types/disabledCrud';

@Component({
  selector: 'app-crud-controls',
  imports: [],
  templateUrl: './crud-controls.html',
  styleUrl: './crud-controls.css',
})
export class CrudControls {
  onDisabled = input<DisabledCrud>('');
  optionCrud = output<DisabledCrud>();

  selectCrud(opt: DisabledCrud): void {
    this.optionCrud.emit(opt);
  }
}
