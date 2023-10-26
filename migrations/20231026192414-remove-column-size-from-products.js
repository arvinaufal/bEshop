'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Products', 'size');
  },
  
  async down (queryInterface, Sequelize) {
    await queryInterface.addColumn('Products', 'size', {
      type: Sequelize.STRING(20),
      allowNull: false
    });
  }
};
