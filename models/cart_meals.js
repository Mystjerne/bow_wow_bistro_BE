"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cart_meals extends Model {
    static associate(models) {
      this.belongsTo(models.cart, {
        foreignKey: "cart_id",
      });
      this.belongsTo(models.meals, {
        foreignKey: "meal_id",
      });
    }
  }

  cart_meals.init(
    {
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      meal_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "cart_meals",
      // underscored: true,
    }
  );
  return cart_meals;
};
