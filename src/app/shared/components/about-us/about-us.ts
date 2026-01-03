import { Component, inject, signal } from '@angular/core';
import { Btn } from '../../ui/btn/btn';
import { TextFloatComponent } from '../text-float/text-float.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-about-us',
  imports: [Btn, TextFloatComponent],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css',
})
export class AboutUs {

  private router = inject(Router);
  
  goToDonation(){
    this.router.navigate(['/donaciones']).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
