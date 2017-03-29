import { Model } from './Model.class';
import { Contact } from "./Contact.model";


export interface UserConfig {
  readonly id: number;
  tab_id?: string;
  department_id?: number;
  division_id?: number;
  surname: string;
  name: string;
  fname?: string;
  position?: string;
  email?: string;
  password?: string;
  active_directory_account?: string;
  is_administrator?: boolean;
};


export class User extends Model {
  readonly id: number = 0;
  tabId: string = "";
  departmentId: number = 0;
  divisionId: number = 0;
  surname: string = "";
  name: string = "";
  fname: string = "";
  position: string = "";
  email: string = "";
  password: string = "";
  activeDirectoryAccount: string = "";
  isAdministrator: boolean = false;
  fio: string = "";
  search: string = "";

  constructor (config?: UserConfig) {
    super();

    if (config) {
      this.id = config.id;
      if (config.tab_id)
        this.tabId = config.tab_id;
      if (config.department_id)
        this.departmentId = config.department_id;
      if (config.division_id)
        this.divisionId = config.division_id;
      this.surname = config.surname;
      this.search += this.surname + " ";
      this.name = config.name;
      this.search += this.name + " ";
      if (config.fname) {
        this.fname = config.fname;
        this.search += this.fname + " ";
      }
      if (config.position)
        this.position = config.position;
      if (config.email) {
        this.email = config.email;
        this.search += this.email;
      }
      if (config.password)
        this.password = config.password;
      if (config.active_directory_account)
        this.activeDirectoryAccount = config.active_directory_account;
      if (config.is_administrator)
        this.isAdministrator = config.is_administrator;
    }
    this.fio = this.surname + " " + this.name + " " + this.fname;
    this.search = this.search.toLowerCase();
  };


  /**
   * Сбрасывает значенеи всех полей
   */
  clear(): void {
    this.tabId = "";
    this.departmentId = 0;
    this.divisionId = 0;
    this.surname = "";
    this.name = "";
    this.fname = "";
    this.position = "";
    this.email = "";
    this.password = "";
    this.activeDirectoryAccount = "";
    this.isAdministrator = false;
    this.fio = "";
  };
};
