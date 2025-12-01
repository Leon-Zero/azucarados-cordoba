import { Component, signal } from '@angular/core';
import { Btn } from '../../../shared/ui/btn/btn';
import { Card } from '../../../shared/components/card/card';
import { Gallery } from '../../../shared/components/gallery/gallery';
import { HeaderLayout } from '../../../shared/layouts/header/header.layout';
import { AboutUs } from '../../../shared/components/about-us/about-us';

@Component({
  selector: 'app-home',
  imports: [Card, Gallery, HeaderLayout, AboutUs],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage {

  data = [
    {
      img: 'https://www.zooplus.es/magazine/wp-content/uploads/2023/03/Ano-de-perro-en-humano.webp',
      text: 'Tipos de Insulinas',
    },
    {
      img: 'https://www.anicura.es/cdn-cgi/image/f=auto,fit=cover,w=640,h=640,g=auto,sharpen=1/AdaptiveImages/powerinit/52437/_SNI2031.jpg?stamp=a2efc90c9d13cd9fdc0f5f7a2e3b2231238dc8cf',
      text: 'como alimentar a nuestras mascotas',
    },
    {
      img: 'https://www.whiskas.com.ar/cdn-cgi/image/format=auto,q=90/sites/g/files/fnmzdf4921/files/2022-11/elever-un-Chaton-ses-premiers-mois.jpg',
      text: 'guia practica de veterinarios y profesionales',
    },
    {
      img: 'https://www.universodelasaludanimal.com/wp-content/uploads/sites/61/2021/07/Cacho-e-gato-juntos-no-chao-posando-pra-foto_3.jpg',
      text: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio, in temporibus! Esse omnis iure unde dignissimos molestiae nihil aliquam dolorum hic saepe, tenetur et',
    },
    {
      img: 'https://universidadeuropea.com/resources/media/images/medicina-veterinaria-1200x630.original.jpg',
      text: 'Texto largo pero no tanto hecho para probar la card entre otras cosas',
    },
    {
      img: 'https://blog.agrovetmarket.com/wp-content/uploads/2020/05/vet.jpg',
      text: ' ',
    },
  ];

}
