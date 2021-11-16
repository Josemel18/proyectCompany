import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {SaleProduct, SaleProductRelations} from '../models';

export class SaleProductRepository extends DefaultCrudRepository<
  SaleProduct,
  typeof SaleProduct.prototype.id,
  SaleProductRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(SaleProduct, dataSource);
  }
}
