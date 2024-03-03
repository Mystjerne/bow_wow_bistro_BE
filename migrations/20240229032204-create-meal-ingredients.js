"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("meal_ingredients", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      meal_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "meals",
          key: "id",
        },
      },

      ingredient_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "ingredients",
          key: "id",
        },
      },

      required: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
      },
      added: {
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
    await queryInterface.dropTable("meal_ingredients");
  },
};
