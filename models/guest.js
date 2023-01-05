'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Guest extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Guest.hasMany(models.Cloth,{foreignKey:"guest_id"});
      models.Guest.hasMany(models.Review,{foreignKey:"guest_id"});
    }
  }
  Guest.init({
    guest_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    // guest_id: DataTypes.STRING,
    login_id: DataTypes.STRING,
    login_pw: DataTypes.STRING,
    guest_name: DataTypes.STRING,
    guest_email: DataTypes.STRING,
    guest_point: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Guest',
  });
  return Guest;
};