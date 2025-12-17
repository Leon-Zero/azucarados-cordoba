import { Component, effect, inject, input, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { DestacadoService } from '../../../core/services/destacado.service';
import { Btn } from "../../ui/btn/btn";
import { Destacado } from '../../../data/interfaces/database/destacado.interface';
import { ToastService } from '../../../core/services/toast.service';

@Component({
  selector: 'form-destacados-add',
  imports: [Btn, ReactiveFormsModule],
  templateUrl: './destacados-add.form.html',
  styleUrl: './destacados-add.form.css',
})
export class DestacadosAddForm {
 private fb = inject(FormBuilder);
  private destacadosService = inject(DestacadoService);
  private toastService = inject(ToastService);

  object = input<any>(null);
  onEdit = input<boolean>(false);

  destacadosForm = this.fb.group({
    id: [null],
    text: ['', [Validators.required, Validators.minLength(8)]],
    img: [
      '',
      [
        Validators.required,
        Validators.pattern(
          /(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp|svg))/i
        ),
      ],
    ],
    url: [
      '',
      Validators.pattern(/https?:\/\/.+/i)
    ],
    ico: [''],
  });

  /* GETTERS */
  get id() { return this.destacadosForm.get('id')!; }
  get text() { return this.destacadosForm.get('text')!; }
  get img() { return this.destacadosForm.get('img')!; }
  get url() { return this.destacadosForm.get('url')!; }
  get ico() { return this.destacadosForm.get('ico')!; }

  /* SETEO EN EDICIÓN */
  setInputs() {
    this.destacadosForm.setValue({
      id: this.object().id,
      text: this.object().text,
      img: this.object().img,
      url: this.object().url ?? '',
      ico: this.object().ico ?? '',
    });
  }

  constructor() {
    effect(() => {
      const obj = this.object();
      if (!obj || Object.keys(obj).length === 0) return;
      if (this.onEdit()) this.setInputs();
    });
  }

  onSubmit() {
    if (this.destacadosForm.invalid) {
      this.destacadosForm.markAllAsTouched();
      return;
    }

    const payload: any = this.destacadosForm.getRawValue();

    if (this.onEdit()) {
      const id = this.id.value;
      if (id == null) {
        this.toastService.error('ID inválido para edición');
        return;
      }
      this.sendPut(id, payload);
    } else {
      this.sendPost(payload);
    }
  }

  sendPost(data: Destacado) {
    this.destacadosService.addDestacado(data).subscribe({
      next: () => {
        this.toastService.success('Destacado guardado correctamente');
        this.destacadosForm.reset();
      },
      error: err => {
        this.toastService.error('ERROR al guardar Destacado');
        console.error(err);
      },
    });
  }

  sendPut(id: number, data: Destacado) {
    this.destacadosService.editDestacado(data).subscribe({
      next: () => {
        this.toastService.success('Destacado actualizado con éxito');
        this.destacadosForm.reset();
        this.destacadosService.scrollToDelete();
      },
      error: err => {
        this.toastService.error('ERROR al actualizar Destacado');
        console.error(err);
      },
    });
  }

}
