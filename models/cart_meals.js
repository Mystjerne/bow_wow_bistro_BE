"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cart_meals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  }
  cart_meals.init(
    {
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "cart_meals",
      underscored: true,
    }
  );
  return cart_meals;
};
