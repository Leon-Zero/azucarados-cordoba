import { Component, signal } from '@angular/core';
import { HeaderLayout } from '../../../shared/layouts/header/header.layout';
import { Btn } from '../../../shared/ui/btn/btn';
import { TextFloatComponent } from '../../../shared/components/text-float/text-float.component';
import { DonationItem } from '../../../data/interfaces/database/donation.interface';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-donations',
  imports: [HeaderLayout, Btn, TextFloatComponent, RouterLink],
  templateUrl: './donations.page.html',
  styleUrl: './donations.page.css',
})
export class DonationsPage {
  donations = signal<DonationItem[]>([
    {
      item: 'Insulinas',
      img: '/donations/insulinas.png',
      description: "Las insulinas que más se necesitan son: Lantus, Levemir, Humalog, Insulatard, NPH, Novorapid, entre otras. Las mascotas pueden utilizar tanto insulinas de uso humano como así también las veterinarias (por ejemplo, Caninsulin), siempre bajo indicación profesional"
    },
    {
      item: 'Glucometros',
      img: '/donations/glucometros.png',
      description: 'Se aceptan glucómetros de diferentes marcas, como por ejemplo: Accu-Chek, OneTouch, FreeStyle, March II, entre otros. Cada modelo puede tener distintas funcionalidades, pero todos permiten realizar el control de glucemia, que es fundamental para el seguimiento del tratamiento.'
    },
    {
      item: 'Tiras reactivas para utilizar en glucómetros',
      img: '/donations/tiras-glucemia.jpg',
      description: 'Se aceptan tiras reactivas para medir la glucemia. Las marcas y modelos más comunes son: Accu-Chek, OneTouch, FreeStyle, March II, entre otros. Existen muchas marcas en el mercado, con distintas características, pero todas cumplen la misma función y son útiles para el control diario.'
    },
    {
      item: 'Insumos varios',
      img: '/donations/insumos-varios.webp',
      description: `Aceptamos todo tipo de insumos utilizados para el control de la diabetes, tanto descartables como reutilizables, tales como:
      <br><br>
      <ul>
        <li class="inner-list">Jeringas y agujas descartables</li>
        <li class="inner-list">Agujas para lapiceras de insulina (FlexPen)</li>
        <li class="inner-list">Lancetas para punción</li>
        <li class="inner-list">Dispositivos/lapiceras de punción</li>
      </ul>
      <br>
      Los insumos que se utilizan en humanos son los mismos que pueden utilizarse en animales.`,
    },
    
    {
      item: 'Medicamentos Veterinarios',
      img: '/donations/medicamentos-veterinarios.png',
      description: `Cualquier medicamento veterinario que pueda ser útil para el tratamiento de mascotas diabéticas es bienvenido, como por ejemplo:
      <br><br>
      <ul>
        <li class="inner-list">Antibióticos</li>
        <li class="inner-list">Antiinflamatorios</li>
        <li class="inner-list">Suplementos nutricionales</li>
        <li class="inner-list">Medicación para tratar enfermedades o síntomas asociados a la diabetes</li> 
      </ul>
      <br>
      Todo medicamento veterinario puede ser de ayuda para alguna mascota de la comunidad.
        `,
    },
  ]);

}
