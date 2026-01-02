import { Component, input, output, signal } from '@angular/core';
import { fileToBase64, validateImageFile } from '../../../core/utils/img-file';

@Component({
  selector: 'app-image-picker',
  imports: [],
  templateUrl: './image-picker.html',
  styleUrl: './image-picker.css',
})
export class ImagePicker {

  imagePreview = input<string | null>(null);
  imageBase64 = signal<string | null>(null);
  error = signal<string | null>(null);

  imageSelected = output<{ base64: string; file: File } | null>();

  async onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (!input.files || !input.files.length) return;

    const file = input.files[0];

    const error = validateImageFile(file);
    if (error) {
      this.error.set(error);
      this.clear();
      this.imageSelected.emit(null);
      input.value = '';
      return;
    }

    const base64 = await fileToBase64(file);
    this.imageBase64.set(base64);
    this.imageSelected.emit({ base64, file });
    this.clear();
    input.value = '';
  }

  clear() {
    this.imageBase64.set(null);
    this.error.set(null);
  }
  
}
