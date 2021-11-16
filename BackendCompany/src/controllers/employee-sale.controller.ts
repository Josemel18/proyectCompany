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
  Sale,
} from '../models';
import {EmployeeRepository} from '../repositories';

export class EmployeeSaleController {
  constructor(
    @repository(EmployeeRepository) protected employeeRepository: EmployeeRepository,
  ) { }

  @get('/employees/{id}/sales', {
    responses: {
      '200': {
        description: 'Array of Employee has many Sale',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Sale)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Sale>,
  ): Promise<Sale[]> {
    return this.employeeRepository.sales(id).find(filter);
  }

  @post('/employees/{id}/sales', {
    responses: {
      '200': {
        description: 'Employee model instance',
        content: {'application/json': {schema: getModelSchemaRef(Sale)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Employee.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sale, {
            title: 'NewSaleInEmployee',
            exclude: ['id'],
            optional: ['employeeId']
          }),
        },
      },
    }) sale: Omit<Sale, 'id'>,
  ): Promise<Sale> {
    return this.employeeRepository.sales(id).create(sale);
  }

  @patch('/employees/{id}/sales', {
    responses: {
      '200': {
        description: 'Employee.Sale PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Sale, {partial: true}),
        },
      },
    })
    sale: Partial<Sale>,
    @param.query.object('where', getWhereSchemaFor(Sale)) where?: Where<Sale>,
  ): Promise<Count> {
    return this.employeeRepository.sales(id).patch(sale, where);
  }

  @del('/employees/{id}/sales', {
    responses: {
      '200': {
        description: 'Employee.Sale DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Sale)) where?: Where<Sale>,
  ): Promise<Count> {
    return this.employeeRepository.sales(id).delete(where);
  }
}
