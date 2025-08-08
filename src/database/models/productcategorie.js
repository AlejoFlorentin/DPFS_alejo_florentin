'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCategorie extends Model {
    static associate(models) {
      this.hasMany(models.Product, {
        foreignKey: 'category_id',
        as: 'products',
      });
    }
  }
  ProductCategorie.init(
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'ProductCategorie',
      tableName: 'product_categories',
      timestamps: false,
    }
  );
  return ProductCategorie;
};
