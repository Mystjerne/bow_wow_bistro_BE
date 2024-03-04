"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("carts", [
      //Salmon Snout Smacker
      {
        user_id: 2,
        //need to fill cart with meals before can calculate total price.
        //Salmon Snout Smacker = 14.5 if no replacements
        //Big Beefy Bowl is 18
        total_price: 32.5,
        completed: false,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        //need to fill cart with meals before can calculate total price.
        //Salmon Snout Smacker = 14.5 if no replacements
        //Big Beefy Bowl is 18
        total_price: 9,
        completed: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("cart");
  },
};
