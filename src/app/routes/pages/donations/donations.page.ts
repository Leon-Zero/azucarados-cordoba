import { Component, signal } from '@angular/core';
import { HeaderLayout } from '../../../shared/layouts/header/header.layout';
import { Btn } from '../../../shared/ui/btn/btn';
import { SizeButton } from '../../../data/interfaces/size-button.interface';

@Component({
  selector: 'app-donations',
  imports: [HeaderLayout, Btn],
  templateUrl: './donations.page.html',
  styleUrl: './donations.page.css',
})
export class DonationsPage {
  _imgBanner = signal<string>('/banner-donacion.png');
  _size = signal<SizeButton>('large');
  _spacingColor = signal<boolean>(true);
}
