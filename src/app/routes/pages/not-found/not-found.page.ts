import { Component } from '@angular/core';
import { Btn } from '../../../shared/ui/btn/btn';
import { TextFloatComponent } from '../../../shared/components/text-float/text-float.component';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-not-found',
  imports: [Btn, TextFloatComponent, RouterLink],
  templateUrl: './not-found.page.html',
  styleUrl: './not-found.page.css',
})
export class NotFoundPage {
}
