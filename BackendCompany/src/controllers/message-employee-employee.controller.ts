import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  MessageEmployee,
  Employee,
} from '../models';
import {MessageEmployeeRepository} from '../repositories';

export class MessageEmployeeEmployeeController {
  constructor(
    @repository(MessageEmployeeRepository)
    public messageEmployeeRepository: MessageEmployeeRepository,
  ) { }

  @get('/message-employees/{id}/employee', {
    responses: {
      '200': {
        description: 'Employee belonging to MessageEmployee',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Employee)},
          },
        },
      },
    },
  })
  async getEmployee(
    @param.path.string('id') id: typeof MessageEmployee.prototype.id,
  ): Promise<Employee> {
    return this.messageEmployeeRepository.employee(id);
  }
}
