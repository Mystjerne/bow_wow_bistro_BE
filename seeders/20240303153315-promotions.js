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
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        promo_name: "Completed Promotion",
        percentage: 50,
        availability: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("promotions");
  },
};
