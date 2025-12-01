import { Component } from '@angular/core';
import { Btn } from '../../../shared/ui/btn/btn';
import { TextFloatComponent } from '../../../shared/components/text-float/text-float.component';

@Component({
  selector: 'app-not-found',
  imports: [Btn, TextFloatComponent],
  templateUrl: './not-found.page.html',
  styleUrl: './not-found.page.css',
})
export class NotFoundPage {
}
