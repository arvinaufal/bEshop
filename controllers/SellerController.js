'use strict';

const { Op } = require('sequelize');
const { Product } = require('../models');

class SellerController {
  static getProfile(req, res) {
    try {
      // profile or redirect '/login/sellers'
      // res.send('seller profile (opt)');
      res.send('test');
    } catch (error) {
      res.send(error.message);
    }
  }
  
  static async getProducts(req, res) {
    try {
      const { sellerId } = req.params;
      const { search, filter } = req.query;
      let searchFilter = {
        UserId: sellerId
      };

      if (search) {
        searchFilter.name = {
          [Op.iLike]: `%${search}%`
        };
      }

      if (filter) {
        searchFilter.category = filter;
      }

      const products = await Product.findAll({
        where: searchFilter
      });

      res.render('./sellers/products', { products, sellerId, filter });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
  
  static async getAddProduct(req, res) {
    try {
      const { sellerId } = req.params;
      const { errors } = req.query;

      res.render('./sellers/productAdd', { sellerId, errors });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async addProduct(req, res) {
    const { sellerId } = req.params;
    const { name, price, category, stock, photoUrl, description } = req.body;

    try {
      await Product.create({
        name,
        price,
        category,
        stock,
        photoUrl,
        description,
        UserId: sellerId
      });
      res.redirect(`/sellers/${sellerId}/products`);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const errors = error.errors.map((error) => {
          return error.message;
        });
        res.redirect(`/sellers/${sellerId}/products/add?errors=${errors}`);
        return
      }
      console.log(error);
      res.send(error.message);
    }
  }

  static async getEditProduct(req, res) {
    
    try {
      const { sellerId, productId } = req.params;
      const { errors } = req.query;
      const product = await Product.findByPk(productId);
      res.render('./sellers/productEdit', { product, sellerId, errors });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async editProduct(req, res) {
    const { sellerId, productId } = req.params;
    const { name, price, category, stock, photoUrl, description } = req.body;

    try {
      await Product.update({
        name,
        price,
        category,
        stock,
        photoUrl,
        description
      }, {
        where: {
          id: productId
        }
      });

      res.redirect(`/sellers/${sellerId}/products`);
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const errors = error.errors.map((error) => {
          return error.message;
        });
        res.redirect(`/sellers/${sellerId}/products/${productId}/edit?errors=${errors}`);
        return
      }
      console.log(error);
      res.send(error.message);
    }
  }

  static async deleteProduct(req, res) {
    try {
      const { sellerId, productId } = req.params;
      await Product.destroy({
        where: {
          id: productId
        }
      })
      res.redirect(`/sellers/${sellerId}/products`);
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
}

module.exports = SellerController;