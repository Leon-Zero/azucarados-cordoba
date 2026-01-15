import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Btn } from '../../ui/btn/btn';
import { TextFloatComponent } from '../text-float/text-float.component';
import { environment } from '../../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-us',
  imports: [Btn, TextFloatComponent, RouterLink],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css',
})
export class AboutUs {

  private platformId = inject(PLATFORM_ID);

  enviarWhatsApp(text: string) {
    if (!isPlatformBrowser(this.platformId)) return;

    const telefono = environment.telefono;
    const mensaje = text;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, '_blank');
  }
}
