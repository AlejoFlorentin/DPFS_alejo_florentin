'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'user_id',
        as: 'user',
      });
      this.belongsToMany(models.Product, {
        through: models.OrderDetail,
        foreignKey: 'order_id',
        otherKey: 'product_id',
        as: 'products',
      });

      this.hasMany(models.OrderDetail, {
        foreignKey: 'order_id',
        as: 'orderDetails',
      });
    }
  }
  Order.init(
    {
      total: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      items: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Order',
      tableName: 'orders',
    }
  );
  return Order;
};
