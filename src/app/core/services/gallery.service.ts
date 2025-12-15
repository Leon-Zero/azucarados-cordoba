import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { Img } from '../../data/interfaces/database/img.interface';

@Injectable({
  providedIn: 'root',
})
export class GalleryService {
  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3001/gallery';

  getLastImages(limit: number) {
    return this.http.get<Img[]>(this.baseUrl).pipe(
      map((items) => {
        const sorted = [...items].sort((a, b) => Number(b.id) - Number(a.id));
        const limited = sorted.slice(0, limit);
        return limited.map((img, i) => ({
          src: img.src,
          alt: img.alt ?? `Foto ${i + 1}`,
          id: img.id,
        }));
      })
    );
  }


  getAllImages() {
    return this.http.get<Img[]>(this.baseUrl).pipe(
      map((items) => {
        const sorted = [...items].sort((a, b) => b.id - a.id);
        return sorted.map((img, i) => ({
          src: img.src,
          alt: img.alt ?? `Foto ${i + 1}`,
          id: img.id,
        }));
      })
    );
  }

  deleteImage(id: any) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  addImage(image: Img) {
    return this.http.post(`${this.baseUrl}`, image);
  }

}
