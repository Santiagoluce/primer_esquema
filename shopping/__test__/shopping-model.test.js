const Order = require('../src/database/models/Shopping');

describe('Order Model', () => {
  it('debería requerir amount y txnId', async () => {
    const order = new Order({ _id: '123' });
    let error;
    try {
      await order.validate();
    } catch (err) {
      error = err;
    }
    expect(error.errors.amount).toBeDefined();
    expect(error.errors.txnId).toBeDefined();
  });
});
