import { Injectable } from '@angular/core';
import { Cookie } from "./Cookie.model";

@Injectable()
export class CookieService {
  private cookies: Cookie[] = [];


  /**
   * Конструктор сервиса
   * Считывает куки из документа и помещает их в массив
   */
  constructor() {
    let cookies = document.cookie.split(';');
    let length = cookies.length;
    for (let i = 0; i < length; i++) {
      let item = cookies[i].trim();
      let cookie = new Cookie({
        name: item.substr(0, item.indexOf('=')),
        value: item.substr(item.indexOf('=') + 1, item.length)
      });
      this.cookies.push(cookie);
    }
  };


  /**
   * Возвращает массив всех куки
   * @returns {Cookie[]}
   */
  getAll(): Cookie[] {
    return this.cookies;
  };


  /**
   * Возвращает куки по наименование
   * @param name {string} - наименование куки
   * @returns {Cookie|null}
   */
  getByName(name: string): Cookie|null {
    let length = this.cookies.length;
    for (let i = 0; i < length; i++)
      if (this.cookies[i].name === name)
        return this.cookies[i];
    return null;
  };


  /**
   * Устанавливает новый куки
   * @param name {string} - наименование куки
   * @param value {string} - значение куки
   * @param expires? {Date|number} - срок действия
   * @param path? {string} - путь, внутри которого будет доступ к cookie
   * @param domain? {string} - домен, на котором доступно cookie
   * @returns {Cookie}
   */
  set(name: string, value: string, expires?: Date|number, path?: string, domain?: string): Cookie {
    let cookieString = name + '=' + encodeURIComponent(value);

    if (expires && typeof expires === 'Date')
      cookieString += ';expires=' + expires.toUTCString();

    if (expires && typeof expires === 'number') {
      var date = new Date();
      date.setTime(date.getTime() + expires * 1000);
      cookieString += ';expires=' + date;
    }

    cookieString += path && path !== '' ? ';path=' + path : '';
    cookieString += domain && domain !== '' ? ';domain=' + domain : '';

    document.cookie = cookieString;
    let cookie = new Cookie({ name: name, value: value });
    this.cookies.push(cookie);
    return cookie;
  };

}
