import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PhonebookComponent } from './phonebook/phonebook/phonebook.component';
import { AuthorizationComponent } from './authorization/authorization.component';
import { PhonebookModule } from "./phonebook/phonebook.module";
import { ApplicationResolveGuard } from './resolve.guard';
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";
import { UiModule } from "./ui/ui.module";


const routes: Routes = [
  {
    path: '**',
    component: PhonebookComponent,
    resolve: {
      session: ApplicationResolveGuard
    }
  }
];


@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    CommonModule,
    FormsModule,
    HttpModule,
    UiModule,
    PhonebookModule
  ],
  declarations: [
    AppComponent,
    //AuthorizationComponent,
  ],
  providers: [],
  exports: [
    //CommonModule
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
