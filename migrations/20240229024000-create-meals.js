"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("meals", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id",
        },
        allowNull: true,
      },
      meal_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      meal_photo: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      meal_description: {
        allowNull: false,
        type: Sequelize.STRING,
      },

      base_price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },

      availability: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },

      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("meals");
  },
};
