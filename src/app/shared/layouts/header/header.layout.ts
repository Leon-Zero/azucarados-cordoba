import { Component, input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [NgClass],
  templateUrl: './header.layout.html',
  styleUrl: './header.layout.css',
})
export class HeaderLayout {
  // @Input() spacingColor = signal<boolean>(false);
  // @Input() imgBanner = signal<string>('');
  spacingColor = input<boolean>(false);
  imgBanner = input<string>('')
}
