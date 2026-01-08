import { Component, inject, input, output, signal } from '@angular/core';
import { DestacadoService } from '../../../core/services/destacado.service';
import { ToastService } from '../../../core/services/toast.service';
import { ModalConfirm } from '../../ui/modal-confirm/modal-confirm';

@Component({
  selector: 'form-destacados-delete',
  imports: [ModalConfirm],
  templateUrl: './destacados-delete.form.html',
  styleUrl: './destacados-delete.form.css',
})
export class DestacadosDeleteForm {
  private destacadoService = inject(DestacadoService);
  private toastService = inject(ToastService);

  object = output<any>();
  onEdit = input<boolean>(false);
  confirmOpen = signal(false);
  pendingDeleteId = signal<number | null>(null);

  get destacados() {
    return this.destacadoService.destacadoItem();
  }

  ngOnInit() {
    this.loadDestacados();
  }

  loadDestacados() {
    this.destacadoService.getAllDestacados().subscribe({
      next: (res) => {
        this.destacadoService.setDestacado(res);
      },
    });
  }

  setObject(obj: any): void {
    this.object.emit(obj);
  }

  getForId(id: number) {
    this.destacadoService.getDestacoForId(id).subscribe({
      next: (res) => {
        this.setObject(res);
        this.destacadoService.scrollToEdit();
      },
      error: (err) => {
        console.error('error al buscar por id', err);
      },
    });
  }

  async confirmDelete() {
    const id = this.pendingDeleteId();
    if (id === null) return;

    this.destacadoService.deleteDestacado(id).subscribe({
      next: () => {
        this.toastService.success('Destacado eliminado con éxito!');
        this.destacadoService.updateDestacado(id);
        this.cancelDelete();
      },
      error: (err) => {
        console.error(err);
        this.toastService.error('ERROR al eliminar destacado');
      },
    });
  }

  requestDelete(id: number) {
    this.pendingDeleteId.set(id);
    this.confirmOpen.set(true);
  }
  cancelDelete() {
    this.confirmOpen.set(false);
    this.pendingDeleteId.set(null);
  }
}
