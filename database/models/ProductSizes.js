module.exports = (sequelize, DataTypes) => {
  const alias = 'ProductSizes';

  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    size: {
      type: DataTypes.INTEGER,
      references: {
        model: 'sizes',
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
    tableName: 'product_sizes',
  };

  const ProductSizes = sequelize.define(alias, cols, config);

  return ProductSizes;
};
