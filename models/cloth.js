'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Cloth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Cloth.belongsTo(models.Guest);
      models.Cloth.belongsTo(models.Owner);
    }
  }
  Cloth.init({
    cloth_id: {
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    guest_id: DataTypes.STRING,
    owner_id: DataTypes.STRING,
    tel: DataTypes.INTEGER,
    address: DataTypes.STRING,
    status: DataTypes.ENUM,
    ask: DataTypes.STRING,
    img: DataTypes.STRING,
    status: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Cloth',
  });
  return Cloth;
};