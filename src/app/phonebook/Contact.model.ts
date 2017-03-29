import { Model } from "./Model.class";
import { Phone } from "./Phone.model";

export class ContactConfig {
  id: number;
  user_id?: number;
  division_id: number;
  surname: string;
  name: string;
  fname?: string;
  position?: string;
  email?: string;
  mobile?: string;
  photo?: string;
};


export class Contact extends Model {
  readonly id: number = 0;
  userId: number = 0;
  divisionId: number = 0;
  surname: string = "";
  name: string = "";
  fname: string = "";
  position: string = "";
  email: string = "";
  phones: Phone[] = [];
  mobile: string = '';
  photo: string = "";
  fio: string = "";
  search: string = "";

  constructor (config?: ContactConfig) {
    super();
    if (config) {
      this.id = config.id;
      this.userId = config.user_id;
      this.divisionId = config.division_id;
      this.surname = config.surname;
      this.name = config.name;
      if (config.fname)
        this.fname = config.fname;
      if (config.position)
        this.position = config.position;
      if (config.email)
        this.email = config.email;
      if (config.mobile)
        this.mobile = config.mobile;
      if (config.photo)
        this.photo = config.photo;
      this.fio = this.surname + ' ' + this.name + ' ' + this.fname;
      this.search = this.name.toLowerCase() + ' ' + this.fname.toLowerCase() + ' ' + this.surname.toLowerCase() + ' ' + this.email.toLowerCase() + this.phones.join(' ').toLowerCase() + ' ' + this.mobile.toLowerCase();
    }
  };
};
