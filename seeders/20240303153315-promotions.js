"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("promotions", [
      //Salmon Snout Smacker
      {
        promo_name: "Launch Week Discount",
        percentage: 10,
        availability: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        promo_name: "Completed Promotion",
        percentage: 50,
        availability: false,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("promotions");
  },
};
