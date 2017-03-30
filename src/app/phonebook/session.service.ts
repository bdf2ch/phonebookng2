import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { User, UserConfig } from "./User.model";
import { Session, SessionConfig } from './Session.model';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take'



@Injectable()
export class SessionService {
  private apiUrl: string = '/assets/serverside/api.php';
  private user: User|null = null;
  private session: Session|null = null;


  constructor(private $http: Http) {};


  /**
   * Возвращает текущего пользователя
   * @returns {User|null}
   */
  getCurrentUser(): User|null {
    return this.user;
  };


  /**
   * Устанавливает текущего пользователя
   * @param user {User} - пользователь
   */
  setCurrentUser(user: User): void {
    this.user = user;
  };


  /**
   * Возвращает текущую сессию
   * @returns {Session|null}
   */
  getCurrentSession(): Session|null {
    return this.session;
  };


  /**
   * Устанавливает текущую сессию
   * @param session {Session} - сессия
   */
  setCurrentSession(session: Session): void {
    this.session = session;
  };


  /**
   * Выполняет авторизацию пользователя
   * @param login {string} - учетная запись пользователя
   * @param password {string} - пароль пользователя
   * @returns {Observable<T>}
   */
  login(login: string, password: string): Observable<any> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let parameters = { 'action': 'login', data: { login: login, password: password }};

    return this.$http.post(this.apiUrl, parameters, options)
      .map((res: Response) => {
        let body = res.json();
        console.log('login', body);
        if (body !== false) {
          this.user = new User(body.user);
          this.session = new Session(body.session);
          if (body.data !== undefined)
            this.session.data = body.data;
          console.log('session user', this.user);
          console.log('session', this.session);
          return body;
        } else
          return false;
      })
      .take(1);
  };


  /**
   * Выполняет выход пользователя из системы
   * @returns {Observable<T>}
   */
  logout (): Observable<boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let parameters = { action: 'logout' };

    return this.$http.post(this.apiUrl, parameters, options)
      .map((response: Response) => {
        let body = response.json();
        if (body === true)
          this.user = null;
        return body;
      })
      .take(1);
  };

}
