import { Model } from "./Model.class";


export class SessionConfig {
  id: number;
  user_id: number;
  token: string;
  start: number;
  end: number;
};


export class Session extends Model {
  readonly id: number = 0;
  userId: number = 0;
  token: string = '';
  start: Date = new Date();
  end: Date = new Date();
  data: {};

  constructor (config?: SessionConfig) {
    super();
    if (config) {
      this.id = config.id;
      this.userId = config.user_id;
      this.token = config.token;
      this.start = new Date(config.start);
      this.end = new Date(config.end);
    }
  };
};
