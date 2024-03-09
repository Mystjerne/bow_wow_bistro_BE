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
      userId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      mealName: DataTypes.STRING,
      mealPhoto: DataTypes.STRING,
      mealDescription: DataTypes.STRING,
      basePrice: DataTypes.INTEGER,
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
