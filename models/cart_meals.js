"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cart_meals extends Model {
    static associate(models) {
      this.belongsTo(models.cart, {
        foreignKey: "cartId",
      });
      this.belongsTo(models.meals, {
        foreignKey: "mealId",
      });
    }
  }

  cart_meals.init(
    {
      cartId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      mealId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "cart_meals",
      underscored: true,
    }
  );
  return cart_meals;
};
