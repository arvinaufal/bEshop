'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    let users = require('../jsons/users.json');
    let userDetails = require('../jsons/userDetails.json');

    users.forEach((d) => {
      d.createdAt = d.updatedAt = new Date();
    });
    userDetails.forEach((d) => {
      d.createdAt = d.updatedAt = new Date();
    });

    await queryInterface.bulkInsert('Users', users);
    await queryInterface.bulkInsert('UserDetails', userDetails);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserDetails', null, {});
    await queryInterface.bulkDelete('Users', null, {});
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
