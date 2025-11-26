import { Component, signal } from '@angular/core';
import { Btn } from '../../ui/btn/btn';
import { SizeButton } from '../../../data/interfaces/size-button.interface';

@Component({
  selector: 'form-contact',
  imports: [Btn],
  templateUrl: './contact.form.html',
  styleUrl: './contact.form.css',
})
export class ContactForm {
  _size = signal<SizeButton>('large');
  mail: string = 'leon.cba09@gmail.com';
  asunto: string = 'WEB Azucarados Cordoba - form. contacto';
  web: string = 'http://localhost:4200';
  autoResponse: string = `Muchas gracias por escribir, su consulta será analizada y me estaré comunicando a la brevedad.
    Atte.: Azucarados Córdoba`;
  return: string = this.web;
  contactMethod: 'telefono' | 'mail' | null = null;

  onContactMethodChange(value: 'telefono' | 'mail') {
    this.contactMethod = value;
  }
}
