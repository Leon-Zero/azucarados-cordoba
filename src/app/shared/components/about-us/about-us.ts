import { Component, inject, PLATFORM_ID } from '@angular/core';
import { Btn } from '../../ui/btn/btn';
import { TextFloatComponent } from '../text-float/text-float.component';
import { Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-about-us',
  imports: [Btn, TextFloatComponent],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css',
})
export class AboutUs {

  private router = inject(Router);
  private platformId = inject(PLATFORM_ID);

  
  goToDonation(){
    this.router.navigate(['/donaciones']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  enviarWhatsApp(text: string) {
    if (!isPlatformBrowser(this.platformId)) return;

    const telefono = environment.telefono;
    const mensaje = text;
    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, '_blank');
  }
}
