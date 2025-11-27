import { Component, signal } from '@angular/core';
import { Img } from '../../../data/interfaces/img.interface';

@Component({
  selector: 'app-rrss',
  imports: [],
  templateUrl: './rrss.component.html',
  styleUrl: './rrss.component.css',
})
export class RrssComponent {
  rrss = signal<Img[]>([
    {
      src: '/icon-whatsapp.svg',
      alt: '',
    },
    {
      src: '/icon-instagram.svg',
      alt: 'instagram by maninderkaur',
    },
    {
      src: '/icon-facebook.svg',
      alt: 'Facebook by Pixel Icons',
    },
  ]);
}
