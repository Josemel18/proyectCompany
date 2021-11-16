import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Sale, SaleRelations, Employee, Client, Product, SaleProduct} from '../models';
import {EmployeeRepository} from './employee.repository';
import {ClientRepository} from './client.repository';
import {SaleProductRepository} from './sale-product.repository';
import {ProductRepository} from './product.repository';

export class SaleRepository extends DefaultCrudRepository<
  Sale,
  typeof Sale.prototype.id,
  SaleRelations
> {

  public readonly employee: BelongsToAccessor<Employee, typeof Sale.prototype.id>;

  public readonly client: BelongsToAccessor<Client, typeof Sale.prototype.id>;

  public readonly products: HasManyThroughRepositoryFactory<Product, typeof Product.prototype.id,
          SaleProduct,
          typeof Sale.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EmployeeRepository') protected employeeRepositoryGetter: Getter<EmployeeRepository>, @repository.getter('ClientRepository') protected clientRepositoryGetter: Getter<ClientRepository>, @repository.getter('SaleProductRepository') protected saleProductRepositoryGetter: Getter<SaleProductRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>,
  ) {
    super(Sale, dataSource);
    this.products = this.createHasManyThroughRepositoryFactoryFor('products', productRepositoryGetter, saleProductRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
    this.client = this.createBelongsToAccessorFor('client', clientRepositoryGetter,);
    this.registerInclusionResolver('client', this.client.inclusionResolver);
    this.employee = this.createBelongsToAccessorFor('employee', employeeRepositoryGetter,);
    this.registerInclusionResolver('employee', this.employee.inclusionResolver);
  }
}
