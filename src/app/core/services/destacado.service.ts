import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Destacado } from '../../data/interfaces/database/destacado.interface';
import { map, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DestacadoService {

  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3005/destacados';
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

  getAllDestacados() {
    return this.http.get<Destacado[]>(this.baseUrl).pipe(
      map((items) => {
        const sorted = [...items].sort((a, b) => b.id - a.id);
        return sorted.map((dest, i) => ({
          id: dest.id,
          img: dest.img,
          text: dest.text,
        }));
      })
    );
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
    return this.http.post(`${this.baseUrl}`, dest);
  }

  deleteDestacado(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  editDestacado(id: number, data: Destacado) {
    return this.http.put<Destacado>(`${this.baseUrl}/${id}`, data).pipe(
      tap(() => this.refreshDestacados())
    );
  }
}
