'use strict';

const {Order, Product, ProductDetail, User, UserDetail} = require("../models");
const { Op } = require("sequelize");

class CartController {
    static async createCart(req, res) {
        const {ProductId} = req.body;
        try {

            const product = await Product.findByPk(ProductId);
            const isExist = await Order.findOne({
                where: {
                    [Op.and]: [
                      { UserId: req.session.userId },
                      { ProductId: ProductId },
                      { status: 'unpaid' },
                    ]
                  }
            });

            let totalItem = 1;
       
            const data = {
                UserId : req.session.userId,
                ProductId,
                totalItem : totalItem,
                totalPrice : product.price * totalItem,
                status : 'unpaid',
            }

            if (isExist) {
                totalItem += isExist.totalItem;
                console.log(isExist.id)
                
                await Order.update({totalItem}, {
                    where : {
                        id : isExist.id
                    }
                });                
            }else{

                await Order.create(data);
            }


            res.redirect(`/products/cart/user/${req.session.userId}`);
        } catch (error) {
          console.log(error);
          res.send(error.message);
        }
    }

    static async cartMenu(req, res) {
        try {
            const orders = await Order.findAll({
                where : {
                    UserId : req.params.userId
                },
                include : {
                    model : Product,
                    include : {
                        model : User,
                        include : UserDetail
                    }
                }
            });
    
          // const { paymentId } = req.params;
          // const { orderId } = req.query;
        //   const orderId = 2;
        //   const order = await Order.findByPk(orderId);
    
        //   const { UserId, ProductId } = order;
        //   const buyerDetail = await UserDetail.findOne({
        //     where: {
        //       UserId
        //     }
        //   });
    
        //   const product = await Product.findByPk(ProductId, {
        //     include: {
        //       model: User,
        //       include: {
        //         model: UserDetail,
        //         attributes: ['fullName']
        //       }
        //     }
        //   });
          
        //   const paymentMethods = await PaymentMethod.findAll();
            // console.log(orders[0])
            // console.log(orders[0].Product)
            // console.log(orders[0].Product.User)
            // console.log(orders[0].Product.User.UserDetail)
          res.render('./cart/index', {orders});
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }

    }


    static async changeTotal(req, res) {
        try {
            const status = req.path.split('/').at(-1);

            if (status === 'increment') {
                await Order.increment({totalItem: 1}, { where: { id: req.params.orderId } })
            }
            if (status === 'decrement') {
                await Order.decrement({totalItem: 1}, { where: { id: req.params.orderId } })
            }


            res.redirect(`/products/cart/user/${req.params.userId}`)
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }
}
module.exports = CartController;