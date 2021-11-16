import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasManyThroughRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Client, ClientRelations, Sale, Company, ClientCompany} from '../models';
import {SaleRepository} from './sale.repository';
import {ClientCompanyRepository} from './client-company.repository';
import {CompanyRepository} from './company.repository';

export class ClientRepository extends DefaultCrudRepository<
  Client,
  typeof Client.prototype.id,
  ClientRelations
> {

  public readonly sales: HasManyRepositoryFactory<Sale, typeof Client.prototype.id>;

  public readonly companies: HasManyThroughRepositoryFactory<Company, typeof Company.prototype.id,
          ClientCompany,
          typeof Client.prototype.id
        >;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('SaleRepository') protected saleRepositoryGetter: Getter<SaleRepository>, @repository.getter('ClientCompanyRepository') protected clientCompanyRepositoryGetter: Getter<ClientCompanyRepository>, @repository.getter('CompanyRepository') protected companyRepositoryGetter: Getter<CompanyRepository>,
  ) {
    super(Client, dataSource);
    this.companies = this.createHasManyThroughRepositoryFactoryFor('companies', companyRepositoryGetter, clientCompanyRepositoryGetter,);
    this.registerInclusionResolver('companies', this.companies.inclusionResolver);
    this.sales = this.createHasManyRepositoryFactoryFor('sales', saleRepositoryGetter,);
    this.registerInclusionResolver('sales', this.sales.inclusionResolver);
  }
}
