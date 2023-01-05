'use strict';
const {
  Model
} = require('sequelize');
const db = require('.');
module.exports = (sequelize, DataTypes) => {
  class Owner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // 예시코드
      models.Owner.hasMany(models.Cloth, {foreignKey : "owner_id"});
      models.Owner.hasMany(models.Review, {foreignKey : "owner_id"});
  }
}
  Owner.init({
    owner_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    login_id: DataTypes.STRING,
    login_pw: DataTypes.STRING,
    owner_name: DataTypes.STRING,
    owner_email: DataTypes.STRING,
    owner_point: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Owner',
  });
  return Owner;
};