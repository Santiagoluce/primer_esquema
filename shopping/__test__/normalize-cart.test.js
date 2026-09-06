const { normalizeCartInput } = require('../src/api/shopping');

describe('normalizeCartInput', () => {
  it('debería normalizar producto y cantidad', () => {
    const body = { productId: 'p1', name: 'Yamaha', price: 6000, quantity: 2 };
    const { product, quantity } = normalizeCartInput(body);
    expect(product._id).toBe('p1');
    expect(product.name).toBe('Yamaha');
    expect(quantity).toBe(2);
  });
});
