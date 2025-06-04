module.exports = (sequelize, DataTypes) => {
  const alias = 'Orders';

  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    dateCreate: {
      type: DataTypes.DATE, // TIMESTAMP en la base
    },
    user: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    total: {
      type: DataTypes.FLOAT,
    },
    items: {
      type: DataTypes.INTEGER,
    },
  };

  const config = {
    tableName: 'orders',
    timestamps: false,
    underscored: true,
  };

  const Orders = sequelize.define(alias, cols, config);

  Orders.associate = function (models) {
    Orders.belongsToMany(models.Products, {
      as: 'products',
      through: 'orders_details',
      foreignKey: 'orders',
      otherKey: 'product',
    });
  };
  return Orders;
};
