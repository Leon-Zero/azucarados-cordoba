import { Component, inject, input, output } from '@angular/core';
import { DestacadoService } from '../../../core/services/destacado.service';
import { ToastService } from '../../../core/services/toast.service';
import { deleteDestacadoFolder } from '../../../core/utils/firebase-delete';

@Component({
  selector: 'form-destacados-delete',
  imports: [],
  templateUrl: './destacados-delete.form.html',
  styleUrl: './destacados-delete.form.css',
})
export class DestacadosDeleteForm {
  private destacadoService = inject(DestacadoService);
  private toastService = inject(ToastService);
  object = output();
  onEdit = input<boolean>(false);

  get destacados() {
    return this.destacadoService.destacadoItem();
  }

  setObject(obj: any): void {
    return this.object.emit(obj);
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

  getForId(id: number) {
    this.destacadoService.getDestacoForId(id).subscribe({
      next: (res) => {
        console.log('item por id', res);
        this.setObject(res);
        this.destacadoService.scrollToEdit();
      },
      error: (err) => {
        console.log('error al buscar por id', err);
      },
    });
  }

  async deleteDestacado(id: number) {
    try {
      await deleteDestacadoFolder(id);
      this.destacadoService.deleteDestacado(id).subscribe({
        next: () => {
          this.toastService.success('Destacado eliminado con éxito!');
          this.destacadoService.updateDestacado(id);
        },
        error: (err) => {
          this.toastService.error('ERROR al eliminar destacado');
          console.error(err);
        },
      });
    } catch (err) {
      console.error('Error eliminando imágenes del destacado', err);
      this.toastService.error('Error eliminando imágenes del destacado');
    }
  }
}
