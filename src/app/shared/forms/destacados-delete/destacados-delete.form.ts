import { Component, inject, signal } from '@angular/core';
import { DestacadoService } from '../../../core/services/destacado.service';
import { Destacado } from '../../../data/interfaces/database/destacado.interface';

@Component({
  selector: 'form-destacados-delete',
  imports: [],
  templateUrl: './destacados-delete.form.html',
  styleUrl: './destacados-delete.form.css',
})
export class DestacadosDeleteForm {

  private destacadoService = inject(DestacadoService);

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

  deleteDestacado(id: number) {
    console.log(typeof id, id);
    this.destacadoService.deleteDestacado(id).subscribe(
      {
        next: () => {
          this.destacadoService.updateDestacado(id);
        }
      }
    );
  }

  get destacados() {
    return this.destacadoService.destacadoItem();
  }

}
