'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.renameColumn('PaymentMethods', 'imageURL', 'logoUrl');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('PaymentMethods', 'logoUrl', 'imageURL');
  }
};
