'use strict';

const { Op, or } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { Order, User, UserDetail, Product, PaymentMethod } = require('../models');
const easyinvoice = require('easyinvoice');

class PaymentController {
  static async getPayment(req, res) {
    try {
      const { paymentId } = req.params;
      const order = await Order.findByPk(paymentId);

      const { UserId, ProductId } = order;
      const buyerDetail = await UserDetail.findOne({
        where: {
          UserId
        }
      });

      const product = await Product.findByPk(ProductId, {
        include: {
          model: User,
          attributes: ['id'],
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

  static async updatePayment(req, res) {
    try {
      const { paymentId } = req.params;
      const { PaymentMethodId } = req.body;

      await Order.update({
        PaymentMethodId,
        status: 'paid'
      }, {
        where: {
          id: paymentId
        }
      });

      res.redirect(`/products/${paymentId}/payment/confirmation`);
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async getConfirmation(req, res) {
    try {
      const { paymentId } = req.params;
      res.render('./payments/paymentConfirmation', { paymentId });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async downloadInvoice(req, res) {
    try {
      const { paymentId } = req.params;
      const order = await Order.findByPk(paymentId, {
        include: PaymentMethod
      });

      const { UserId, ProductId, totalItem, totalPrice, PaymentMethod: paymentMethod } = order;
      const buyer = await UserDetail.findOne({
        where: {
          UserId
        }
      });

      const product = await Product.findByPk(ProductId);
      const sellerDetail = await User.findByPk(product.UserId, {
        attributes: ['id', 'email'],
        include: {
          model: UserDetail
        }
      });
      const { UserDetail: seller } = sellerDetail;

      var data = {
        "images": {
            "logo": "https://glints.com/id/lowongan/wp-content/uploads/2020/04/hacktiv8-kursus-full-stack-developer.png",
            // "background": "https://public.easyinvoice.cloud/img/watermark-draft.jpg"
        },
        "sender": {
            "company": seller.fullName, // seller fullname
            "address": seller.address, // address
            "zip": seller.phone
        },
        "client": {
            "company": buyer.fullName, // buyer name
            "address": buyer.address, // address
            "zip": buyer.phone
        },
        "information": {
            "number": paymentMethod.name,
            "date": order.updatedAt.toLocaleString('en-US'),
        },
        "products": [
            {
                "quantity": totalItem, // totalItem
                "description": product.name, // product name
                "price": totalPrice,
                "tax-rate": 0
            }
        ],
        "bottom-notice": "Thanks for buy... $$$",
        "settings": {
            "currency": "USD",
        },
        "translate": {
            "invoice": "bEshop",  
            "number": "Payment Method", 
            "due-date": "Created-At",
        },
    };

      const result = await easyinvoice.createInvoice(data);
      await fs.writeFileSync("./invoice/invoice.pdf", result.pdf, 'base64');
      const file = path.join(__dirname, '..', '/invoice/invoice.pdf');
      res.download(file);
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }


  static async toPayment(req, res) {
    const {OrderId} = req.body;
    try {

      res.redirect(`/products/${OrderId}/payment`);
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
}

module.exports = PaymentController;