import { Component, Input, signal } from '@angular/core';
import { Img } from '../../../data/interfaces/database/img.interface';

@Component({
  selector: 'app-main-galery',
  imports: [],
  templateUrl: './main-galery.component.html',
  styleUrl: './main-galery.component.css',
})
export class MainGaleryComponent {
  @Input() paginatedItems: Img[] = [];
}
