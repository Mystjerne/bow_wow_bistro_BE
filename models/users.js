"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    static associate(models) {
      //the user can technically exist without the cart.
      this.hasOne(models.cart, { foreignKey: "cartId" });
    }
  }
  users.init(
    {
      username: DataTypes.STRING,
      phone_number: DataTypes.INTEGER,
      password: DataTypes.STRING,
      admin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "users",
      // underscored: true,
    }
  );
  return users;
};
