import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
  import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
Client,
ClientCompany,
Company,
} from '../models';
import {ClientRepository} from '../repositories';

export class ClientCompanyController {
  constructor(
    @repository(ClientRepository) protected clientRepository: ClientRepository,
  ) { }

  @get('/clients/{id}/companies', {
    responses: {
      '200': {
        description: 'Array of Client has many Company through ClientCompany',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Company)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Company>,
  ): Promise<Company[]> {
    return this.clientRepository.companies(id).find(filter);
  }

  @post('/clients/{id}/companies', {
    responses: {
      '200': {
        description: 'create a Company model instance',
        content: {'application/json': {schema: getModelSchemaRef(Company)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Client.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Company, {
            title: 'NewCompanyInClient',
            exclude: ['id'],
          }),
        },
      },
    }) company: Omit<Company, 'id'>,
  ): Promise<Company> {
    return this.clientRepository.companies(id).create(company);
  }

  @patch('/clients/{id}/companies', {
    responses: {
      '200': {
        description: 'Client.Company PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Company, {partial: true}),
        },
      },
    })
    company: Partial<Company>,
    @param.query.object('where', getWhereSchemaFor(Company)) where?: Where<Company>,
  ): Promise<Count> {
    return this.clientRepository.companies(id).patch(company, where);
  }

  @del('/clients/{id}/companies', {
    responses: {
      '200': {
        description: 'Client.Company DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Company)) where?: Where<Company>,
  ): Promise<Count> {
    return this.clientRepository.companies(id).delete(where);
  }
}
