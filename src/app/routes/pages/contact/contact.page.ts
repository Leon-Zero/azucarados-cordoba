import { Component } from '@angular/core';
import { HeaderLayout } from '../../../shared/layouts/header/header.layout';
import { ContactForm } from '../../../shared/forms/contact/contact.form';
import { TextFloatComponent } from '../../../shared/components/text-float/text-float.component';

@Component({
  selector: 'app-contact',
  imports: [ContactForm, TextFloatComponent],
  templateUrl: './contact.page.html',
  styleUrl: './contact.page.css',
})
export class ContactPage {}
