"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class meals extends Model {
    static associate(models) {
      this.belongsToMany(models.cart, { through: "cart_meals" });
      this.belongsToMany(models.ingredients, { through: "meal_ingredients" });
      this.belongsToMany(models.promotions, { through: "meal_promotions" });
    }
  }
  meals.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      meal_name: DataTypes.STRING,
      meal_photo: DataTypes.STRING,
      meal_description: DataTypes.STRING,
      base_price: DataTypes.INTEGER,
      availability: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "meals",
      underscored: true,
    }
  );
  return meals;
};
