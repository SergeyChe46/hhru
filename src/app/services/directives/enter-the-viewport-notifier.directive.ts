import {
  Directive,
  ElementRef,
  EventEmitter,
  Host,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appEnterTheViewportNotifier]',
})
export class EnterTheViewportNotifierDirective {
  @Output() visibilityChange = new EventEmitter<boolean>();
  private observer!: IntersectionObserver;

  constructor(@Host() private elementRef: ElementRef) {}

  ngAfterViewInit(): void {
    const options = { root: null, rootMargin: '0px', threshold: 0.0 };
    this.observer = new IntersectionObserver(this.callback, options);
    this.observer.observe(this.elementRef.nativeElement);
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }
  /**
   * Издаст событие при попадании элумента на экран.
   * @param entries
   * @param observer
   */
  private callback = (entries: any, observer: any) => {
    entries.forEach((entry: any) => {
      this.visibilityChange.emit(entry.isIntersecting ? true : false);
    });
  };
}
