import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Sale, SaleRelations, Employee, Client} from '../models';
import {EmployeeRepository} from './employee.repository';
import {ClientRepository} from './client.repository';

export class SaleRepository extends DefaultCrudRepository<
  Sale,
  typeof Sale.prototype.id,
  SaleRelations
> {

  public readonly employee: BelongsToAccessor<Employee, typeof Sale.prototype.id>;

  public readonly client: BelongsToAccessor<Client, typeof Sale.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EmployeeRepository') protected employeeRepositoryGetter: Getter<EmployeeRepository>, @repository.getter('ClientRepository') protected clientRepositoryGetter: Getter<ClientRepository>,
  ) {
    super(Sale, dataSource);
    this.client = this.createBelongsToAccessorFor('client', clientRepositoryGetter,);
    this.registerInclusionResolver('client', this.client.inclusionResolver);
    this.employee = this.createBelongsToAccessorFor('employee', employeeRepositoryGetter,);
    this.registerInclusionResolver('employee', this.employee.inclusionResolver);
  }
}
