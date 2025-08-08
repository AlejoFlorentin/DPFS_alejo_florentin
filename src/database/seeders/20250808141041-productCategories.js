'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('product_categories', [
      {
        name: 'camisetas',
      },
      {
        name: 'pantalones',
      },
      {
        name: 'bermudas',
      },
      {
        name: 'zapatillas',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('product_categories', null, {});
  },
};
