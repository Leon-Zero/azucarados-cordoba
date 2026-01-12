import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { HeaderLayout } from '../../../shared/layouts/header/header.layout';
import { Btn } from '../../../shared/ui/btn/btn';
import { TextFloatComponent } from '../../../shared/components/text-float/text-float.component';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { DonationItem } from '../../../data/interfaces/database/donation.interface';

@Component({
  selector: 'app-donations',
  imports: [HeaderLayout, Btn, TextFloatComponent],
  templateUrl: './donations.page.html',
  styleUrl: './donations.page.css',
})
export class DonationsPage {
  private platformId = inject(PLATFORM_ID);
  donations = signal<DonationItem[]>([
    {
      item: 'Insulinas',
      img: '/donations/insulinas.png',
      description: "las insulinas que más se necesitan son: Lantus, Levemir, Humalog, Insulatard, NPH, Novorapid, ETC. Los animales usan tanto medicamentos para humanos como veterinarios (caninsulin)."
    },
    {
      item: 'Tiras de glucemia',
      img: '/donations/tiras-glucemia.jpg',
      description: 'Tiras reactivas para medir glucemia, las marcas/modelos mas comunes son de las siguientes: Accucheck, One Touch, Free Style, March II, ETC. existen diversas marcas en el mercado, con distintas características pero todas cumplen la misma función y son utiles.',
    },
    {
      item: 'Insumos varios',
      img: '/donations/insumos-varios.webp',
      description: 'jeringas y agujas descartables, agujas de flexpen (agujas de lapiceras de insulinas), lancetas para punción, lapicera para punción, etc. Aquellos insumos, descartables o no, que se utilizan para el control diario de la diabetes en humanos son los mismo en animales.',
    },
    {
      item: 'Glucometros',
      img: '/donations/glucometros.png',
      description: 'marcas mas comunes: Accucheck, One Touch, Free Style, March II, ETC. existen diversas marcas en el mercado, con distintas características pero todas cumplen la misma función y son utiles.',
    },
    {
      item: 'Medicamentos Veterinarios',
      img: '/donations/medicamentos-veterinarios.png',
      description: 'Cualquier medicamento veterinario que pueda ser útil para el tratamiento de animales diabéticos, como antibióticos, antiinflamatorios, suplementos nutricionales; o medicamentos para tratar enfermedades o sintomas como consecuencia del daño de la diabetes. Todo medicamento vetterianario es util y puede servirnos.',
    },
  ]);

  enviarWhatsApp(text: string) {
    if (!isPlatformBrowser(this.platformId)) return;

    const telefono = environment.telefono;
    const mensaje = text;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, '_blank');
  }
}
