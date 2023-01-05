'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Review.belongsTo(models.Guest);
      models.Review.belongsTo(models.Owner);
    }
  }
  Review.init({
    review_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    // review_id: DataTypes.INTEGER,
    guest_id: DataTypes.STRING,
    owner_id: DataTypes.STRING,
    rate: DataTypes.STRING,
    comment: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};