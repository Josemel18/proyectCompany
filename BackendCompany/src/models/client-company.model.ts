import {Entity, model, property} from '@loopback/repository';

@model()
export class ClientCompany extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  companyId?: string;

  @property({
    type: 'string',
  })
  clientId?: string;

  constructor(data?: Partial<ClientCompany>) {
    super(data);
  }
}

export interface ClientCompanyRelations {
  // describe navigational properties here
}

export type ClientCompanyWithRelations = ClientCompany & ClientCompanyRelations;
