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
  Employee,
  MessageEmployee,
} from '../models';
import {EmployeeRepository} from '../repositories';

export class EmployeeMessageEmployeeController {
  constructor(
    @repository(EmployeeRepository) protected employeeRepository: EmployeeRepository,
  ) { }

  @get('/employees/{id}/message-employees', {
    responses: {
      '200': {
        description: 'Array of Employee has many MessageEmployee',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(MessageEmployee)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<MessageEmployee>,
  ): Promise<MessageEmployee[]> {
    return this.employeeRepository.messageEmployees(id).find(filter);
  }

  @post('/employees/{id}/message-employees', {
    responses: {
      '200': {
        description: 'Employee model instance',
        content: {'application/json': {schema: getModelSchemaRef(MessageEmployee)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Employee.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MessageEmployee, {
            title: 'NewMessageEmployeeInEmployee',
            exclude: ['id'],
            optional: ['employeeId']
          }),
        },
      },
    }) messageEmployee: Omit<MessageEmployee, 'id'>,
  ): Promise<MessageEmployee> {
    return this.employeeRepository.messageEmployees(id).create(messageEmployee);
  }

  @patch('/employees/{id}/message-employees', {
    responses: {
      '200': {
        description: 'Employee.MessageEmployee PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(MessageEmployee, {partial: true}),
        },
      },
    })
    messageEmployee: Partial<MessageEmployee>,
    @param.query.object('where', getWhereSchemaFor(MessageEmployee)) where?: Where<MessageEmployee>,
  ): Promise<Count> {
    return this.employeeRepository.messageEmployees(id).patch(messageEmployee, where);
  }

  @del('/employees/{id}/message-employees', {
    responses: {
      '200': {
        description: 'Employee.MessageEmployee DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(MessageEmployee)) where?: Where<MessageEmployee>,
  ): Promise<Count> {
    return this.employeeRepository.messageEmployees(id).delete(where);
  }
}
