import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {ClientCompany, ClientCompanyRelations} from '../models';

export class ClientCompanyRepository extends DefaultCrudRepository<
  ClientCompany,
  typeof ClientCompany.prototype.id,
  ClientCompanyRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(ClientCompany, dataSource);
  }
}
