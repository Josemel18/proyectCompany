import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Product, ProductRelations, Company, Sale, SaleProduct} from '../models';
import {CompanyRepository} from './company.repository';
import {SaleProductRepository} from './sale-product.repository';
import {SaleRepository} from './sale.repository';

export class ProductRepository extends DefaultCrudRepository<
  Product,
  typeof Product.prototype.id,
  ProductRelations
> {

  public readonly company: BelongsToAccessor<Company, typeof Product.prototype.id>;

  public readonly sales: HasManyThroughRepositoryFactory<Sale, typeof Sale.prototype.id,
          SaleProduct,
          typeof Product.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CompanyRepository') protected companyRepositoryGetter: Getter<CompanyRepository>, @repository.getter('SaleProductRepository') protected saleProductRepositoryGetter: Getter<SaleProductRepository>, @repository.getter('SaleRepository') protected saleRepositoryGetter: Getter<SaleRepository>,
  ) {
    super(Product, dataSource);
    this.sales = this.createHasManyThroughRepositoryFactoryFor('sales', saleRepositoryGetter, saleProductRepositoryGetter,);
    this.registerInclusionResolver('sales', this.sales.inclusionResolver);
    this.company = this.createBelongsToAccessorFor('company', companyRepositoryGetter,);
    this.registerInclusionResolver('company', this.company.inclusionResolver);
  }
}
