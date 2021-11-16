import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Sale,
  Employee,
} from '../models';
import {SaleRepository} from '../repositories';

export class SaleEmployeeController {
  constructor(
    @repository(SaleRepository)
    public saleRepository: SaleRepository,
  ) { }

  @get('/sales/{id}/employee', {
    responses: {
      '200': {
        description: 'Employee belonging to Sale',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Employee)},
          },
        },
      },
    },
  })
  async getEmployee(
    @param.path.string('id') id: typeof Sale.prototype.id,
  ): Promise<Employee> {
    return this.saleRepository.employee(id);
  }
}
