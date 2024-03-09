"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class meal_promotions extends Model {
    static associate(models) {
      this.belongsTo(models.promotions, {
        foreignKey: "promoId",
      });
      this.belongsTo(models.meals, {
        foreignKey: "mealId",
      });
    }
  }
  meal_promotions.init(
    {
      mealId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      promoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "meal_promotions",
      underscored: true,
    }
  );
  return meal_promotions;
};
