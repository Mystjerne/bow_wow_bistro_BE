"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class promotions extends Model {
    static associate(models) {
      this.belongsToMany(models.meals, { through: "meal_promotions" });
    }
  }
  promotions.init(
    {
      promo_name: DataTypes.STRING,
      percentage: DataTypes.INTEGER,
      availability: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "promotions",
      // underscored: true,
    }
  );
  return promotions;
};
