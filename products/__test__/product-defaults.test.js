const Product = require('../src/database/models/Product');

describe('Product Defaults', () => {
  it('debería asignar available=true por defecto', async () => {
    const product = new Product({
      name: 'Kawasaki',
      type: 'motorcycle',
      price: 8000,
    });
    await product.validate();
    expect(product.available).toBe(true);
  });
});
