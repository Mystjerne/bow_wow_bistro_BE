"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    static associate(models) {
      this.belongsToMany(models.meals, { through: "cart_meals" });
      this.belongsTo(models.users);
    }
  }
  cart.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      totalPrice: DataTypes.INTEGER,
      completed: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "cart",
      underscored: true,
    }
  );
  return cart;
};
