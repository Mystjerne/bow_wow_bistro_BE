"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class ingredients extends Model {
    static associate(models) {
      this.belongsToMany(models.meals, { through: "meal_ingredients" });
    }
  }
  ingredients.init(
    {
      ingredientName: DataTypes.STRING,
      category: DataTypes.STRING,
      additionalPrice: DataTypes.INTEGER,
      availability: DataTypes.BOOLEAN,
      addOn: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "ingredients",
      underscored: true,
    }
  );
  return ingredients;
};
