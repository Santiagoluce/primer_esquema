const mongoose = require('mongoose');

const CustomerSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  salt: { type: String },
  phone: { type: String, required: true },
  address: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Address', default: [] }],
  cart: [{ type: mongoose.Schema.Types.Mixed, default: [] }],
  wishlist: [{ type: mongoose.Schema.Types.Mixed, default: [] }],
  orders: [{ type: mongoose.Schema.Types.Mixed, default: [] }],
}, {
  timestamps: true,
});

module.exports = mongoose.model('Customer', CustomerSchema);
