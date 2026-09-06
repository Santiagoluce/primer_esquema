const express = require('express');
const router = express.Router();
const auth = require('./middlewares/auth');
const CustomerService = require('../services/customer-service');

const customerService = new CustomerService();

router.post('/signup', async (req, res, next) => {
  try {
    const email = req.body.email || req.body.username || req.body.user;
    const password = req.body.password || req.body.pass;
    const phone = req.body.phone || req.body.mobile || req.body.tel;

    if (!email || !password || !phone) {
      return res.status(400).json({ error: 'Todos los campos son obligatorios' });
    }

    const { data } = await customerService.SignUp({ email, password, phone });
    return res.status(201).json({ email, ...data });
  } catch (err) {
    next(err);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const email = req.body.email || req.body.username || req.body.user;
    const password = req.body.password || req.body.pass;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
    }

    const { data } = await customerService.SignIn({ email, password });
    return res.json({ email, ...data });
  } catch (err) {
    next(err);
  }
});

router.post('/signin', async (req, res, next) => {
  try {
    const email = req.body.email || req.body.username || req.body.user;
    const password = req.body.password || req.body.pass;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
    }

    const { data } = await customerService.SignIn({ email, password });
    return res.json({ email, ...data });
  } catch (err) {
    next(err);
  }
});

router.get('/profile', auth, async (req, res, next) => {
  try {
    const { data } = await customerService.GetProfile({ _id: req.user._id });
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post('/address', auth, async (req, res, next) => {
  try {
    const { street, postalCode, city, country } = req.body || {};

    if (!street || !city || !country) {
      return res.status(400).json({ error: 'Calle, ciudad y país son obligatorios' });
    }

    const { data } = await customerService.AddNewAddress(req.user._id, {
      street,
      postalCode,
      city,
      country,
    });

    return res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

router.put('/address/:addressId', auth, async (req, res, next) => {
  try {
    const { street, postalCode, city, country } = req.body || {};

    if (!street || !city || !country) {
      return res.status(400).json({ error: 'Calle, ciudad y país son obligatorios' });
    }

    const { data } = await customerService.UpdateAddress(req.user._id, req.params.addressId, {
      street,
      postalCode,
      city,
      country,
    });

    return res.json(data);
  } catch (err) {
    next(err);
  }
});

router.delete('/address/:addressId', auth, async (req, res, next) => {
  try {
    const { data } = await customerService.DeleteAddress(req.user._id, req.params.addressId);
    return res.json(data);
  } catch (err) {
    next(err);
  }
});

router.post('/customer/address', auth, async (req, res, next) => {
  try {
    const { street, postalCode, city, country } = req.body || {};

    if (!street || !city || !country) {
      return res.status(400).json({ error: 'Calle, ciudad y país son obligatorios' });
    }

    const { data } = await customerService.AddNewAddress(req.user._id, {
      street,
      postalCode,
      city,
      country,
    });

    return res.status(201).json(data);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
