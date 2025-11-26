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
}
