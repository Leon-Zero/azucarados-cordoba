import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-modal-confirm',
  imports: [],
  templateUrl: './modal-confirm.html',
  styleUrl: './modal-confirm.css',
})
export class ModalConfirm {
  open = input<boolean>(false);
  title = input<string>('Confirmar acción');
  message = input<string>('¿Estás seguro de continuar?');
  confirmText = input<string>('Aceptar');
  cancelText = input<string>('Cancelar');

  confirm = output<void>();
  cancel = output<void>();

  onConfirm() {
    this.confirm.emit();
  }

  onCancel() {
    this.cancel.emit();
  }
}
