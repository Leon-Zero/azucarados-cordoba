import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginationService<T> {
  private _items = signal<T[]>([]);
  private _itemsPerPage = signal<number>(12);
  private _currentPage = signal<number>(1);

  readonly items = this._items.asReadonly();
  readonly itemsPerPage = this._itemsPerPage.asReadonly();
  readonly currentPage = this._currentPage.asReadonly();
  readonly totalPages = computed(() => Math.ceil(this._items().length / this._itemsPerPage()));

  readonly paginatedItems = computed(() => {
    const start = (this._currentPage() - 1) * this._itemsPerPage();
    return this._items().slice(start, start + this._itemsPerPage());
  });

  // setter
  setItems(items: T[]) {
    this._items.set(items);
  }

  setItemsPerPage(count: number) {
    this._itemsPerPage.set(count);
  }

  setPage(page: number) {
    const total = this.totalPages();
    if (page >= 1 && page <= total) {
      this._currentPage.set(page);
    }
  }

  // navegacion
  nextPage() {
    if (this._currentPage() < this.totalPages()) {
      this._currentPage.update((v) => v + 1);
    }
  }

  prevPage() {
    if (this._currentPage() > 1) {
      this._currentPage.update((v) => v - 1);
    }
  }
}
