import { Directive, ElementRef, Renderer2, Inject, PLATFORM_ID, AfterViewInit, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[scrollReveal]'
})
export class ScrollTransition implements AfterViewInit, OnDestroy {

  private observer?: IntersectionObserver;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngAfterViewInit() {

    if (!isPlatformBrowser(this.platformId)) return;

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
