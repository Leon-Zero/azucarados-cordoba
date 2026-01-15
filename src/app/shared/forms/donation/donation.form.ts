import { isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Btn } from "../../ui/btn/btn";

@Component({
  selector: 'app-donation',
  imports: [Btn, ReactiveFormsModule],
  templateUrl: './donation.form.html',
  styleUrl: './donation.form.css'
})
export class DonationForm {
  private fb = inject(FormBuilder);
  private platformId = inject(PLATFORM_ID);

  donationForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    barrio: ['', Validators.required],
    donationType: ['', Validators.required],
  });

  // getters
  get name() {
    return this.donationForm.get('name')!;
  }

  get barrio() {
    return this.donationForm.get('barrio')!;
  }

  get donationType() {
    return this.donationForm.get('donationType')!;
  }

  onSubmit() {
    if (this.donationForm.invalid) return;

    const { name, barrio, donationType } = this.donationForm.value;

    const mensaje =
      '¡Hola!\n' +
      '\n' +
      `Mi nombre es *${name}*.\n` +
      `¿Soy del barrio?: *${barrio}*\n` +
      `Quiero donar: *${donationType}*`;
      
    this.enviarWhatsApp(mensaje);
    this.donationForm.reset();
  }

  enviarWhatsApp(text: string) {
    if (!isPlatformBrowser(this.platformId)) return;

    const telefono = environment.telefono;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  }
}
