import { Directive, ElementRef, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[scrollbar]'
})
export class ScrollbarDirective implements OnInit {
  private scrollbar = document.createElement('div');
  private pane = document.createElement('div');
  private bar = document.createElement('div');


  constructor(private $element: ElementRef) {};


  ngOnInit() {
    this.scrollbar.className = 'ui-scrollbar';
    this.pane.className = 'pane';
    this.bar.className = 'bar';
    this.scrollbar.appendChild(this.pane);
    this.pane.appendChild(this.bar);
    this.$element.nativeElement.appendChild(this.scrollbar);
    console.log('scrollHeight', this.$element.nativeElement.scrollHeight);
    console.log('clientHeight', this.$element.nativeElement.clientHeight);
    this.bar.style.height = this.scrollbar.clientHeight / (this.$element.nativeElement.scrollHeight / this.$element.nativeElement.clientHeight) + 'px';
  };


  @HostListener('mousewheel', ['$event']) onScroll (event) {
    console.log('scroll', event);
    console.log('offsetTop', this.scrollbar.offsetTop);
    this.$element.nativeElement.scrollTop += event.deltaY;
    if (this.scrollbar.offsetTop + event.deltaY > 0 && this.$element.nativeElement.scrollTop < this.$element.nativeElement.scrollHeight) {
      //let height = this.scrollbar.clientHeight;
      this.scrollbar.style.top = this.$element.nativeElement.scrollTop + 'px';
      this.scrollbar.style.height = this.$element.nativeElement.clientHeight + 'px';
      this.bar.style.top = this.$element.nativeElement.scrollHeight / this.scrollbar.client
      //this.$element.nativeElement.scrollTop += event.deltaY;
    } else
      this.scrollbar.style.top = '0px';
  };

}
