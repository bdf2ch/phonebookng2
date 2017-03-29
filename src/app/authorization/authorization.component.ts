import {
  Component, Input, Output, OnInit, EventEmitter, HostListener, ElementRef, AfterViewChecked, OnChanges, trigger, state, transition,
  animate, style, SimpleChanges
} from '@angular/core';
import { SessionService } from "../phonebook/session.service";

@Component({
  selector: 'authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css'],
  animations: [
    trigger("fog", [
      state('true', style({
        background: 'rgba(0, 0, 0, 0.5)'
      })),
      transition('void => *', animate("200ms linear")),
      transition('* => void', animate("200ms linear")),
    ]),
    trigger("popup", [
      state('true', style({
        transform: 'scale(1.0)'
      })),
      state('false', style({
        transform: 'scale(0.1)'
      })),
      transition('void => true', animate(100)),
      transition('* => void', animate(100)),
    ])
  ]

})
export class AuthorizationComponent implements OnInit, AfterViewChecked, OnChanges {
  @Input() isOpened: boolean;
  @Output() onClose: EventEmitter<void> = new EventEmitter<void>();
  opened: boolean = false;
  userNotFound: boolean = false;
  login: string = '';
  password: string = '';


  constructor(private $element: ElementRef, private $session: SessionService) { }

  ngOnChanges (changes: SimpleChanges) {
    console.log(changes);
    this.opened = changes['isOpened']['currentValue'];
  };


  ngOnInit() {};


  ngAfterViewChecked () {
      if (this.opened) {
        let element = this.$element.nativeElement.children[1];
        element.style.top = window.innerHeight / 2 - element.clientHeight / 2 + 'px';
        element.style.left = window.innerWidth / 2 - element.clientWidth / 2 + 'px';
      }
  };


  @HostListener('window:resize', ['$event']) onWindowResize (event) {
    if (this.opened) {
      let element = this.$element.nativeElement.children[1];
      element.style.left = event.target.innerWidth / 2 - element.clientWidth / 2 + 'px';
      element.style.top = event.target.innerHeight / 2 - element.clientHeight / 2 + 'px';
    }
  };


  open(): void {
    this.opened = true;
  };


  /**
   * Закрывает форму авторизации и очищает
   * @param form
   */
  close(form: any): void {
    this.opened = false;
    this.userNotFound = false;
    form.reset();
    this.onClose.emit();
  };


  /**
   *
   * @param form
   */
  send(form: any): void {
    this.$session.login(this.login, this.password).subscribe((result: boolean) => {
      console.log(result);
      if (result)
        this.close(form);
      else
        this.userNotFound = true;
    });
  };

}
