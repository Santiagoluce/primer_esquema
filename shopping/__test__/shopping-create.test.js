const Order = require('../src/database/models/Shopping');

describe('Order Creation', () => {
  it('debería crear una orden válida', async () => {
    const order = new Order({
      _id: 'abc123',
      amount: 1000,
      txnId: 'txn001',
      items: [{ product: { name: 'Moto Honda', price: 5000 }, unit: 1 }]
    });
    await order.validate();
    expect(order.status).toBe('received'); // valor por defecto
    expect(order.items[0].product.name).toBe('Moto Honda');
  });
});
