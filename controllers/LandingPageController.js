const { Product } = require('../models');
const { Op } = require('sequelize');

class LandingPageController {
    static async landingPage(req, res) {
        const { sortBy, keyword, filterBy } = req.query;

        try {
            const categories = ["smartphones", "laptops", "fragrances", "skincare", "groceries", "home-decoration", "furniture", "tops", "womens-dresses", "womens-shoes", "mens-shirts", "mens-shoes", "mens-watches", "womens-watches", "womens-bags", "womens-jewellery", "sunglasses", "automotive", "motorcycle", "lighting"];

            let where = {};

            if (keyword) {
                where.name = {
                    [Op.iLike]: `%${keyword}%`
                };
            }

            if (filterBy) {
                where.category = filterBy;
            }

            const query = {
                where,
            };

            if (sortBy) {
                query.order = [['price', sortBy]];
            }

            const products = await Product.findAll(query);

            res.render('index', { categories, products });
        } catch (error) {
            console.log(error);
            res.send(error.message);
        }
    }
}

module.exports = LandingPageController;
