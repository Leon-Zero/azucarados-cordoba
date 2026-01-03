import { Component, input, Input, signal } from '@angular/core';
import { Img } from '../../../data/interfaces/database/img.interface';
import { PhotoModal } from "../photo-modal/photo-modal";

@Component({
  selector: 'app-main-galery',
  imports: [PhotoModal],
  templateUrl: './main-galery.component.html',
  styleUrl: './main-galery.component.css',
})
export class MainGaleryComponent {
  paginatedItems= input<Img[]>([]);
  
  modalOpen = signal(false);
  selectedIndex = signal(0);

  open(index: number) {
    this.selectedIndex.set(index);
    this.modalOpen.set(true);
  }

  closeModal() {
    this.modalOpen.set(false);
  }
}
