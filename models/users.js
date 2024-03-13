"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      //the user can technically exist without the cart.
      this.hasOne(models.cart, { foreignKey: "userId" });
    }
  }
  users.init(
    {
      email: DataTypes.STRING,
      admin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "users",
      underscored: true,
    }
  );
  return users;
};
