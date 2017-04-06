import { Directive, ElementRef, HostListener, OnInit, Renderer } from '@angular/core';

@Directive({
  selector: '[scrollbar]'
})
export class ScrollbarDirective implements OnInit {
  private scrollbar: any = null;
  private pane: any = null;
  private grip: any = null;
  private element = null;


  constructor(private elementRef: ElementRef,
              private renderer: Renderer) {
    this.element = this.elementRef.nativeElement;
  };


  ngOnInit() {
    this.renderer.setElementStyle(this.element, 'overflow', 'hidden');

    this.scrollbar = this.renderer.createElement(this.element, 'div');
    this.renderer.setElementClass(this.scrollbar, 'ui-scrollbar', true);

    this.pane = this.renderer.createElement(this.scrollbar, 'div');
    this.renderer.setElementClass(this.pane, 'pane', true);

    this.grip = this.renderer.createElement(this.pane, 'div');
    this.renderer.setElementClass(this.grip, 'grip', true);

    this.renderer.projectNodes(this.element, [this.scrollbar]);
    this.resize();
  };


  @HostListener('mousewheel', ['$event']) scroll (event) {
    let windowScrollAreaSize = this.element.scrollHeight - this.element.clientHeight;
    let windowPositionRatio = this.element.scrollTop / windowScrollAreaSize;
    let trackScrollAreaSize = this.pane.clientHeight - this.grip.clientHeight;
    this.renderer.setElementProperty(this.element, 'scrollTop', this.element.scrollTop + event.deltaY);
    this.renderer.setElementStyle(this.scrollbar, 'top', this.element.scrollTop + 'px');
    this.renderer.setElementStyle(this.grip, 'top', trackScrollAreaSize * windowPositionRatio + 'px');
  };


  @HostListener('DOMSubtreeModified', []) onChange () {
    if (this.element !== null && this.scrollbar !== null && this.pane !== null && this.grip !== null)
      this.resize();
  };


  @HostListener('window:resize', []) onResize () {
    this.resize();
  };


  @HostListener('scroll', []) onScroll () {
    //this.resize();
    console.log('scrolled');
  };


  resize () {
    if (this.element.clientHeight !== this.element.scrollHeight) {
      this.renderer.setElementProperty(this.scrollbar, 'hidden', null);
      let ratio = this.element.clientHeight / this.element.scrollHeight;
      this.renderer.setElementStyle(this.scrollbar, 'top', this.element.scrollTop + 'px');
      this.renderer.setElementStyle(this.scrollbar, 'height', this.element.clientHeight + 'px');
      this.renderer.setElementStyle(this.grip, 'height', this.pane.clientHeight * ratio + 'px');
    } else
      this.renderer.setElementProperty(this.scrollbar, 'hidden', 'true');
  };

}
