import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[appHighlightRow]',
})
export class HighlightRowDirective {
  el: ElementRef;
  // color: string;

  @Input() defaultColor?: string;
  @Input() appHighlightRow?: string;
  constructor(el: ElementRef) {
    this.el = el;
  }
  ngOnInit() {
    this.el.nativeElement.style.backgroundColor = this.appHighlightRow;
  }
}
