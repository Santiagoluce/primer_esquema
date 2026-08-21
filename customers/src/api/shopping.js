const ShoppingService = require('../services/shopping-service');
const UserAuth = require('./middlewares/auth');

module.exports = (app) => {

    const service = new ShoppingService();

    app.post('/shopping/order/', UserAuth, async (req, res, next) => {
        try {
            const { _id } = req.user;
            const { txnId } = req.body;
            const { data } = await service.PlaceOrder(_id, txnId);
            return res.json(data);
        } catch (err) {
            next(err);
        }
    });
}
