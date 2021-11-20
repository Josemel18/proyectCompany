import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Company} from './company.model';
import {Sale} from './sale.model';
import {MessageEmployee} from './message-employee.model';

@model()
export class Employee extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @property({
    type: 'string',
    required: true,
  })
  lastname: string;

  @property({
    type: 'string',
    required: true,
  })
  phone: string;

  @property({
    type: 'string',
    required: true,
  })
  address: string;

  @property({
    type: 'string',
    required: true,
  })
  email: string;

  @property({
    type: 'date',
    required: true,
  })
  birthday: string;

  @property({
    type: 'number',
    required: true,
  })
  salary: number;

  @property({
    type: 'boolean',
    required: true,
  })
  isExecutive: boolean;

  @belongsTo(() => Company)
  companyId: string;

  @hasMany(() => Sale)
  sales: Sale[];

  @hasMany(() => MessageEmployee)
  messageEmployees: MessageEmployee[];

  constructor(data?: Partial<Employee>) {
    super(data);
  }
}

export interface EmployeeRelations {
  // describe navigational properties here
}

export type EmployeeWithRelations = Employee & EmployeeRelations;
