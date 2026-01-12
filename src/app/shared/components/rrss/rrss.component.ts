import { Component, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-rrss',
  imports: [],
  templateUrl: './rrss.component.html',
  styleUrl: './rrss.component.css',
})
export class RrssComponent {

  rrss = signal([
    {
      id: 1,
      src: '/icon-whatsapp.svg',
      alt: 'whatsapp by anonymous author',
      href: `https://wa.me/${environment.telefono}`,
    },
    {
      id: 2,
      src: '/icon-instagram.svg',
      alt: 'Instagram by Pixel Icons',
      href: 'https://www.instagram.com/mascotasdiabeticascordoba/',
    },
  ]);

}
