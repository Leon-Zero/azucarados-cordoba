import { Component, signal } from '@angular/core';
import { Btn } from '../../ui/btn/btn';
import { SizeButton } from '../../../data/interfaces/size-button.interface';

@Component({
  selector: 'app-about-us',
  imports: [Btn],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css',
})
export class AboutUs {
  _size = signal<SizeButton>('large');
}
