import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Employee} from './employee.model';

@model()
export class MessageEmployee extends Entity {
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
  message: string;

  @belongsTo(() => Employee)
  employeeId: string;

  constructor(data?: Partial<MessageEmployee>) {
    super(data);
  }
}

export interface MessageEmployeeRelations {
  // describe navigational properties here
}

export type MessageEmployeeWithRelations = MessageEmployee & MessageEmployeeRelations;
