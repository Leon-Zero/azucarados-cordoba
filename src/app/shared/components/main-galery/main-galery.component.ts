import { Component, Input, signal } from '@angular/core';
import { Gallery } from '../../../data/interfaces/gallery.interface';

@Component({
  selector: 'app-main-galery',
  imports: [],
  templateUrl: './main-galery.component.html',
  styleUrl: './main-galery.component.css',
})
export class MainGaleryComponent {
  @Input() paginatedItems: any = [];
}
