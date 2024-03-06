"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class meal_promotions extends Model {
    static associate(models) {
      this.belongsTo(models.promotions, {
        foreignKey: "promo_id",
      });
      this.belongsTo(models.meals, {
        foreignKey: "meal_id",
      });
    }
  }
  meal_promotions.init(
    {
      meal_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      promo_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "meal_promotions",
      // underscored: true,
    }
  );
  return meal_promotions;
};
