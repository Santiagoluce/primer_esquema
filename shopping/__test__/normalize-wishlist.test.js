
const { normalizeWishlistInput } = require('../src/api/shopping');

describe('normalizeWishlistInput', () => {
  it('debería normalizar producto para wishlist', () => {
    const body = { productId: 'p2', name: 'Suzuki', price: 7000 };
    const { product } = normalizeWishlistInput(body);
    expect(product._id).toBe('p2');
    expect(product.name).toBe('Suzuki');
    expect(product.price).toBe(7000);
  });
});
