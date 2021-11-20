import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {MessageEmployee} from '../models';
import {MessageEmployeeRepository} from '../repositories';

export class MessageEnployeeController {
  constructor(
    @repository(MessageEmployeeRepository)
    public messageEmployeeRepository : MessageEmployeeRepository,
  ) {}

  @post('/message-employees')
  @response(200, {
    description: 'MessageEmployee model instance',
    content: {'application/json': {schema: getModelSchemaRef(MessageEmployee)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MessageEmployee, {
            title: 'NewMessageEmployee',
            exclude: ['id'],
          }),
        },
      },
    })
    messageEmployee: Omit<MessageEmployee, 'id'>,
  ): Promise<MessageEmployee> {
    return this.messageEmployeeRepository.create(messageEmployee);
  }

  @get('/message-employees/count')
  @response(200, {
    description: 'MessageEmployee model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(MessageEmployee) where?: Where<MessageEmployee>,
  ): Promise<Count> {
    return this.messageEmployeeRepository.count(where);
  }

  @get('/message-employees')
  @response(200, {
    description: 'Array of MessageEmployee model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(MessageEmployee, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(MessageEmployee) filter?: Filter<MessageEmployee>,
  ): Promise<MessageEmployee[]> {
    return this.messageEmployeeRepository.find(filter);
  }

  @patch('/message-employees')
  @response(200, {
    description: 'MessageEmployee PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MessageEmployee, {partial: true}),
        },
      },
    })
    messageEmployee: MessageEmployee,
    @param.where(MessageEmployee) where?: Where<MessageEmployee>,
  ): Promise<Count> {
    return this.messageEmployeeRepository.updateAll(messageEmployee, where);
  }

  @get('/message-employees/{id}')
  @response(200, {
    description: 'MessageEmployee model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(MessageEmployee, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(MessageEmployee, {exclude: 'where'}) filter?: FilterExcludingWhere<MessageEmployee>
  ): Promise<MessageEmployee> {
    return this.messageEmployeeRepository.findById(id, filter);
  }

  @patch('/message-employees/{id}')
  @response(204, {
    description: 'MessageEmployee PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MessageEmployee, {partial: true}),
        },
      },
    })
    messageEmployee: MessageEmployee,
  ): Promise<void> {
    await this.messageEmployeeRepository.updateById(id, messageEmployee);
  }

  @put('/message-employees/{id}')
  @response(204, {
    description: 'MessageEmployee PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() messageEmployee: MessageEmployee,
  ): Promise<void> {
    await this.messageEmployeeRepository.replaceById(id, messageEmployee);
  }

  @del('/message-employees/{id}')
  @response(204, {
    description: 'MessageEmployee DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.messageEmployeeRepository.deleteById(id);
  }
}
