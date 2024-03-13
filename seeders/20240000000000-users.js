"use strict";
require("dotenv").config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        email: "mystjerne14th@gmail.com",
        admin: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        email: "write.draw.sing.dance@gmail.com",
        admin: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
