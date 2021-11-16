import {Entity, model, property} from '@loopback/repository';

@model()
export class SaleProduct extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'number',
    required: true,
  })
  discount: number;

  @property({
    type: 'string',
  })
  saleId?: string;

  @property({
    type: 'string',
  })
  productId?: string;

  constructor(data?: Partial<SaleProduct>) {
    super(data);
  }
}

export interface SaleProductRelations {
  // describe navigational properties here
}

export type SaleProductWithRelations = SaleProduct & SaleProductRelations;
