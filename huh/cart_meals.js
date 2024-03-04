"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cart_meals extends Model {
    static associate(models) {
      // Do i even really need to have a cart_meals model? it's not like bigfoot had sightings_category as a model. remove this and see what happens?
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
