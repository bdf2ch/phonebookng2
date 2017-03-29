import { Component, OnInit } from '@angular/core';
import { DivisionsService } from "./phonebook/divisions.service";
import { PhoneBookService } from "./phonebook/phone-book.service";
import { TreeService } from "./ui/tree/tree.service";
import { TreeItem } from "./ui/tree/tree-item";
import { SessionService } from "./phonebook/session.service";
import { CookieService } from "./phonebook/cookie.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit() {};
};
