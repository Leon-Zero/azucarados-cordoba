import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: '[scrollReveal]'
})
export class ScrollTransition {

 private observer!: IntersectionObserver;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(this.el.nativeElement, 'in-view');
        } else {
          this.renderer.removeClass(this.el.nativeElement, 'in-view');
        }
      },
      {
        threshold: 0.1
      }
    );

    this.observer.observe(this.el.nativeElement);
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

}
