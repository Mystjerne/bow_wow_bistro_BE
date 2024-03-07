"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class meal_ingredients extends Model {
    static associate(models) {
      this.belongsTo(models.ingredients, {
        foreignKey: "ingredient_id",
      });
      this.belongsTo(models.meals, {
        foreignKey: "meal_id",
      });
    }
  }
  meal_ingredients.init(
    {
      meal_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      ingredient_id: {
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
