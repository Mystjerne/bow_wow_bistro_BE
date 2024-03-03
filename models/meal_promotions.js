'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class meal_promotions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  meal_promotions.init({
    availability: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'meal_promotions',
    underscored: true,
  });
  return meal_promotions;
};