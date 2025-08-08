'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('sizes', [
      {
        size: 'S',
      },
      {
        size: 'M',
      },
      {
        size: 'L',
      },
      {
        size: 'XL',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('sizes', null, {});
  },
};
