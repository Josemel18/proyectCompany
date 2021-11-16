import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Employee,
  Company,
} from '../models';
import {EmployeeRepository} from '../repositories';

export class EmployeeCompanyController {
  constructor(
    @repository(EmployeeRepository)
    public employeeRepository: EmployeeRepository,
  ) { }

  @get('/employees/{id}/company', {
    responses: {
      '200': {
        description: 'Company belonging to Employee',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Company)},
          },
        },
      },
    },
  })
  async getCompany(
    @param.path.string('id') id: typeof Employee.prototype.id,
  ): Promise<Company> {
    return this.employeeRepository.company(id);
  }
}
