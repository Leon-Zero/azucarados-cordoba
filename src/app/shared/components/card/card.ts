import { Component, Input, signal } from '@angular/core';
import { Btn } from '../../ui/btn/btn';
import { SizeButton } from '../../../data/interfaces/size-button.interface';

@Component({
  selector: 'app-card',
  imports: [Btn],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() _img = '';
  _size = signal<SizeButton>('medium');
}
