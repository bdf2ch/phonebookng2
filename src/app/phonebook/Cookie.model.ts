export interface CookieConfig {
  name: string;
  value: string;
};


export class Cookie {
  name: string = '';
  value: string = '';

  constructor (config?: CookieConfig) {
    if (config) {
      this.name = config.name;
      this.value = config.value;
    }
  };
};
