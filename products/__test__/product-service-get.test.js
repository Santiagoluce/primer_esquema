const ProductsService = require('../src/services/products-service');
const Product = require('../src/database/models/Product');

describe('ProductsService - GetProducts', () => {
  it('debería devolver productos existentes', async () => {
    const product = await Product.create({ name: 'Yamaha', type: 'motorcycle', price: 6000 });
    const service = new ProductsService();
    const response = await service.GetProducts();
    
    // La respuesta debe estar formateada
    expect(response.data).toBeDefined();
    expect(response.data.products).toBeDefined();
    expect(response.data.products.length).toBeGreaterThan(0);
    expect(response.data.products[0].name).toBe('Yamaha');
  }, 15000);
});
