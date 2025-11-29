import { Component, Input, signal } from '@angular/core';
import { DisabledCrud } from '../../../data/interfaces/disabledCrud';

@Component({
  selector: 'app-crud-controls',
  imports: [],
  templateUrl: './crud-controls.html',
  styleUrl: './crud-controls.css',
})
export class CrudControls {
  @Input() onDisabled: DisabledCrud = '';
}
