import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { SizeButton } from '../../../data/interfaces/size-button.interface';
import { Btn } from '../btn/btn';

@Component({
  selector: 'app-pag-control',
  imports: [Btn],
  templateUrl: './pag-control.html',
  styleUrl: './pag-control.css',
})
export class PagControl {
  _size = signal<SizeButton>('xsmall');

  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();

  maxVisible = 7; // 👈 cantidad de páginas visibles por tramo

  get pages(): (number | string)[] {
    const pages: (number | string)[] = [];
    const half = Math.floor(this.maxVisible / 2);

    // rango base
    let start = Math.max(1, this.currentPage - half);
    let end = Math.min(this.totalPages, start + this.maxVisible - 1);

    // ajustamos el rango si estamos al final
    if (end - start < this.maxVisible - 1) {
      start = Math.max(1, end - this.maxVisible + 1);
    }

    // si hay más páginas al inicio
    if (start > 1) {
      pages.push(1);
      if (start > 2) pages.push('...');
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    // si hay más páginas al final
    if (end < this.totalPages) {
      if (end < this.totalPages - 1) pages.push('...');
      pages.push(this.totalPages);
    }

    return pages;
  }

  goTo(page: number | string) {
    if (typeof page === 'number') {
      this.pageChange.emit(page);
    }
  }

  next() {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  prev() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }
}
