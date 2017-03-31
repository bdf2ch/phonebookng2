import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';
import { Contact } from "./Contact.model";
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import {SessionService} from "./session.service";


@Injectable()
export class PhoneBookService {
  private apiUrl: string = '/assets/serverside/api.php';
  private contacts: Contact[] = [];
  private favorites: Contact[] = [];
  loading: boolean = false;
  searchMode: boolean = false;
  searchQuery: string = '';


  /**
   * Конструктор сервиса
   * @param $http {Http}
   * @param $session {SessionService}
   */
  constructor(private $http: Http,
              private $session: SessionService) {};


  fetchContactsByDivisionId(id: number): Observable<Contact[]> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let parameters = { action: 'getContactsByDivisionId', data: { divisionId: id }};

    return this.$http.post(this.apiUrl, parameters, options)
      .map((res: Response) => {
        this.clear();
        let body = res.json();
        let length = body.length;
        for (let i = 0; i < length; i++) {
          let contact = new Contact(body[i]);
          this.contacts.push(contact);
        }
        return this.contacts;
      })
      .take(1)
      .catch(this.handleError);
  };


  /**
   * Осуществляет поиск контактов на сервере в соответствии с условием поиска
   * @returns {Observable<Contact|null>}
   */
  searchContacts(): Observable<Contact[]>|null {
    let headers = new Headers({ "Content-Type": "application/json" });
    let options = new RequestOptions({ headers: headers });
    let params = { action: "searchContacts", data: { search: this.searchQuery } };
    this.searchMode = true;
    this.loading = true;

    return this.$http.post(this.apiUrl, params, options)
      .map((res: Response|null) => {
        this.loading = false;
        let body = res.json();
        if (body !== null) {
          let length = body.length;
          this.clear();
          for (let i = 0; i < length; i++) {
            let contact = new Contact(body[i]);
            this.contacts.push(contact);
            this.loading = false;
          }
        } else
          return null;
      })
      .take(1)
      .catch(this.handleError);
  };


  /**
   * Добавляет контакт в избранные
   * @param contactId {number} - идентификатор контакта
   * @param userId {number} - идентификатор пользователя
   * @returns {Observable<R>}
   */
  addContactToFavorites (contactId: number, userId: number): Observable<Contact> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let parameters = { action: 'addContactToFavorites', data: { contactId: contactId, userId: userId }};
    this.loading = true;

    return this.$http.post(this.apiUrl, parameters, options)
      .map((response: Response) => {
        this.loading = false;
        let body = response.json();
        let contact = new Contact(body);
        this.favorites.push(contact);
      })
      .take(1)
      .catch(this.handleError);
  };


  /**
   * Удаляет контакт из избранных
   * @param contactId
   * @param userId
   * @returns {Observable<R>}
   */
  deleteContactFromFavorites(contactId: number, userId: number): Observable<boolean> {
    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let parameters = { action: 'deleteContactFromFavorites', data: { contactId: contactId, userId: userId }};
    this.loading = true;

    return this.$http.post(this.apiUrl, parameters, options)
      .map((response: Response) => {
        this.loading = false;
        let body = response.json();
        if (body === true) {
          let length = this.favorites.length;
          for (let i = 0; i < length; i++) {
            if (this.favorites[i].id === contactId) {
              this.favorites.splice(i, 1);
              return true;
            }
          }
          return false;
        }
      })
      .take(1)
      .catch(this.handleError);
  };


  /**
   * Получение массива всех загруженных контактов
   * @returns {Contact[]}
   */
  getAll(): Contact[] {
    return this.contacts;
  };


  /**
   * Возвращает массив избранных контактов
   * @returns {Contact[]}
   */
  getFavorites(): Contact[] {
    return this.favorites;
  };


  /**
   *
   * @param contact
   * @returns {boolean}
   */
  isContactInFavorites(contact: Contact): boolean {
    let length = this.favorites.length;
    for (let i = 0; i < length; i++) {
      if (this.favorites[i].id === contact.id)
        return true;
    }
    return false;
  };


  /**
   * Очистка массива контактов
   */
  clear(): void {
    this.contacts = [];
  };


  /**
   * Возвращает состояние режима поиска
   * @returns {boolean}
   */
  isInSearchMode(): boolean {
    return this.searchMode;
  };


  isLoading(): boolean {
    return this.loading;
  };


  /**
   * Обработчик ошибок при обращении к серверу
   * @param error {Response|any}
   * @returns {any}
   */
  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    this.loading = false;
    console.error(errMsg);
    return Observable.throw(errMsg);
  };

}
