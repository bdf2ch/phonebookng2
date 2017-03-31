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
    //this.pane.style.height = this.$element.nativeElement.clientHeight + 'px';

    let ratio = this.$element.nativeElement.scrollHeight / this.$element.nativeElement.clientHeight;
    console.log('ration = ', ratio);
    this.bar.style.height = this.$element.nativeElement.clientHeight - 40 / ratio + 'px';
  };


  @HostListener('mousewheel', ['$event']) onScroll (event) {
    console.log('scroll', event);
    console.log('offsetTop', this.scrollbar.offsetTop);
    this.$element.nativeElement.scrollTop += event.deltaY;
    //console.log('bar top', this.bar.clientHeight / this.scrollbar.clientHeight * (this.$element.nativeElement.scrollHeight / this.$element.nativeElement.scrollTop));
    //this.bar.style.top =  Math.round(this.$element.nativeElement.scrollHeight / this.$element.nativeElement.scrollTop * this.scrollbar.clientHeight / this.bar.clientHeight)  + 'px';


    let ratio = this.$element.nativeElement.scrollHeight / (this.$element.nativeElement.clientHeight - 40);
    let el = this.$element.nativeElement;
    console.log('bar top', this.scrollbar.clientHeight / (el.scrollHeight / event.deltaY) + 'px');
    if (el.scrollTop >= 0)
      this.bar.style.top = parseInt(this.bar.style.top) + event.deltaY / ratio + 'px';

    if (this.scrollbar.offsetTop + event.deltaY > 0 && this.$element.nativeElement.scrollTop < this.$element.nativeElement.scrollHeight) {
      //let height = this.scrollbar.clientHeight;
      this.scrollbar.style.top = this.$element.nativeElement.scrollTop + 'px';
      this.scrollbar.style.height = this.$element.nativeElement.clientHeight + 'px';
      //this.bar.style.top = (this.$element.nativeElement.scrollHeight / this.$element.nativeElement.clientHeight) * this.scrollbar.clientHeight + 'px';
      //this.$element.nativeElement.scrollTop += event.deltaY;
    } else
      this.scrollbar.style.top = '0px';
  };

}
