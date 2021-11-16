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
Sale,
SaleProduct,
Product,
} from '../models';
import {SaleRepository} from '../repositories';

export class SaleProductController {
  constructor(
    @repository(SaleRepository) protected saleRepository: SaleRepository,
  ) { }

  @get('/sales/{id}/products', {
    responses: {
      '200': {
        description: 'Array of Sale has many Product through SaleProduct',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Product)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Product>,
  ): Promise<Product[]> {
    return this.saleRepository.products(id).find(filter);
  }

  @post('/sales/{id}/products', {
    responses: {
      '200': {
        description: 'create a Product model instance',
        content: {'application/json': {schema: getModelSchemaRef(Product)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Sale.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {
            title: 'NewProductInSale',
            exclude: ['id'],
          }),
        },
      },
    }) product: Omit<Product, 'id'>,
  ): Promise<Product> {
    return this.saleRepository.products(id).create(product);
  }

  @patch('/sales/{id}/products', {
    responses: {
      '200': {
        description: 'Sale.Product PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Product, {partial: true}),
        },
      },
    })
    product: Partial<Product>,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where<Product>,
  ): Promise<Count> {
    return this.saleRepository.products(id).patch(product, where);
  }

  @del('/sales/{id}/products', {
    responses: {
      '200': {
        description: 'Sale.Product DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Product)) where?: Where<Product>,
  ): Promise<Count> {
    return this.saleRepository.products(id).delete(where);
  }
}
