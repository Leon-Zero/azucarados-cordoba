import { Component, Input, signal } from '@angular/core';
import { Btn } from '../../ui/btn/btn';

@Component({
  selector: 'app-card',
  imports: [Btn],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  @Input() _img = '';
}
