import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Img } from '../../data/interfaces/img.interface';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3001/perros';

  /** Trae las últimas N imágenes (ordenado por id descendente) */
  getLastImages(limit: number) {
    return this.http.get<Img[]>(`${this.baseUrl}?_sort=id&_order=desc&_limit=${limit}`).pipe(
      map((items) =>
        items.map((img, i) => ({
          src: img.src,
          alt: img.alt ?? `Foto ${i + 1}`,
          id: img.id,
        }))
      )
    );
  }

  /** Trae TODAS las imágenes, pero ordenadas descendente (id mayor primero) */
  getAllImages() {
    return this.http.get<Img[]>(`${this.baseUrl}?_sort=id&_order=desc`).pipe(
      map((items) =>
        items.map((img, i) => ({
          src: img.src,
          alt: img.alt ?? `Foto ${i + 1}`,
          id: img.id,
        }))
      )
    );
  }
}
