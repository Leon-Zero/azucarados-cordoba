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
  _spacingColor = signal<boolean>(true);
  _imgBanner = signal<string>('/banner-home.png');

  _gallery = signal<string[]>([
    'https://www.ladridosybigotes.com/content/images/2024/10/2024-08-13-animal-hoarding-disorder.webp',
    'https://www.veggieanimals.com/img/ybc_blog/post/thumb/thumbmaimascotas.jpg',
    'https://www.canal12misiones.com/wp-content/uploads/2023/12/0000-g00pit.jpg',
    'https://dus6dayednven.cloudfront.net/app/uploads/2022/05/1-DSC00855-Editar_baja.jpg',
    'https://images.pagina12.com.ar/styles/focal_content_1200x1050/public/2022-07/583430-mascotas_0.jpg?h=7d6ffc47&itok=OExsV-1h',
    'https://www.lanacion.com.ar/resizer/v2/mascotas-en-el-hospital-los-centros-de-salud-BGQZPDNVEJGKPGXWPE5UD67CQU?auth=5b214fdf7494b049b767843efa4569990330a7289e9b452ff9d62e974a7dc6b9&width=420&height=280&quality=70&smart=true',
    'https://www.fedpat.com.ar/wp-content/uploads/2017/09/mascotas3-web-fedpat-scaled.jpg',
    'https://escuelainenka.com/wp-content/uploads/auxiliar-de-veterinaria.jpg',
    'https://img.freepik.com/foto-gratis/vista-frontal-veterinaria-examinando-perro-mesa_23-2147928403.jpg?semt=ais_hybrid&w=740&q=80',
    'https://www.fundacionclinicadelafamilia.org/wp-content/uploads/2024/04/el-poder-curativo-de-las-mascotas-2-1024x896-1024x896.jpg',
  ]);
}
