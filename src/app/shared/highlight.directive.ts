import {
  Directive,
  ElementRef,
  Input,
} from '@angular/core';
 
@Directive({
  selector: '[appHighlight]',
})
export class HightlightDirective {
  @Input('appHighlight') appHighlight: any;
  constructor(private el: ElementRef) {}
  ngDoCheck() {
    this.el.nativeElement.style.borderColor  = this.appHighlight;
  }
}