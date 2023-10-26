'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.belongsTo(models.User);
      Product.belongsToMany(models.User, { through: 'Orders' });
    }
  }
  Product.init({
    photoUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Image URL is required' },
        notEmpty: { msg: 'Image URL is required' }
      }
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Product Name is required' },
        notEmpty: { msg: 'Product Name is required' }
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Description is required' },
        notEmpty: { msg: 'Description is required' }
      }
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Price is required' },
        notEmpty: { msg: 'Price is required' }
      }
    },
    totalSales: DataTypes.INTEGER,
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: { msg: 'Category is required' },
        notEmpty: { msg: 'Category is required' }
      }
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Stock is required' },
        notEmpty: { msg: 'Stock is required' }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};