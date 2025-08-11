"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
      this.belongsTo(models.ProductCategorie, {
        foreignKey: "category_id",
        as: "category",
      });
      this.hasMany(models.ProductImg, {
        foreignKey: "product_id",
        as: "images",
      });
      this.belongsToMany(models.Order, {
        through: models.OrderDetail,
        foreignKey: "product_id",
        otherKey: "order_id",
        as: "orders",
      });

      // Relación directa con OrderDetail
      this.hasMany(models.OrderDetail, {
        foreignKey: "product_id",
        as: "orderDetails",
      });

      this.belongsToMany(models.Size, {
        through: models.ProductSize,
        foreignKey: "product_id",
        otherKey: "size_id",
        as: "sizes",
      });

      this.hasMany(models.ProductSize, {
        foreignKey: "product_id",
        as: "productSizes",
      });
    }
  }
  Product.init(
    {
      title: {
        type: DataTypes.STRING(256),
        allowNull: false,
      },
      price: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Product",
      tableName: "products",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );

  return Product;
};
