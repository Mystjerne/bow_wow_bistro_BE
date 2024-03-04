"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("cart_meals", [
      {
        cart_id: 1,
        meal_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        cart_id: 1,
        meal_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        cart_id: 2,
        meal_id: 8,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("cart_meals");
  },
};
