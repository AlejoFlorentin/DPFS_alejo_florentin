'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Size extends Model {
    static associate(models) {
      this.belongsToMany(models.Product, {
        through: models.ProductSize,
        foreignKey: 'size_id',
        otherKey: 'product_id',
        as: 'products',
      });
    }
  }
  Size.init(
    {
      size: {
        type: DataTypes.STRING(3),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Size',
      tableName: 'sizes',
      timestamps: false,
    }
  );
  return Size;
};
