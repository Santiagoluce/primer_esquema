const Product = require('../src/database/models/Product');

describe('Product Creation', () => {
  it('debería crear un producto válido', async () => {
    const product = new Product({
      name: 'Moto Honda',
      type: 'motorcycle',
      price: 5000,
    });
    await product.validate();
    expect(product.name).toBe('Moto Honda');
    expect(product.available).toBe(true); // valor por defecto
  });
});
