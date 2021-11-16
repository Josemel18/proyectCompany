import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Company, CompanyRelations, Employee, Product, Client, ClientCompany} from '../models';
import {EmployeeRepository} from './employee.repository';
import {ProductRepository} from './product.repository';
import {ClientCompanyRepository} from './client-company.repository';
import {ClientRepository} from './client.repository';

export class CompanyRepository extends DefaultCrudRepository<
  Company,
  typeof Company.prototype.id,
  CompanyRelations
> {

  public readonly employees: HasManyRepositoryFactory<Employee, typeof Company.prototype.id>;

  public readonly products: HasManyRepositoryFactory<Product, typeof Company.prototype.id>;

  public readonly clients: HasManyThroughRepositoryFactory<Client, typeof Client.prototype.id,
          ClientCompany,
          typeof Company.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('EmployeeRepository') protected employeeRepositoryGetter: Getter<EmployeeRepository>, @repository.getter('ProductRepository') protected productRepositoryGetter: Getter<ProductRepository>, @repository.getter('ClientCompanyRepository') protected clientCompanyRepositoryGetter: Getter<ClientCompanyRepository>, @repository.getter('ClientRepository') protected clientRepositoryGetter: Getter<ClientRepository>,
  ) {
    super(Company, dataSource);
    this.clients = this.createHasManyThroughRepositoryFactoryFor('clients', clientRepositoryGetter, clientCompanyRepositoryGetter,);
    this.registerInclusionResolver('clients', this.clients.inclusionResolver);
    this.products = this.createHasManyRepositoryFactoryFor('products', productRepositoryGetter,);
    this.registerInclusionResolver('products', this.products.inclusionResolver);
    this.employees = this.createHasManyRepositoryFactoryFor('employees', employeeRepositoryGetter,);
    this.registerInclusionResolver('employees', this.employees.inclusionResolver);
  }
}
