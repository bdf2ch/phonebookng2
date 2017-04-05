import { Directive, ElementRef, HostListener, OnInit, Renderer } from '@angular/core';

@Directive({
  selector: '[scrollbar]'
})
export class ScrollbarDirective implements OnInit {
  private scrollbar: any = null;
  private pane: any = null;
  private bar: any = null;
  private element = this.$element.nativeElement;


  constructor(private $element: ElementRef,
              private $renderer: Renderer) {};


  ngOnInit() {
    this.scrollbar = document.createElement('div');
    this.scrollbar.className = 'ui-scrollbar';

    this.pane = document.createElement('div');
    this.pane.className = 'pane';

    this.bar = document.createElement('div');
    this.bar.className = 'bar';

    //this.scrollbar.appendChild(this.pane);
    this.$renderer.projectNodes(this.pane, [this.bar]);
    this.$renderer.projectNodes(this.scrollbar, [this.pane]);

    //this.pane.appendChild(this.bar);
    //this.$element.nativeElement.appendChild(this.scrollbar);
    this.$renderer.projectNodes(this.element, [this.scrollbar]);
    //console.log('scrollHeight', this.$element.nativeElement.scrollHeight);
    //console.log('clientHeight', this.$element.nativeElement.clientHeight);
    //this.pane.style.height = this.$element.nativeElement.clientHeight + 'px';

    //let ratio = this.element.clientHeight / this.element.scrollHeight;
    //console.log('ration = ', ratio);
    //this.bar.style.height = this.$element.nativeElement.clientHeight - 40 / ratio + 'px';
    //this.$renderer.setElementStyle(this.scrollbar, 'top', this.element.scrollTop + 'px');
    //this.$renderer.setElementStyle(this.scrollbar, 'height', this.element.clientHeight + 'px');
    //this.$renderer.setElementStyle(this.bar, 'height', this.pane.clientHeight * ratio + 'px');

    //console.log('ratio', ratio);
    //console.log('parent scrollHeight', this.element.scrollHeight);
    //console.log('pane clientHeight', this.pane.clientHeight);
    this.resize();
  };


  /*
  @HostListener('mousewheel', ['$event']) onScroll (event) {
    console.log('scroll', event);
    console.log('offsetTop', this.scrollbar.offsetTop);
    //this.$element.nativeElement.scrollTop += event.deltaY;
    let ratio = this.element.scrollHeight - this.element.clientHeight;
    let windowScrollAreaSize = this.element.scrollHeight - this.element.clientHeight;
    let windowPositionRatio = this.element.scrollTop / windowScrollAreaSize;
    let trackScrollAreaSize = this.pane.clientHeight - this.bar.clientHeight;
    this.$renderer.setElementProperty(this.element, 'scrollTop', this.element.scrollTop + event.deltaY);
    this.$renderer.setElementStyle(this.scrollbar, 'top', this.element.scrollTop + 'px');
    this.$renderer.setElementStyle(this.bar, 'top', trackScrollAreaSize * windowPositionRatio + 'px');
    //this.$renderer.setElementStyle(this.scrollbar, 'bottom', '0px');
    console.log('parent scrollTop', this.element.scrollTop);
    console.log('bar offsetTop', this.bar.offsetTop);
    let x;
  };
  */


  @HostListener('mousewheel', ['$event']) scroll (event) {
    let windowScrollAreaSize = this.element.scrollHeight - this.element.clientHeight;
    let windowPositionRatio = this.element.scrollTop / windowScrollAreaSize;
    let trackScrollAreaSize = this.pane.clientHeight - this.bar.clientHeight;
    this.$renderer.setElementProperty(this.element, 'scrollTop', this.element.scrollTop + event.deltaY);
    this.$renderer.setElementStyle(this.scrollbar, 'top', this.element.scrollTop + 'px');
    this.$renderer.setElementStyle(this.bar, 'top', trackScrollAreaSize * windowPositionRatio + 'px');
  };


  @HostListener('window:resize', []) resize () {
    let ratio = this.element.clientHeight / this.element.scrollHeight;
    this.$renderer.setElementStyle(this.scrollbar, 'top', this.element.scrollTop + 'px');
    this.$renderer.setElementStyle(this.scrollbar, 'height', this.element.clientHeight + 'px');
    this.$renderer.setElementStyle(this.bar, 'height', this.pane.clientHeight * ratio + 'px');
  };

}
