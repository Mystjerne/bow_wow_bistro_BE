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
      ingredient_name: DataTypes.STRING,
      category: DataTypes.STRING,
      additional_price: DataTypes.INTEGER,
      availability: DataTypes.BOOLEAN,
      add_on: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "ingredients",
      underscored: true,
    }
  );
  return ingredients;
};
