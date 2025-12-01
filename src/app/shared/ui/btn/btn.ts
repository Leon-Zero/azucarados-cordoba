import { NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { SizeButton } from '../../../data/interfaces/types/size-button.interface';

@Component({
  selector: 'app-btn',
  imports: [NgClass],
  templateUrl: './btn.html',
  styleUrl: './btn.css',
})
export class Btn {
  size = input<SizeButton>('medium');
}
