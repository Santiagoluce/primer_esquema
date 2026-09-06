const Customer = require('../src/database/models/Customer');

describe('Customer Model', () => {
  it('debería requerir email, password y phone', async () => {
    const customer = new Customer({});
    let error;
    try {
      await customer.validate();
    } catch (err) {
      error = err;
    }
    expect(error.errors.email).toBeDefined();
    expect(error.errors.password).toBeDefined();
    expect(error.errors.phone).toBeDefined();
  });
});
