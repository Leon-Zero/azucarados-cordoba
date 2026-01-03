import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Destacado } from '../../data/interfaces/database/destacado.interface';
import { map, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DestacadoService {

  private http = inject(HttpClient);
  private baseUrl = environment.urlBack + '/destacado';
  private _destacadoItem = signal<Destacado[]>([]);

  // getter y setter
  readonly destacadoItem = this._destacadoItem.asReadonly;
  setDestacado(dest: Destacado[]) {
    this._destacadoItem.set(dest);
  }
  updateDestacado(id: number) {
    this._destacadoItem.update((upd) => upd.filter((upd: any) => upd.id !== id));
  }
  // ------------

  getAllDestacados() : Observable<Destacado[]> {
    return this.http.get<Destacado[]>(this.baseUrl);
  }

  refreshDestacados() {
    this.getAllDestacados().subscribe(res => {
      this.setDestacado(res);
    });
  }

  getDestacoForId(id: number) {
    return this.http.get<Destacado[]>(`${this.baseUrl}/${id}`)
  }

  addDestacado(dest: Destacado) {
    return this.http.post(`${this.baseUrl}/create`, dest);
  }

  deleteDestacado(id: number) {
    return this.http.delete(`${this.baseUrl}/delete/${id}`);
  }

  editDestacado(data: Destacado) {
    return this.http.put<Destacado>(`${this.baseUrl}/edit`, data).pipe(
      tap(() => this.refreshDestacados())
    );
  }

  scrollToEdit() {
    const el = document.getElementById('form-edit');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToDelete() {
    const el = document.getElementById('form-delete');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }

  scrollToAdd() {
    const el = document.getElementById('form-add');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
