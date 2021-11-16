import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Employee, EmployeeRelations, Company, Sale} from '../models';
import {CompanyRepository} from './company.repository';
import {SaleRepository} from './sale.repository';

export class EmployeeRepository extends DefaultCrudRepository<
  Employee,
  typeof Employee.prototype.id,
  EmployeeRelations
> {

  public readonly company: BelongsToAccessor<Company, typeof Employee.prototype.id>;

  public readonly sales: HasManyRepositoryFactory<Sale, typeof Employee.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('CompanyRepository') protected companyRepositoryGetter: Getter<CompanyRepository>, @repository.getter('SaleRepository') protected saleRepositoryGetter: Getter<SaleRepository>,
  ) {
    super(Employee, dataSource);
    this.sales = this.createHasManyRepositoryFactoryFor('sales', saleRepositoryGetter,);
    this.registerInclusionResolver('sales', this.sales.inclusionResolver);
    this.company = this.createBelongsToAccessorFor('company', companyRepositoryGetter,);
    this.registerInclusionResolver('company', this.company.inclusionResolver);
  }
}
