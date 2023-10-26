'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const orders = [
      {
        UserId: 1,
        ProductId: 1,
        totalItem: 2,
        totalPrice: 6000,
        status: 'cart',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        UserId: 1,
        ProductId: 2,
        totalItem: 1,
        totalPrice: 10000,
        status: 'cart',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]
    await queryInterface.bulkInsert('Orders', orders);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Orders', null, {});
  }
};
