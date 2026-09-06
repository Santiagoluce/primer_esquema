const ProductsService = require('../src/services/products-service');
const Product = require('../src/database/models/Product');

describe('ProductsService - GetProductById', () => {
  it('debería devolver un producto por ID', async () => {
    const product = await Product.create({ name: 'Suzuki', type: 'motorcycle', price: 7000 });
    const service = new ProductsService();
    const response = await service.GetProductById(product._id);
    
    expect(response.data).toBeDefined();
    expect(response.data.name).toBe('Suzuki');
    expect(response.data.price).toBe(7000);
  }, 15000);
});

