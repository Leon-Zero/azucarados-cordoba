import { Component, Input, signal, SimpleChanges } from '@angular/core';
import { Btn } from '../../ui/btn/btn';
import { SizeButton } from '../../../data/interfaces/size-button.interface';

@Component({
  selector: 'app-gallery',
  imports: [Btn],
  templateUrl: './gallery.html',
  styleUrl: './gallery.css',
})
export class Gallery {
  @Input() photos = signal<string[]>([]);
  _size = signal<SizeButton>('large');
}
