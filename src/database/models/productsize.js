'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductSize extends Model {
    static associate(models) {}
  }
  ProductSize.init(
    {
      product_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      size_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ProductSize',
      tableName: 'product_sizes',
      timestamps: false,
    }
  );
  return ProductSize;
};
