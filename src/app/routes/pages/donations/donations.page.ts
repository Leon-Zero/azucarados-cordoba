import { Component, inject, PLATFORM_ID } from '@angular/core';
import { HeaderLayout } from '../../../shared/layouts/header/header.layout';
import { Btn } from '../../../shared/ui/btn/btn';
import { TextFloatComponent } from '../../../shared/components/text-float/text-float.component';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-donations',
  imports: [HeaderLayout, Btn, TextFloatComponent],
  templateUrl: './donations.page.html',
  styleUrl: './donations.page.css',
})
export class DonationsPage {
  private platformId = inject(PLATFORM_ID);

  enviarWhatsApp(text: string) {
    if (!isPlatformBrowser(this.platformId)) return;

    const telefono = environment.telefono;
    const mensaje = text;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, '_blank');
  }
}
