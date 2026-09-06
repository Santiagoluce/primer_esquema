const Product = require('../src/database/models/Product');

describe('Product Model', () => {
  it('debería requerir nombre y precio', async () => {
    const product = new Product({ type: 'motorcycle' });
    let error;
    try {
      await product.validate();
    } catch (err) {
      error = err;
    }
    expect(error.errors.name).toBeDefined();
    expect(error.errors.price).toBeDefined();
  });
});
