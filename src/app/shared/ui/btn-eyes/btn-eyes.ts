import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'btn-eyes',
  imports: [],
  templateUrl: './btn-eyes.html',
  styleUrl: './btn-eyes.css',
})
export class BtnEyes {
  emmitState= output<boolean>();
  state = signal<boolean>(false);

  showPassword(){
   this.state.set(!this.state());
   this.emmitState.emit(this.state());
  }

}
