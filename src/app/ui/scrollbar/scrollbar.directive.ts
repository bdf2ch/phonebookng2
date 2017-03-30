import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[scrollbar]'
})
export class ScrollbarDirective implements OnInit{

  constructor(private $element: ElementRef) {};


  ngOnInit() {
    console.log('scrollbar init');
    var scrollbar = document.createElement('div');
    scrollbar.className = 'ui-scrollbar';
    var bar = document.createElement('div');
    bar.className = 'bar';
    scrollbar.appendChild(bar);
    this.$element.nativeElement.appendChild(scrollbar);
    console.log('scrollHeight', this.$element.nativeElement.scrollHeight);
    console.log('clientHeight', this.$element.nativeElement.clientHeight);

    bar.style.height = scrollbar.clientHeight / (this.$element.nativeElement.scrollHeight / this.$element.nativeElement.clientHeight) + 'px';
  };


@HostListener('scroll', ['$event']) onScroll (event) {
  console.log('scroll');
};

}
