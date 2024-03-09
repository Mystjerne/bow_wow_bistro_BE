"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class meal_ingredients extends Model {
    static associate(models) {
      this.belongsTo(models.ingredients, {
        foreignKey: "ingredientId",
      });
      this.belongsTo(models.meals, {
        foreignKey: "mealId",
      });
    }
  }
  meal_ingredients.init(
    {
      mealId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ingredientId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      required: DataTypes.BOOLEAN,
      added: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "meal_ingredients",
      underscored: true,
    }
  );
  return meal_ingredients;
};
