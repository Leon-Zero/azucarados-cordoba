import { Component, inject, signal } from '@angular/core';
import { Card } from '../../../shared/components/card/card';
import { Gallery } from '../../../shared/components/gallery/gallery';
import { HeaderLayout } from '../../../shared/layouts/header/header.layout';
import { AboutUs } from '../../../shared/components/about-us/about-us';
import { DestacadoService } from '../../../core/services/destacado.service';
import { Destacado } from '../../../data/interfaces/database/destacado.interface';
import { BlogAddForm } from "../../../shared/forms/blog-add/blog-add.form";

@Component({
  selector: 'app-home',
  imports: [Card, Gallery, HeaderLayout, AboutUs, BlogAddForm],
  templateUrl: './home.page.html',
  styleUrl: './home.page.css',
})
export class HomePage {

  private destacadoService = inject(DestacadoService);

  ngOnInit() {
    this.loadDestacados();
  }

  loadDestacados() {
    this.destacadoService.getAllDestacados().subscribe((dest: Destacado[]) => {
      this.destacadoService.setDestacado(dest);
    });
  }

  get destacados() {
    return this.destacadoService.destacadoItem();
  }

}
