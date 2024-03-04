"use strict";
require("dotenv").config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        username: "User_1",
        phone_number: process.env.ADMIN_PHONE_NUMBER,
        password: process.env.ADMIN_PASSWORD,
        admin: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: "User_2",
        phone_number: 87634648,
        password: "password123",
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
