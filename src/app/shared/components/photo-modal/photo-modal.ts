import { Component, computed, DOCUMENT, effect, HostListener, inject, input, output, PLATFORM_ID, signal } from '@angular/core';
import { Img } from '../../../data/interfaces/database/img.interface';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-photo-modal',
  imports: [],
  templateUrl: './photo-modal.html',
  styleUrl: './photo-modal.css',
})
export class PhotoModal {
  items = input.required<Img[]>();
  open = input<boolean>(false);
  startIndex = input<number>(0);
  close = output<void>();

  index = signal<number>(0);
  image = computed(() => this.items()[this.index()]);
  total = computed(() => this.items().length);

  // platform & document
  private platformId = inject(PLATFORM_ID);
  private document = inject(DOCUMENT);
  private isBrowser = isPlatformBrowser(this.platformId);

  constructor() {
    effect(() => {
      if (!this.isBrowser) return;

      if (this.open()) {
        this.index.set(this.startIndex());
        this.document.body.style.overflow = 'hidden';
      } else {
        this.document.body.style.overflow = '';
      }
    });
  }

  next() {
    this.index.update(i => (i + 1) % this.total());
  }

  prev() {
    this.index.update(i => (i - 1 + this.total()) % this.total());
  }

  closeModal() {
    this.close.emit();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeys(e: KeyboardEvent) {
    if (!this.isBrowser || !this.open()) return;

    switch (e.key) {
      case 'Escape':
        this.closeModal();
        break;
      case 'ArrowRight':
        this.next();
        break;
      case 'ArrowLeft':
        this.prev();
        break;
    }
  }
}
