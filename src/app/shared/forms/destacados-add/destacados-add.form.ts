import { Component, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DestacadoService } from '../../../core/services/destacado.service';
import { Btn } from "../../ui/btn/btn";
import { Destacado } from '../../../data/interfaces/database/destacado.interface';

@Component({
  selector: 'form-destacados-add',
  imports: [Btn, ReactiveFormsModule],
  templateUrl: './destacados-add.form.html',
  styleUrl: './destacados-add.form.css',
})
export class DestacadosAddForm {
  private fb = inject(FormBuilder);
  private destacadosService = inject(DestacadoService);
  object = input<any>([]);
  onEdit = input<boolean>(false);

  destacadosForm = this.fb.group({
    id: ['', Validators.required],
    text: ['', [Validators.required, Validators.minLength(8)]],
    img: ['',
      [
        Validators.required,
        Validators.pattern(
          // patrón simple para URL
          /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))/i
        ),
      ],
    ],
  });

  // getters para validaciones
  get text() {
    return this.destacadosForm.get('text')!;
  }
  get img() {
    return this.destacadosForm.get('img')!;
  }
  get id() {
    return this.destacadosForm.get('id')!;
  }

  //setter en edit mode
  setInputs() {
    this.destacadosForm.setValue({
      id: this.object().id,
      img: this.object().img,
      text: this.object().text
    });
  }

  constructor() {
    effect(() => {
      const obj = this.object();
      if (!obj || Object.keys(obj).length === 0) return;
      if (this.onEdit()) {
        this.setInputs();
      }
    });
  }

  onSubmit() {
    if (this.destacadosForm.invalid) {
      this.destacadosForm.markAllAsTouched();
      return;
    }
    const newDestacado: any = this.destacadosForm.value;
    console.log('POST a json-server:', newDestacado);
    if (!this.onEdit()) {
      this.sendPost(newDestacado);
    } else {
      this.sendPut(this.object().id, newDestacado);
    }
  }

  sendPost(newDestacado: Destacado) {
    this.destacadosService.addDestacado(newDestacado).subscribe({
      next: (res) => {
        console.log('Destacado guardada:', res);
        this.destacadosForm.reset();
      },
      error: (err) => {
        console.error('Error al guardar Destacado', err);
      }
    });
  }

  sendPut(id: number, newDestacado: Destacado) {
    this.destacadosService.editDestacado(id, newDestacado).subscribe({
      next: (res) => {
        console.log('Destacado actualizado:', res);
        this.destacadosForm.reset({});
      }, error: (err => {
        console.error('error al actualizar Destacado', err);
      })
    })
  }

}
