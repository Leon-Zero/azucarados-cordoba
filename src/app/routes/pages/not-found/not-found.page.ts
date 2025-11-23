import { Component, signal } from '@angular/core';
import { Btn } from '../../../shared/ui/btn/btn';
import { SizeButton } from '../../../data/interfaces/size-button.interface';

@Component({
  selector: 'app-not-found',
  imports: [Btn],
  templateUrl: './not-found.page.html',
  styleUrl: './not-found.page.css',
})
export class NotFoundPage {
  _size = signal<SizeButton>('large');
}
