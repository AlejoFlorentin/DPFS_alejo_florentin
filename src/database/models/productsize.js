'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductSize extends Model {
    static associate(models) {
      this.belongsTo(models.Product, {
        foreignKey: 'product_id',
        as: 'product',
      });
      this.belongsTo(models.Size, {
        foreignKey: 'size_id',
        as: 'size',
      });
    }
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
