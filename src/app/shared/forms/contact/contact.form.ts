import { Component, signal } from '@angular/core';
import { Btn } from '../../ui/btn/btn';
import { SizeButton } from '../../../data/interfaces/types/size-button.interface';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'form-contact',
  imports: [Btn],
  templateUrl: './contact.form.html',
  styleUrl: './contact.form.css',
})
export class ContactForm {
  mail: string = environment.formsubmit_mail;
  asunto: string = 'WEB Azucarados Cordoba - form. contacto';
  web: string = 'https://azucarados-cordoba.web.app';
  autoResponse: string = `Muchas gracias por escribir, su consulta será analizada y me estaré comunicando a la brevedad.
    Atte.: Azucarados Córdoba; 
    email: ${this.mail}`;
  return: string = this.web;
  contactMethod: 'telefono' | 'mail' | null = null;

  onContactMethodChange(value: 'telefono' | 'mail') {
    this.contactMethod = value;
  }
}
