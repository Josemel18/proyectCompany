import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Employee} from './employee.model';
import {Client} from './client.model';
import {Product} from './product.model';
import {SaleProduct} from './sale-product.model';

@model()
export class Sale extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'boolean',
    required: true,
  })
  state: boolean;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'string',
    required: true,
  })
  paymentMethod: string;

  @belongsTo(() => Employee)
  employeeId: string;

  @belongsTo(() => Client)
  clientId: string;

  @hasMany(() => Product, {through: {model: () => SaleProduct}})
  products: Product[];

  constructor(data?: Partial<Sale>) {
    super(data);
  }
}

export interface SaleRelations {
  // describe navigational properties here
}

export type SaleWithRelations = Sale & SaleRelations;
