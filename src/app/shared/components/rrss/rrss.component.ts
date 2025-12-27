import { Component, signal } from '@angular/core';

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
      alt: '',
    },
    {
      id: 2,
      src: '/icon-instagram.svg',
      alt: 'instagram by maninderkaur',
    },
    {
      id: 3,
      src: '/icon-facebook.svg',
      alt: 'Facebook by Pixel Icons',
    },
  ]);
}
