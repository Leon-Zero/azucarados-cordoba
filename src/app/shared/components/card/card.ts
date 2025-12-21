import { Component, input } from '@angular/core';
import { Btn } from '../../ui/btn/btn';

@Component({
  selector: 'app-card',
  imports: [Btn],
  templateUrl: './card.html',
  styleUrl: './card.css',
})
export class Card {
  _img = input.required<string>();
  _url = input.required<string>();
  _icon = input.required<string>();

}
