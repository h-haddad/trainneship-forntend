import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[trainingBorderCard]'
})
export class BorderCardDirective {
  constructor(private el: ElementRef) {
    this.setBorder('#f5f5f5');
    this.setHeight(330);
  }
  private initColor = "#f5f5f5";
  private defaultColor = "#009688";
  @Input('trainingBorderCard') borderColor : string;

  @HostListener('mouseenter') onMouseEnter() {
    this.setBorder( this.borderColor || this.defaultColor);
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.setBorder( this.initColor);
  }


  private setBorder(color: string) {
    let border = 'solid 4px ' + color;
    this.el.nativeElement.style.border = border;
  }

  private setHeight(height: number) {
    this.el.nativeElement.style.height = height + 'px';
  }
}
