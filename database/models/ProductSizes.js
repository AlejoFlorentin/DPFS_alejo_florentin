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
    timestamps: false,
  };

  const ProductSizes = sequelize.define(alias, cols, config);

  ProductSizes.associate = function (models) {
    ProductSizes.belongsTo(models.Sizes, {
      foreignKey: 'size',
    });
    ProductSizes.belongsTo(models.Products, {
      foreignKey: 'product',
    });
  };

  return ProductSizes;
};
