const ShoppingService = require('../src/services/shopping-service');

describe('ShoppingService', () => {
  it('AddToCart debería devolver confirmación', async () => {
    const service = new ShoppingService();
    const result = await service.AddToCart('user123', { _id: 'p1', name: 'Honda', price: 5000 }, 1);
    expect(result).toHaveProperty('success');
    expect(result.success).toBe(true);
  });
});
