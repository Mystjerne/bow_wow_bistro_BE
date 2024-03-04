"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ingredients", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      ingredient_name: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      category: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      additional_price: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      availability: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      add_on: {
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
    await queryInterface.dropTable("ingredients");
  },
};
