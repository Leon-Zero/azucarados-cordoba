import { Injectable, signal } from '@angular/core';
import { ToastMessage, ToastType } from '../../data/interfaces/types/toast.interface';

@Injectable({ providedIn: 'root' })
export class ToastService {

  private _messages = signal<ToastMessage[]>([]);
  readonly messages = this._messages.asReadonly();

  private counter = 0;

  show(text: string, type: ToastType = 'info') {
    const id = this.counter++;
    const msg: ToastMessage = { id, text, type };

    this._messages.update((list) => [...list, msg]);

    // Eliminar después de 3s
    setTimeout(() => this.dismiss(id), 3000);
  }

  success(text: string) {
    this.show(text, 'success');
  }

  error(text: string) {
    this.show(text, 'error');
  }

  dismiss(id: number) {
    this._messages.update((list) => list.filter(m => m.id !== id));
  }
}
