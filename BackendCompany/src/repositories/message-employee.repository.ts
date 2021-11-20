import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {MessageEmployee, MessageEmployeeRelations, Employee} from '../models';
import {EmployeeRepository} from './employee.repository';

export class MessageEmployeeRepository extends DefaultCrudRepository<
  MessageEmployee,
  typeof MessageEmployee.prototype.id,
  MessageEmployeeRelations
> {

  public readonly employee: BelongsToAccessor<Employee, typeof MessageEmployee.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EmployeeRepository') protected employeeRepositoryGetter: Getter<EmployeeRepository>,
  ) {
    super(MessageEmployee, dataSource);
    this.employee = this.createBelongsToAccessorFor('employee', employeeRepositoryGetter,);
    this.registerInclusionResolver('employee', this.employee.inclusionResolver);
  }
}
