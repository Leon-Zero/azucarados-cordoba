import { Component, inject, input, output } from '@angular/core';
import { DestacadoService } from '../../../core/services/destacado.service';

@Component({
  selector: 'form-destacados-delete',
  imports: [],
  templateUrl: './destacados-delete.form.html',
  styleUrl: './destacados-delete.form.css',
})
export class DestacadosDeleteForm {

  private destacadoService = inject(DestacadoService);
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
    this.destacadoService.getDestacoForId(id).subscribe(
      {
        next: (res) => {
          console.log('item por id', res);
          this.setObject(res);
        }, error: (err) => {
          console.log('error al buscar por id', err);
        }
      }
    );
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



}
