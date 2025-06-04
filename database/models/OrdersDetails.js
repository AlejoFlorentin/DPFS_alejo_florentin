module.exports = (sequelize, DataTypes) => {
  const alias = 'OrdersDetails';

  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    orders: {
      type: DataTypes.INTEGER,
      references: {
        model: 'orders',
        key: 'id',
      },
    },
    product: {
      type: DataTypes.INTEGER,
      references: {
        model: 'products',
        key: 'id',
      },
    },
  };

  const config = {
    tableName: 'orders_details',
    timestamps: false,
  };

  const OrdersDetails = sequelize.define(alias, cols, config);

  OrdersDetails.associate = function (models) {
    OrdersDetails.belongsTo(models.Orders, {
      foreignKey: 'orders',
    });
    OrdersDetails.belongsTo(models.Products, {
      foreignKey: 'product',
    });
  };

  return OrdersDetails;
};
