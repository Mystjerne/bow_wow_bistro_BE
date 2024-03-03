"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class cart extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.talent, { foreignKey: "userId" });
      this.belongsToMany(models.meals, { through: "cart_meals" });
    }
  }
  cart.init(
    {
      user_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "cart",
      underscored: true,
    }
  );
  return cart;
};
