"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class meals extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static associate(models) {
      this.belongsToMany(models.cart, { through: "cart_meals" });
    }
  }
  meals.init(
    {
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "meals",
      underscored: true,
    }
  );
  return meals;
};
