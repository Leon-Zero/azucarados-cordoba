import { NgClass } from '@angular/common';
import { Component, Input, signal } from '@angular/core';
import { SizeButton } from '../../../data/interfaces/size-button.interface';

@Component({
  selector: 'app-btn',
  imports: [NgClass],
  templateUrl: './btn.html',
  styleUrl: './btn.css',
})
export class Btn {
  @Input() size = signal<SizeButton>('medium');
}
