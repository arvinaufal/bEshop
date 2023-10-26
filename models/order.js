'use strict';
const {
  Model
} = require('sequelize');
const { formatToDollar } = require('../helper');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.PaymentMethod);
      Order.belongsTo(models.Product);
      // Order.belongsTo(models.User, { as: 'Buyer' });
    }

    get totalPriceInDollar() {
      return formatToDollar(this.totalPrice);
    }
  }
  Order.init({
    UserId: DataTypes.INTEGER,
    ProductId: DataTypes.INTEGER,
    totalItem: DataTypes.INTEGER,
    totalPrice: DataTypes.INTEGER,
    status: DataTypes.STRING,
    PaymentMethodId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};