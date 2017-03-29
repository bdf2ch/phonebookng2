import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { CookieService } from "./phonebook/cookie.service";
import { SessionService } from "./phonebook/session.service";
import { Session } from "./phonebook/Session.model";
import { User } from "./phonebook/User.model";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {Contact} from "./phonebook/Contact.model";
import {PhoneBookService} from "./phonebook/phone-book.service";


@Injectable()
export class ApplicationResolveGuard implements Resolve<Observable<any>> {


  constructor(private $http: Http,
              private $cookies: CookieService,
              private $session: SessionService,
              private $phonebook: PhoneBookService) {};


  resolve (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> {
    let cookie = this.$cookies.getByName('kolenergo_session_id');
    console.log('session cookie', cookie);
    if (cookie) {
      let headers = new Headers({ 'Content-Type': 'application/json' });
      let options = new RequestOptions({ headers: headers });
      let parameters = { action: 'getSessionByToken', data: { token: cookie.value }};

      return this.$http.post('/assets/serverside/api.php', parameters, options)
        .map((response: Response) => {
          let body = response.json();
          if (body !== null) {
            this.$session.setCurrentSession(new Session(body.session));
            if (body.user !== undefined)
              this.$session.setCurrentUser(new User(body.user));
            if (body['data']['favoriteContacts'] !== undefined) {
              let length = body.data.favoriteContacts.length;
              for (let i = 0; i < length; i++) {
                let contact = new Contact(body.data.favoriteContacts[i]);
                this.$phonebook.getFavorites().push(contact);
              }
            }
          } else return;
        })
        .take(1)
        .catch(this.handleError);
    }
  };


  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  };

};
