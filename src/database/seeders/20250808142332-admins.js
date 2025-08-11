"use strict";

const { name } = require("ejs");
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const category = await queryInterface.sequelize.query(
      `SELECT id FROM user_categories WHERE name = 'Admin';`
    );

    await queryInterface.bulkInsert("users", [
      {
        name: "Alejo Augusto",
        last_name: "Florentin",
        phone: "1150620957",
        email: "alejoflorentin@gmail.com",
        password: bcrypt.hashSync("florentin5654", 10),
        category_id: category[0][0].id,
        created_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};
