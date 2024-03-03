"use strict";
require("dotenv").config();

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      //Salmon Snout Smacker
      {
        username: "User_1",
        phone_number: process.env.ADMIN_PHONE_NUMBER,
        password: process.env.ADMIN_PASSWORD,
        admin: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        username: "User_2",
        phone_number: 87634648,
        password: "password123",
        admin: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
