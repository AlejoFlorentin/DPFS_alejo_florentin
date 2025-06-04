module.exports = (sequelize, DataTypes) => {
  const alias = 'ProductsCategories';
  const cols = {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(50),
    },
  };
  const config = {
    tableName: 'products_categories',
    underscored: true,
  };
  const ProductsCategories = sequelize.define(alias, cols, config);

  ProductsCategories.associate = function (models) {
    ProductsCategories.hasMany(models.Products, { as: 'products', foreignKey: 'category' });
  };
  return ProductsCategories;
};
