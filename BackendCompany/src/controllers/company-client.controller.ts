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
Company,
ClientCompany,
Client,
} from '../models';
import {CompanyRepository} from '../repositories';

export class CompanyClientController {
  constructor(
    @repository(CompanyRepository) protected companyRepository: CompanyRepository,
  ) { }

  @get('/companies/{id}/clients', {
    responses: {
      '200': {
        description: 'Array of Company has many Client through ClientCompany',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Client)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Client>,
  ): Promise<Client[]> {
    return this.companyRepository.clients(id).find(filter);
  }

  @post('/companies/{id}/clients', {
    responses: {
      '200': {
        description: 'create a Client model instance',
        content: {'application/json': {schema: getModelSchemaRef(Client)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Company.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Client, {
            title: 'NewClientInCompany',
            exclude: ['id'],
          }),
        },
      },
    }) client: Omit<Client, 'id'>,
  ): Promise<Client> {
    return this.companyRepository.clients(id).create(client);
  }

  @patch('/companies/{id}/clients', {
    responses: {
      '200': {
        description: 'Company.Client PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Client, {partial: true}),
        },
      },
    })
    client: Partial<Client>,
    @param.query.object('where', getWhereSchemaFor(Client)) where?: Where<Client>,
  ): Promise<Count> {
    return this.companyRepository.clients(id).patch(client, where);
  }

  @del('/companies/{id}/clients', {
    responses: {
      '200': {
        description: 'Company.Client DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Client)) where?: Where<Client>,
  ): Promise<Count> {
    return this.companyRepository.clients(id).delete(where);
  }
}
