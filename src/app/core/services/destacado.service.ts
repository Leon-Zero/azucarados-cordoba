import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DestacadoService {

  private http = inject(HttpClient);
  private baseUrl = 'http://localhost:3001/destacados';

  addImage(image: { src: string; alt: string | null }) {
    return this.http.post(`${this.baseUrl}`, image);
  }

}
