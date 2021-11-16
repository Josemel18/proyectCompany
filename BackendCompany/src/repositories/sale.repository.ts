import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Sale, SaleRelations, Employee} from '../models';
import {EmployeeRepository} from './employee.repository';

export class SaleRepository extends DefaultCrudRepository<
  Sale,
  typeof Sale.prototype.id,
  SaleRelations
> {

  public readonly employee: BelongsToAccessor<Employee, typeof Sale.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EmployeeRepository') protected employeeRepositoryGetter: Getter<EmployeeRepository>,
  ) {
    super(Sale, dataSource);
    this.employee = this.createBelongsToAccessorFor('employee', employeeRepositoryGetter,);
    this.registerInclusionResolver('employee', this.employee.inclusionResolver);
  }
}
