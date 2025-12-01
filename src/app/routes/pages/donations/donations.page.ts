import { Component } from '@angular/core';
import { HeaderLayout } from '../../../shared/layouts/header/header.layout';
import { Btn } from '../../../shared/ui/btn/btn';
import { TextFloatComponent } from '../../../shared/components/text-float/text-float.component';

@Component({
  selector: 'app-donations',
  imports: [HeaderLayout, Btn, TextFloatComponent],
  templateUrl: './donations.page.html',
  styleUrl: './donations.page.css',
})
export class DonationsPage {
}
