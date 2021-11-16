import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Company} from './company.model';
import {Sale} from './sale.model';
import {SaleProduct} from './sale-product.model';

@model()
export class Product extends Entity {
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
  description: string;

  @property({
    type: 'number',
    required: true,
  })
  price: number;

  @belongsTo(() => Company)
  companyId: string;

  @hasMany(() => Sale, {through: {model: () => SaleProduct}})
  sales: Sale[];

  constructor(data?: Partial<Product>) {
    super(data);
  }
}

export interface ProductRelations {
  // describe navigational properties here
}

export type ProductWithRelations = Product & ProductRelations;
