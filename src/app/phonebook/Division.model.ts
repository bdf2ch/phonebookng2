import { Model } from "./Model.class";
import { Contact } from "./Contact.model";


export interface DivisionConfig {
  id: number;
  parent_id: number;
  department_id: number;
  title: string;
  is_department?: boolean;
};


export class Division extends Model {
  readonly id: number = 0;
  parentId: number = 0;
  departmentId: number = 0;
  title: string = "";
  isDepartment: boolean = false;
  contacts: Contact[] = [];

  constructor (config?: DivisionConfig) {
    super();
    if (config) {
      this.id = config.id;
      this.parentId = config.parent_id;
      if (config.department_id)
        this.departmentId = config.department_id;
      this.title = config.title;
      if (config.is_department)
        this.isDepartment = config.is_department;
    }
  };

};
