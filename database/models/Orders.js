module.exports = (sequelize, DataTypes) => {
  const alias = "Orders";

  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    date_create: {
      type: DataTypes.DATE, // TIMESTAMP en la base
    },
    user: {
      type: DataTypes.INTEGER,
      references: {
        model: "users",
        key: "id",
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
    tableName: "orders",
    timestamps: false,
  };

  const Orders = sequelize.define(alias, cols, config);
  return Orders;
};
