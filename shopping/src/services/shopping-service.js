const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  product: { type: Object, default: {} },
  quantity: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

const wishlistSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  productId: { type: String, required: true },
  product: { type: Object, default: {} },
  createdAt: { type: Date, default: Date.now },
});

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  txnId: { type: String, required: true },
  items: { type: Array, default: [] },
  amount: { type: Number, default: 0 },
  status: { type: String, default: 'received' },
  date: { type: Date, default: Date.now },
});

class ShoppingService {
  constructor() {
    this.Cart = mongoose.models.Cart || mongoose.model('Cart', cartSchema);
    this.Wishlist = mongoose.models.Wishlist || mongoose.model('Wishlist', wishlistSchema);
    this.Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
    this.memoryCart = new Map();
  }

  _normalizeProduct(product, fallbackId, quantityOverride) {
    const productObj = product && typeof product === 'object' ? product : { _id: fallbackId || product };
    const productId = productObj._id || productObj.id || fallbackId || product;
    const safeQuantity = Number(quantityOverride ?? productObj.quantity ?? productObj.qty ?? 1) || 1;

    return {
      productId: String(productId),
      product: {
        ...productObj,
        _id: String(productId || productObj._id || productObj.id || ''),
      },
      quantity: safeQuantity,
    };
  }

  async PlaceOrder(userId, txnId) {
    const cartItems = await this.Cart.find({ userId });

    if (!cartItems || cartItems.length === 0) {
      throw new Error('Carrito vacío');
    }

    const amount = cartItems.reduce((total, item) => {
      const unitPrice = Number(item.product?.price || item.product?.amount || 0);
      const qty = Number(item.quantity || 1);
      return total + (unitPrice * qty);
    }, 0);

    const order = new this.Order({
      userId,
      txnId,
      items: cartItems,
      amount,
      status: 'received',
      date: new Date(),
    });

    await order.save();
    await this.Cart.deleteMany({ userId });

    return { success: true, order };
  }

  async AddToCart(userId, productInput, quantityInput) {
    const { productId, product, quantity } = this._normalizeProduct(productInput, productInput, quantityInput);

    if (mongoose.connection.readyState !== 1) {
      const key = `${userId}:${productId}`;
      const existing = this.memoryCart.get(key);
      const item = existing || { userId, productId, product, quantity };

      item.product = product;
      item.quantity = quantity;
      this.memoryCart.set(key, item);

      return {
        success: true,
        message: existing ? 'Producto actualizado en el carrito' : 'Producto agregado al carrito',
        item,
      };
    }

    const data = { userId, productId, product, quantity };

    const existing = await this.Cart.findOne({ userId, productId });

    if (existing) {
      existing.quantity = quantity;
      existing.product = product;
      await existing.save();
      return { success: true, message: 'Producto actualizado en el carrito', item: existing };
    }

    const cartItem = new this.Cart(data);
    await cartItem.save();
    return { success: true, message: 'Producto agregado al carrito', item: cartItem };
  }

  async AddToWishlist(userId, productInput) {
    const { productId, product } = this._normalizeProduct(productInput, productInput);

    const existing = await this.Wishlist.findOne({ userId, productId });

    if (existing) {
      existing.product = product;
      await existing.save();
      return { success: true, message: 'Producto actualizado en la wishlist', item: existing };
    }

    const wishlistItem = new this.Wishlist({ userId, productId, product });
    await wishlistItem.save();
    return { success: true, message: 'Producto agregado a la wishlist', item: wishlistItem };
  }

  async RemoveFromWishlist(userId, productId) {
    const item = await this.Wishlist.findOneAndDelete({ userId, productId: String(productId) });
    const remaining = await this.Wishlist.find({ userId }).sort({ createdAt: -1 });
    return remaining;
  }

  async RemoveFromCart(userId, productId) {
    const item = await this.Cart.findOneAndDelete({ userId, productId: String(productId) });
    const remaining = await this.Cart.find({ userId }).sort({ createdAt: -1 });
    return remaining;
  }

  async GetCart(userId) {
    return this.Cart.find({ userId }).sort({ createdAt: -1 });
  }

  async GetWishlist(userId) {
    return this.Wishlist.find({ userId }).sort({ createdAt: -1 });
  }

  async GetShoppingDetails(userId) {
    const [orders, cart, wishlist] = await Promise.all([
      this.Order.find({ userId }).sort({ date: -1 }),
      this.GetCart(userId),
      this.GetWishlist(userId),
    ]);

    return { orders, cart, wishlist };
  }
}

module.exports = ShoppingService;
