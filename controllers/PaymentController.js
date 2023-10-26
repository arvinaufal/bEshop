'use strict';

const { Op, or } = require('sequelize');
const { Order, User, UserDetail, Product, PaymentMethod } = require('../models');

class PaymentController {
  static async getPayment(req, res) {
    try {
      // const { paymentId } = req.params;
      // const { orderId } = req.query;
      const orderId = 2;
      const order = await Order.findByPk(orderId);

      const { UserId, ProductId } = order;
      const buyerDetail = await UserDetail.findOne({
        where: {
          UserId
        }
      });

      const product = await Product.findByPk(ProductId, {
        include: {
          model: User,
          include: {
            model: UserDetail,
            attributes: ['fullName']
          }
        }
      });
      
      const paymentMethods = await PaymentMethod.findAll();

      res.render('./payments/payment', { order, buyerDetail, product, paymentMethods });
    } catch (error) {
      console.log(error);
      res.send(error.message)
    }
  }
}

module.exports = PaymentController;