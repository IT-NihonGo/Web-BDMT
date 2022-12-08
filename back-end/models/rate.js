'use strict';
const { Model } = require('sequelize')
const { toLocaleString } = require(process.cwd() + '/helpers/datetime')
module.exports = (sequelize, DataTypes) => {
  class Rate extends Model {
    static associate(models) {
      Rate.belongsTo(models.User, { foreignKey: 'user_id' })
      Rate.belongsTo(models.Store, { foreignKey: 'store_id' })
    }
  }
  Rate.init({
    amount: DataTypes.INTEGER,
    store_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER,
    createdAt: {
      type: DataTypes.DATE,
      get: function () {
          if (this.getDataValue('createdAt')) {
              return toLocaleString(this.getDataValue('createdAt'))
          }
          return null
          },
      },
    updatedAt: {
          type: DataTypes.DATE,
          get: function () {
              if (this.getDataValue('updatedAt')) {
                  return toLocaleString(this.getDataValue('updatedAt'))
              }
              return null
          },
      },
  }, {
    sequelize,
    modelName: 'Rate',
  });
  return Rate;
};