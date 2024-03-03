"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("cart_meals", [
      {
        cart_id: 1,
        meal_id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cart_id: 1,
        meal_id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        cart_id: 2,
        meal_id: 8,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
