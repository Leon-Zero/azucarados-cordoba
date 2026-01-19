import { NgTemplateOutlet } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { ScrollTransition } from '../../features/directives/scroll-transition';

@Component({
  selector: 'app-text-float',
  imports: [NgTemplateOutlet, ScrollTransition],
  templateUrl: './text-float.component.html',
  styleUrl: './text-float.component.css',
})
export class TextFloatComponent {
  @Input() side: 'left' | 'right' = 'left';
  @Input() img!: string;
  @ContentChild('content', { read: TemplateRef })
  contentTpl!: TemplateRef<any>;
}
