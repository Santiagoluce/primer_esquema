const Address = require('../src/database/models/Address');

describe('Address Model', () => {
  it('debería requerir street, city y country', async () => {
    const address = new Address({});
    let error;
    try {
      await address.validate();
    } catch (err) {
      error = err;
    }
    expect(error.errors.street).toBeDefined();
    expect(error.errors.city).toBeDefined();
    expect(error.errors.country).toBeDefined();
  });
});
