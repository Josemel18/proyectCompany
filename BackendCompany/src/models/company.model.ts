import {Entity, model, property, hasMany} from '@loopback/repository';
import {Employee} from './employee.model';

@model()
export class Company extends Entity {
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
  businessName: string;

  @property({
    type: 'string',
    required: true,
  })
  nit: string;

  @hasMany(() => Employee)
  employees: Employee[];

  constructor(data?: Partial<Company>) {
    super(data);
  }
}

export interface CompanyRelations {
  // describe navigational properties here
}

export type CompanyWithRelations = Company & CompanyRelations;
