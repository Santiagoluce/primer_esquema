const express = require('express');
const ShoppingService = require('../services/shopping-service');
const UserAuth = require('./middlewares/auth');

const router = express.Router();
const service = new ShoppingService();

const normalizeCartInput = (body = {}) => {
  const productInput = body.product || body.productData || body;
  const quantity = body.quantity ?? body.qty ?? (productInput && typeof productInput === 'object' ? productInput.quantity : 1);
  const productId = body.productId || productInput?._id || productInput?.id || body.id;

  const baseProduct = productInput && typeof productInput === 'object' ? { ...productInput } : {};
  const normalizedProduct = {
    ...baseProduct,
    ...(productId ? { _id: String(productId) } : {}),
    ...(body.name ? { name: body.name } : {}),
    ...(body.price != null ? { price: Number(body.price) } : {}),
    ...(body.image ? { image: body.image } : {}),
    ...(body.banner ? { banner: body.banner } : {}),
    ...(body.category ? { category: body.category } : {}),
    ...(body.description ? { description: body.description } : {}),
  };

  return { product: normalizedProduct, quantity: Number(quantity) || 1 };
};

const normalizeWishlistInput = (body = {}) => {
  const productInput = body.product || body.productData || body;
  const productId = body.productId || productInput?._id || productInput?.id || body.id;

  const baseProduct = productInput && typeof productInput === 'object' ? { ...productInput } : {};
  const normalizedProduct = {
    ...baseProduct,
    ...(productId ? { _id: String(productId) } : {}),
    ...(body.name ? { name: body.name } : {}),
    ...(body.price != null ? { price: Number(body.price) } : {}),
    ...(body.image ? { image: body.image } : {}),
    ...(body.banner ? { banner: body.banner } : {}),
    ...(body.category ? { category: body.category } : {}),
    ...(body.description ? { description: body.description } : {}),
  };

  return { product: normalizedProduct };
};

router.post('/order', UserAuth, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { txnId } = req.body;
    const data = await service.PlaceOrder(_id, txnId);
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/orders/:customerId', UserAuth, async (req, res, next) => {
  try {
    const { customerId } = req.params;
    const data = await service.GetShoppingDetails(customerId);
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/cart', UserAuth, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const data = await service.GetCart(_id);
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

router.delete('/cart/:productId', UserAuth, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { productId } = req.params;
    const data = await service.RemoveFromCart(_id, productId);
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

router.delete('/customer/cart/:productId', UserAuth, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { productId } = req.params;
    const data = await service.RemoveFromCart(_id, productId);
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post('/cart', UserAuth, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { product, quantity } = normalizeCartInput(req.body);
    const data = await service.AddToCart(_id, product, quantity);
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

router.put('/cart', UserAuth, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { product, quantity } = normalizeCartInput(req.body);
    const data = await service.AddToCart(_id, product, quantity);
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/wishlist', UserAuth, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const data = await service.GetWishlist(_id);
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

router.delete('/wishlist/:productId', UserAuth, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { productId } = req.params;
    const data = await service.RemoveFromWishlist(_id, productId);
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

router.delete('/customer/wishlist/:productId', UserAuth, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { productId } = req.params;
    const data = await service.RemoveFromWishlist(_id, productId);
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post('/wishlist', UserAuth, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { product } = normalizeWishlistInput(req.body);
    const data = await service.AddToWishlist(_id, product);
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

router.put('/wishlist', UserAuth, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { product } = normalizeWishlistInput(req.body);
    const data = await service.AddToWishlist(_id, product);
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

router.put('/customer/cart', UserAuth, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { product, quantity } = normalizeCartInput(req.body);
    const data = await service.AddToCart(_id, product, quantity);
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

router.put('/customer/wishlist', UserAuth, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { product } = normalizeWishlistInput(req.body);
    const data = await service.AddToWishlist(_id, product);
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/customer/shopping-details', UserAuth, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const data = await service.GetShoppingDetails(_id);
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

router.get('/shopping-details', UserAuth, async (req, res, next) => {
  try {
    const { _id } = req.user;
    const data = await service.GetShoppingDetails(_id);
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
