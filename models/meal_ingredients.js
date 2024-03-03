'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class meal_ingredients extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  meal_ingredients.init({
    required: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'meal_ingredients',
    underscored: true,
  });
  return meal_ingredients;
};