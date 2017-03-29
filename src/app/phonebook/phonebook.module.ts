import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DivisionsService } from './divisions.service';
import { PhoneBookService } from "./phone-book.service";
import { SessionService } from "./session.service";
import { CookieService } from "./cookie.service";
import { PhonebookComponent } from './phonebook/phonebook.component';
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { UiModule } from "../ui/ui.module";
import { AuthorizationComponent } from "../authorization/authorization.component";
import { ApplicationResolveGuard } from "../resolve.guard";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    UiModule
  ],
  declarations: [
    PhonebookComponent,
    AuthorizationComponent
  ],
  providers: [
    DivisionsService,
    PhoneBookService,
    SessionService,
    CookieService,
    ApplicationResolveGuard
  ]
})
export class PhonebookModule { }
